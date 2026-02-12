---
title: JavaScript 非同期処理パターン
date: 2026-01-08
tags: ["JavaScript", "非同期処理", "Promise", "async/await"]
excerpt: Promise、async/await、並列処理など、JavaScriptの非同期処理をマスターするための実践的なパターンを解説します。
---

# JavaScript 非同期処理パターン

現代のJavaScript開発では、非同期処理の理解が不可欠です。この記事では、効果的な非同期処理のパターンを紹介します。

## Promise の基礎

Promiseは、非同期処理を扱うための標準的な方法です：

\`\`\`javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('データ取得成功');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

## async/await の活用

async/awaitを使うことで、非同期処理を同期的に書くことができます：

\`\`\`javascript
async function fetchUserData() {
  try {
    const user = await fetch('/api/user');
    const profile = await fetch('/api/profile');
    return { user, profile };
  } catch (error) {
    console.error('エラー:', error);
    throw error;
  }
}
\`\`\`

## 並列処理の実装

複数の非同期処理を並列で実行することで、パフォーマンスを向上させることができます：

\`\`\`javascript
async function fetchAllData() {
  // すべての処理を並列で実行
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  
  return { user, posts, comments };
}
\`\`\`

## エラーハンドリング

適切なエラーハンドリングを実装：

\`\`\`javascript
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    return null;
  }
}
\`\`\`

## まとめ

JavaScriptの非同期処理をマスターすることで、より効率的で保守性の高いコードを書くことができます。これらのパターンを実践して、非同期処理を効果的に活用しましょう。
