import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient as createAdminClient } from "@supabase/supabase-js";

// Lazy init: Supabase admin client (service role, no cookie context)
function getSupabaseAdmin() {
    return createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event;

    try {
        event = getStripe().webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Webhook signature verification failed" },
            { status: 400 }
        );
    }

    const supabaseAdmin = getSupabaseAdmin();

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const userId = session.metadata?.userId;
            const stripeCustomerId = session.customer as string;

            if (userId) {
                await supabaseAdmin
                    .from("profiles")
                    .update({
                        is_subscribed: true,
                        stripe_customer_id: stripeCustomerId,
                    })
                    .eq("id", userId);
            }
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object;
            const customerId = subscription.customer as string;

            await supabaseAdmin
                .from("profiles")
                .update({ is_subscribed: false })
                .eq("stripe_customer_id", customerId);
            break;
        }

        case "customer.subscription.updated": {
            const subscription = event.data.object;
            const customerId = subscription.customer as string;
            const isActive = subscription.status === "active";

            await supabaseAdmin
                .from("profiles")
                .update({ is_subscribed: isActive })
                .eq("stripe_customer_id", customerId);
            break;
        }
    }

    return NextResponse.json({ received: true });
}
