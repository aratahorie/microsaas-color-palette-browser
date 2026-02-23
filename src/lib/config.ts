export const siteConfig = {
  name: "カラーパレットブラウザ",
  slug: "color-palette-browser",
  description: "ライブUIプレビューで色の見え方を確認できるカラーパレットツール",
  tagline: "色の見え方を簡単に確認",
  features: [
    {
      title: "リアルタイムプレビュー",
      description: "UI上で色の見え方をリアルタイムに確認できます。",
      emoji: "🎨"
    },
    {
      title: "カスタムパレット作成",
      description: "自分だけのカラーパレットを作成して保存できます。",
      emoji: "🖌️"
    },
    {
      title: "共有機能",
      description: "作成したパレットを簡単に共有できます。",
      emoji: "🔗"
    }
  ],
  pricing: {
    monthlyPrice: 980,
    currency: "JPY",
    stripePriceId: process.env.STRIPE_PRICE_ID || "",
    trialDays: 14,
    freeUsageLimit: 5
  },
  core: {
    model: "default",
    systemPrompt: "あなたはカラーパレットの専門家です。ユーザーが入力した色コードや色の説明に基づいて、最適なカラーパレットを提案してください。",
    inputPlaceholder: "色コードを入力してください",
    inputLabel: "色コード",
    outputLabel: "プレビュー"
  },
  seo: {
    title: "カラーパレットブラウザ - ライブUIプレビューで色の見え方を確認",
    description: "カラーパレットブラウザは、ライブUIプレビューで色の見え方を確認できるツールです。"
  }
};