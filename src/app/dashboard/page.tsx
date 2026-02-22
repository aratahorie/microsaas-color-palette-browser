import { redirect } from "next/navigation";
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

    if (!user) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
                    <p className="text-gray-400 text-sm mt-1">{siteConfig.description}</p>
                </div>
                <CoreToolUI />
            </main>
            <Footer />
        </div>
    );
}
