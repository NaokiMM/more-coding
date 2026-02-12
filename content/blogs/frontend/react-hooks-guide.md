---
title: React Hooks 完全ガイド
date: 2026-01-03
tags: ["React", "Hooks", "フロントエンド"]
excerpt: useState、useEffect、カスタムフックまで、React Hooksの実践的な使い方を徹底解説します。
---

# React Hooks 完全ガイド

React Hooksは、関数コンポーネントで状態管理やライフサイクル処理を実現するための強力な機能です。この記事では、主要なHooksの使い方を解説します。

## useState - 状態管理

`useState`は、コンポーネントの状態を管理するための最も基本的なHookです：

\`\`\`tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
}
\`\`\`

## useEffect - 副作用の処理

`useEffect`は、コンポーネントのレンダリング後に実行される副作用を処理します：

\`\`\`tsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // userIdが変更されたときのみ実行

  return <div>{user?.name}</div>;
}
\`\`\`

## カスタムフックの作成

ロジックを再利用可能にするために、カスタムフックを作成できます：

\`\`\`tsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
\`\`\`

## まとめ

React Hooksを使うことで、関数コンポーネントでもクラスコンポーネントと同等の機能を実現できます。適切にHooksを活用して、コードの再利用性と保守性を向上させましょう。
