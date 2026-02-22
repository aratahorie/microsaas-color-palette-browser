"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    }, []);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return (
        <header className="w-full border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                    {siteConfig.name}
                </Link>

                <nav className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                ダッシュボード
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                ログアウト
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
                        >
                            無料で始める
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
