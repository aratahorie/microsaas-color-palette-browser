// ★ PLUG POINT 3: カラーパレットUI

"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

interface ColorItem {
  name: string;
  hex: string;
  usage: string;
}

interface PaletteResult {
  palette_name: string;
  colors: ColorItem[];
}

export default function CoreToolUI() {
  const [input, setInput] = useState("");
  const [palette, setPalette] = useState<PaletteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setPalette(null);

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

      // Parse the JSON result from LLM
      const parsed: PaletteResult = typeof data.result === "string"
        ? JSON.parse(data.result)
        : data.result;
      setPalette(parsed);
    } catch {
      setError("パレットの生成に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const getContrastColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Input Form */}
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
            rows={2}
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
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              パレット生成中...
            </span>
          ) : (
            "🎨 パレットを生成"
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Palette Result */}
      {palette && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">
            🎨 {palette.palette_name}
          </h3>

          {/* Color Swatches */}
          <div className="grid grid-cols-5 gap-2 rounded-xl overflow-hidden">
            {palette.colors.map((color, i) => (
              <button
                key={i}
                onClick={() => copyToClipboard(color.hex, `swatch-${i}`)}
                className="group relative aspect-square transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: getContrastColor(color.hex) }}
                >
                  <span className="text-xs font-bold">{color.hex}</span>
                  <span className="text-[10px] mt-1">
                    {copied === `swatch-${i}` ? "✓ コピー!" : "クリックでコピー"}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Color Details */}
          <div className="space-y-2">
            {palette.colors.map((color, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg shrink-0 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{color.name}</span>
                    <span className="text-gray-500 text-xs">— {color.usage}</span>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(color.hex, `detail-${i}`)}
                  className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all"
                >
                  {copied === `detail-${i}` ? "✓" : color.hex}
                </button>
              </div>
            ))}
          </div>

          {/* Live Preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400">ライブプレビュー</h4>
            <div
              className="rounded-xl p-6 border border-white/10 space-y-4"
              style={{ backgroundColor: palette.colors[0]?.hex }}
            >
              <h2
                className="text-2xl font-bold"
                style={{ color: palette.colors[1]?.hex }}
              >
                サンプルヘッドライン
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: palette.colors[1]?.hex, opacity: 0.8 }}
              >
                これはプレビュー用のテキストです。選ばれた配色が実際のUIでどう見えるかを確認できます。
              </p>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
                  style={{ backgroundColor: palette.colors[2]?.hex }}
                >
                  プライマリボタン
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                  style={{
                    borderColor: palette.colors[3]?.hex,
                    color: palette.colors[3]?.hex,
                  }}
                >
                  セカンダリボタン
                </button>
              </div>
              <div
                className="mt-2 px-3 py-1.5 rounded-full text-xs font-medium inline-block"
                style={{
                  backgroundColor: palette.colors[4]?.hex,
                  color: getContrastColor(palette.colors[4]?.hex || "#000"),
                }}
              >
                アクセントバッジ
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}