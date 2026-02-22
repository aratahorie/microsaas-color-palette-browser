import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession } from "@/lib/stripe";
import { siteConfig } from "@/lib/config";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const session = await createCheckoutSession({
            priceId: siteConfig.pricing.stripePriceId,
            userId: user.id,
            userEmail: user.email!,
            successUrl: `${appUrl}/dashboard?checkout=success`,
            cancelUrl: `${appUrl}/pricing?checkout=cancelled`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "決済の準備に失敗しました" },
            { status: 500 }
        );
    }
}
