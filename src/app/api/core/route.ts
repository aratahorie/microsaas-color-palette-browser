// ★ PLUG POINT 2: コアAPI — 未認証でも利用可能（回数制限あり）

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const openai = new OpenAI();

        // 1. 認証チェック（任意 — 未認証でも利用可能）
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // 2. 利用回数チェック
        if (user) {
            // ログインユーザー: DB ベースの利用回数制限
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
        }
        // 未認証ユーザー: 制限なしで試用可能（本番ではIP制限を追加推奨）

        // 3. ★ コア機能
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

        // 4. 利用ログ保存（ログインユーザーのみ）
        if (user) {
            await supabase.from("usage_logs").insert({
                user_id: user.id,
                input: userInput.slice(0, 500),
                output: (result ?? "").slice(0, 2000),
            });
        }

        return NextResponse.json({ result });
    } catch (error) {
        console.error("Core API error:", error);
        return NextResponse.json(
            { error: "処理中にエラーが発生しました" },
            { status: 500 }
        );
    }
}
