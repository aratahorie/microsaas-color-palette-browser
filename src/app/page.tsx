// ★ PLUG POINT 4: カラーパレットブラウザ LP

import { siteConfig } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            🎨 AIカラーパレット
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {siteConfig.description}
          </p>
          <a
            href="/dashboard"
            className="inline-block px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-xl shadow-blue-500/25 text-lg"
          >
            無料で試す →
          </a>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {siteConfig.features.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="text-3xl mb-4">{feature.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">シンプルな料金プラン</h2>
          <p className="text-gray-400 mb-10">
            1日{siteConfig.pricing.freeUsageLimit}回まで無料。それ以上使うならProプランへ。
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
              <h3 className="font-bold text-white text-lg mb-2">Free</h3>
              <div className="text-3xl font-black text-white mb-4">¥0</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ 1日{siteConfig.pricing.freeUsageLimit}回まで利用可能</li>
                <li>✓ AIパレット生成</li>
                <li>✓ ライブプレビュー</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-left relative">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold text-white">
                おすすめ
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Pro</h3>
              <div className="text-3xl font-black text-white mb-4">
                ¥{siteConfig.pricing.monthlyPrice.toLocaleString()}
                <span className="text-sm text-gray-400 font-normal">/月</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ 無制限利用</li>
                <li>✓ {siteConfig.pricing.trialDays}日間無料トライアル</li>
                <li>✓ 優先サポート</li>
              </ul>
              <a
                href="/dashboard"
                className="mt-6 block w-full text-center py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                無料トライアルを始める
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}