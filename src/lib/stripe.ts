import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2026-01-28.clover",
            typescript: true,
        });
    }
    return _stripe;
}

/**
 * Stripe Checkout セッションを作成する
 */
export async function createCheckoutSession({
    priceId,
    userId,
    userEmail,
    successUrl,
    cancelUrl,
}: {
    priceId: string;
    userId: string;
    userEmail: string;
    successUrl: string;
    cancelUrl: string;
}) {
    const session = await getStripe().checkout.sessions.create({
        customer_email: userEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { userId },
    });

    return session;
}

/**
 * ユーザーがアクティブなサブスクリプションを持っているか確認する
 */
export async function hasActiveSubscription(
    stripeCustomerId: string | null
): Promise<boolean> {
    if (!stripeCustomerId) return false;

    const subscriptions = await getStripe().subscriptions.list({
        customer: stripeCustomerId,
        status: "active",
        limit: 1,
    });

    return subscriptions.data.length > 0;
}
