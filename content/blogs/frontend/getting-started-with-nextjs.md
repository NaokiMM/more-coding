---
title: Next.js 16 App Router 入門ガイド
date: 2026-01-01
tags: ["Next.js", "React", "Web開発"]
excerpt: Next.js 16のApp Routerを使ったモダンなWebアプリケーション開発の基礎を学びましょう。
---

# Next.js 16 App Router 入門ガイド

Next.js 16では、**App Router**がデフォルトのルーティングシステムとして採用されています。この記事では、App Routerの基本的な使い方を解説します。

## App Routerとは

App Routerは、ファイルシステムベースのルーティングを提供するNext.jsの新しいルーティングシステムです。`app/`ディレクトリ内にファイルを配置するだけで、自動的にルートが生成されます。

## 基本的なページの作成

まず、`app/`ディレクトリ内に`page.tsx`ファイルを作成します：

\`\`\`tsx
export default function HomePage() {
  return (
    <div>
      <h1>ようこそ Next.js へ</h1>
    </div>
  );
}
\`\`\`

このファイルは`/`ルートに対応するページになります。

## 動的ルーティング

動的なルートを作成するには、`[slug]`のようなフォルダ名を使用します：

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>記事: {params.slug}</h1>;
}
\`\`\`

## サーバーコンポーネントとクライアントコンポーネント

App Routerでは、デフォルトで**サーバーコンポーネント**が使用されます。インタラクティブな機能が必要な場合のみ、`'use client'`ディレクティブを使用してクライアントコンポーネントにします。

## まとめ

App Routerを使うことで、よりシンプルで強力なルーティングシステムを実現できます。次の記事では、データフェッチングやメタデータの設定について詳しく見ていきましょう。
