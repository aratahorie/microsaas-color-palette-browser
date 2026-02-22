// ★ PLUG POINT 1: AIが書き換える設定ファイル
// ツール名、説明、価格、LLMプロンプト等を定義する

export const siteConfig = {
  // --- ツール基本情報 ---
  name: "ExcelFormula AI",
  slug: "excel-formula-ai",
  description: "自然言語でExcel・Google Sheets数式を自動生成するAIツール",
  tagline: "もうVLOOKUPで悩まない。日本語で聞くだけ。",

  // --- LP用の機能リスト ---
  features: [
    {
      title: "日本語で質問するだけ",
      description: "「売上が10万円以上の行だけ合計して」と入力するだけで数式を生成",
      emoji: "💬",
    },
    {
      title: "Excel & Google Sheets対応",
      description: "VLOOKUP、SUMIFS、INDEX/MATCH等の複雑な数式にも対応",
      emoji: "📊",
    },
    {
      title: "使い方の解説付き",
      description: "数式だけでなく、どのセルにどう入力するかも丁寧に説明",
      emoji: "📖",
    },
  ],

  // --- 料金設定 ---
  pricing: {
    monthlyPrice: 980,
    currency: "JPY",
    stripePriceId: process.env.STRIPE_PRICE_ID || "",
    trialDays: 7,
    freeUsageLimit: 5, // 無料ユーザーの1日あたりの利用回数
  },

  // --- コア機能のLLM設定 ---
  core: {
    model: "gpt-4o" as const,
    systemPrompt: `あなたはExcelとGoogle Sheetsの数式に精通した日本語の専門家です。

ユーザーが日本語で「こういうことがしたい」と記述した内容に対して、最適なExcel数式を生成してください。

## ルール
1. 数式は必ずExcelで動作する形式で出力してください
2. 数式の後に、使い方の解説を日本語で添えてください
3. 複数の方法がある場合は、最もシンプルなものを優先してください
4. Google Sheetsでの違いがある場合はその旨も補足してください`,
    inputPlaceholder: "例：A列の売上が10万円以上の行だけB列を合計したい",
    inputLabel: "やりたいことを日本語で入力",
    outputLabel: "生成された数式",
  },

  // --- SEO ---
  seo: {
    title: "ExcelFormula AI - 日本語でExcel数式を自動生成",
    description:
      "自然言語でExcel・Google Sheetsの数式を自動生成。VLOOKUP、SUMIFS、INDEX/MATCHなど複雑な数式も日本語で聞くだけ。",
  },
};

export type SiteConfig = typeof siteConfig;
