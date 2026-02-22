import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const { searchParams, origin } = new URL(req.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // プロフィールレコードが無ければ作成
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                const { data: existing } = await supabase
                    .from("profiles")
                    .select("id")
                    .eq("id", user.id)
                    .single();

                if (!existing) {
                    await supabase.from("profiles").insert({
                        id: user.id,
                        email: user.email,
                        is_subscribed: false,
                    });
                }
            }

            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    return NextResponse.redirect(`${origin}/?error=auth`);
}
