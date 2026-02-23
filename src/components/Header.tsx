"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                setShowLogin(false);
                setSent(false);
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        setLoading(false);
        if (!error) {
            setSent(true);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return (
        <>
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
                                onClick={() => setShowLogin(true)}
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
                            >
                                無料で始める
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">無料で始める</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            メールアドレスを入力すると、ログインリンクが届きます。
                        </p>

                        {sent ? (
                            <div className="text-center py-4">
                                <div className="text-4xl mb-4">📧</div>
                                <p className="text-white font-medium mb-2">メールを送信しました！</p>
                                <p className="text-gray-400 text-sm">
                                    <span className="text-blue-400">{email}</span> に届いたリンクをクリックしてログインしてください。
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all"
                                >
                                    {loading ? "送信中..." : "ログインリンクを送信"}
                                </button>
                            </form>
                        )}

                        <button
                            onClick={() => { setShowLogin(false); setSent(false); }}
                            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            閉じる
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
