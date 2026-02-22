"use client";

import { siteConfig } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function PricingCard() {
    const router = useRouter();

    const handleCheckout = async () => {
        const res = await fetch("/api/checkout", { method: "POST" });
        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            router.push("/auth/callback?next=/pricing");
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
            <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-white">{siteConfig.name} Pro</h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ¥{siteConfig.pricing.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">/月</span>
                </div>
                <p className="text-gray-400 text-sm">
                    {siteConfig.pricing.trialDays}日間の無料トライアル付き
                </p>
            </div>

            <ul className="mt-8 space-y-3">
                {siteConfig.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-gray-300 text-sm">{feature.title}</span>
                    </li>
                ))}
                <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span className="text-gray-300 text-sm">無制限利用</span>
                </li>
            </ul>

            <button
                onClick={handleCheckout}
                className="mt-8 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
            >
                無料トライアルを始める
            </button>
        </div>
    );
}
