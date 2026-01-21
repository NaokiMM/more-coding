---
title: Tailwind CSS 上級テクニック
date: 2026-01-05
tags: ["Tailwind CSS", "CSS", "UI/UX"]
excerpt: Tailwind CSSのカスタマイズ、プラグイン開発、レスポンシブデザインなど、より高度な使い方を学びます。
---

# Tailwind CSS 上級テクニック

Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。この記事では、中級者向けのテクニックを紹介します。

## カスタムクラスの作成

`@apply`ディレクティブを使って、よく使うクラスの組み合わせをカスタムクラスとして定義できます：

\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
\`\`\`

## レスポンシブデザイン

Tailwindのブレークポイントを活用したレスポンシブデザイン：

\`\`\`tsx
<div className="
  text-sm
  md:text-base
  lg:text-lg
  xl:text-xl
">
  レスポンシブテキスト
</div>
\`\`\`

## ダークモードの実装

`dark:`プレフィックスを使ってダークモードを実装：

\`\`\`tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  ダークモード対応コンテンツ
</div>
\`\`\`

## カスタムプラグインの作成

再利用可能なコンポーネントスタイルをプラグインとして定義：

\`\`\`javascript
// tailwind.config.js
module.exports = {
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.card': {
          padding: '1rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        },
      })
    },
  ],
}
\`\`\`

## まとめ

Tailwind CSSの高度な機能を活用することで、より効率的で保守性の高いスタイリングが可能になります。これらのテクニックを実践して、美しいUIを構築しましょう。
