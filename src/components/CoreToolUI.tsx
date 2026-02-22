// ★ PLUG POINT 3: AIが書き換えるコア機能のUI

"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export default function CoreToolUI() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);
        setError("");
        setResult("");

        try {
            const res = await fetch("/api/core", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userInput: input }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "エラーが発生しました");
                return;
            }

            setResult(data.result);
        } catch {
            setError("通信エラーが発生しました。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="core-input"
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        {siteConfig.core.inputLabel}
                    </label>
                    <textarea
                        id="core-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={siteConfig.core.inputPlaceholder}
                        rows={3}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-full py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            生成中...
                        </span>
                    ) : (
                        "生成する"
                    )}
                </button>
            </form>

            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {result && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-300">
                        {siteConfig.core.outputLabel}
                    </h3>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {result}
                    </div>
                </div>
            )}
        </div>
    );
}
