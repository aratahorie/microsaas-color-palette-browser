// ★ PLUG POINT 1: カラーパレットブラウザ設定

export const siteConfig = {
  name: "カラーパレットブラウザ",
  slug: "color-palette-browser",
  description: "AIが最適なカラーパレットを提案。ライブプレビューで即座に確認。",
  tagline: "色選びに迷わない。AIに聞くだけ。",

  features: [
    {
      title: "AIパレット生成",
      description: "「温かみのあるナチュラルな配色」と伝えるだけで、最適な5色パレットを提案",
      emoji: "🎨",
    },
    {
      title: "ライブUIプレビュー",
      description: "生成されたパレットを実際のUIコンポーネントに適用して見え方を確認",
      emoji: "👁️",
    },
    {
      title: "コードコピー",
      description: "HEX、RGB、Tailwind CSSクラスをワンクリックでコピー",
      emoji: "📋",
    },
  ],

  pricing: {
    monthlyPrice: 980,
    currency: "JPY",
    stripePriceId: process.env.STRIPE_PRICE_ID || "",
    trialDays: 14,
    freeUsageLimit: 5,
  },

  core: {
    model: "gpt-4o" as const,
    systemPrompt: `あなたはプロのUIデザイナーです。ユーザーの要望に基づいて、UIに使えるカラーパレットを提案してください。

## ルール
1. 必ず5色のパレットを提案してください
2. 必ず以下のJSON形式で出力してください。JSON以外のテキストは出力しないでください
3. 各色にはname（日本語）、hex、usage（用途）を含めてください
4. デザインとして調和の取れた配色にしてください
5. 背景色、メインカラー、アクセントカラーをバランスよく含めてください

## 出力形式（これ以外は一切出力しないこと）
{
  "palette_name": "パレット名",
  "colors": [
    { "name": "色名", "hex": "#RRGGBB", "usage": "背景" },
    { "name": "色名", "hex": "#RRGGBB", "usage": "メインテキスト" },
    { "name": "色名", "hex": "#RRGGBB", "usage": "プライマリ" },
    { "name": "色名", "hex": "#RRGGBB", "usage": "セカンダリ" },
    { "name": "色名", "hex": "#RRGGBB", "usage": "アクセント" }
  ]
}`,
    inputPlaceholder: "例：温かみのあるカフェ風の配色、クールなテック系ダッシュボード、春の桜をイメージした優しい色",
    inputLabel: "どんな配色がほしいですか？",
    outputLabel: "AIが提案するカラーパレット",
  },

  seo: {
    title: "カラーパレットブラウザ - AIが最適な配色を提案",
    description: "AIにイメージを伝えるだけで最適なカラーパレットを生成。ライブUIプレビューで色の見え方を即座に確認できます。",
  },
};

export type SiteConfig = typeof siteConfig;