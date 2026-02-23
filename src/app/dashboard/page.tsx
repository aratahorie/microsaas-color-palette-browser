import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoreToolUI from "@/components/CoreToolUI";

export const metadata = {
    title: `ダッシュボード | ${siteConfig.name}`,
};

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">{siteConfig.description}</p>
                </div>
                <CoreToolUI />
                {!user && (
                    <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                        <p className="text-blue-300 text-sm">
                            💡 ログインすると1日{siteConfig.pricing.freeUsageLimit}回まで無料で使えます。
                            Proプランなら無制限。
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
