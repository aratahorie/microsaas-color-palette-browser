// ★ PLUG POINT 2: AIが書き換える「コア機能」のAPIルート
// config.ts のプロンプトとモデル設定に基づいてLLMを呼び出す

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const openai = new OpenAI();
        // 1. 認証チェック
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
        }

        // 2. 利用回数チェック（無料枠）
        const today = new Date().toISOString().split("T")[0];
        const { count } = await supabase
            .from("usage_logs")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .gte("created_at", `${today}T00:00:00`);

        const { data: profile } = await supabase
            .from("profiles")
            .select("is_subscribed")
            .eq("id", user.id)
            .single();

        if (
            !profile?.is_subscribed &&
            (count ?? 0) >= siteConfig.pricing.freeUsageLimit
        ) {
            return NextResponse.json(
                {
                    error: `無料枠の上限（${siteConfig.pricing.freeUsageLimit}回/日）に達しました。プランをアップグレードしてください。`,
                    upgrade: true,
                },
                { status: 429 }
            );
        }

        // 3. ★ コア機能（AIが書き換える部分）
        const { userInput } = await req.json();

        if (!userInput || typeof userInput !== "string") {
            return NextResponse.json(
                { error: "入力が必要です" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: siteConfig.core.model,
            messages: [
                { role: "system", content: siteConfig.core.systemPrompt },
                { role: "user", content: userInput },
            ],
            max_tokens: 2000,
        });

        const result = completion.choices[0].message.content;

        // 4. 利用ログ保存
        await supabase.from("usage_logs").insert({
            user_id: user.id,
            input: userInput.slice(0, 500),
            output: (result ?? "").slice(0, 2000),
        });

        return NextResponse.json({ result });
    } catch (error) {
        console.error("Core API error:", error);
        return NextResponse.json(
            { error: "処理中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
