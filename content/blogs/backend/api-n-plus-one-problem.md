---
title: API での N+1 問題とは何か（原因・見つけ方・対策）
date: 2026-04-16
tags: ["API", "N+1", "パフォーマンス", "バックエンド", "REST", "GraphQL", "TypeScript"]
excerpt: REST や GraphQL などの API で頻出する N+1 問題の意味、典型的な発生パターン、TypeScript でのダメ例・改善例、ログやプロファイラでの検知、JOIN・バッチ・DataLoader などの対策を整理します。
---

# API での N+1 問題とは何か（原因・見つけ方・対策）

「一覧を返す API が遅い」「負荷テストで DB のクエリ数だけ異常に増える」といった相談の背景に、**N+1 問題**が隠れていることがよくあります。この記事では、API の文脈で N+1 が何を指すのか、どう見つけ、どう直すかを整理します。

## N+1 問題とは

**1 回の一覧取得に対して、関連データの取得が「件数ぶん」繰り返される**状態を、慣習的に N+1 と呼びます。

- **1**: 親となる集合を取るためのクエリ（または API 呼び出し）が 1 回
- **N**: 各要素ごとに、子や関連を取る処理がさらに 1 回ずつ走る（N 件なら N 回）

例えば「投稿一覧」と「各投稿の著者」を返す REST API で、次のような流れになると N+1 です。

1. `SELECT * FROM posts` で投稿を N 件取得（1 回目）
2. 各 `post.author_id` ごとに `SELECT * FROM users WHERE id = ?` を実行（N 回）

結果として **合計 1 + N 回**の DB アクセスが発生します。N が数百・数千になると、レイテンシと DB 接続の圧迫の両方で顕在化します。

## なぜ API で起きやすいか

API は「リソース単位でエンドポイントを切る」「ORM で関連を遅延読み込みする」といった設計と相性が良く、次のパターンで起きやすいです。

- **一覧 + ループ内の取得**: コントローラで一覧を取ったあと、`for` の中で関連を都度クエリする
- **シリアライザ／DTO 組み立て**: レスポンス生成時に、各要素の関連だけ別クエリにしている
- **GraphQL のフィールドリゾルバ**: 親のリスト取得後、子フィールドのリゾルバが **1 ID ずつ**DB に触れている（DataLoader 等がない）

REST でも GraphQL でも、「**往復回数がリストの長さに比例している**」という点は同じです。

## TypeScript でのコード例（避けたい書き方と改善例）

以下は「投稿一覧に著者を付けて返す」という同じ要件に対して、**DB や ORM を薄いラッパー `db` に置いた**イメージコードです（実際の API では Hono / Express のハンドラ内などに相当）。

### ダメな例（ループのたびに取得 = 1 + N）

`Promise.all` で並列化しても **クエリ回数は減らない**（むしろ同時に N 本飛ばして接続を圧迫しがち）点に注意します。

```typescript
type Post = { id: string; title: string; authorId: string };
type User = { id: string; name: string };

type Db = {
  posts: { findMany: (opts: { limit: number }) => Promise<Post[]> };
  users: { findById: (id: string) => Promise<User | null> };
};

/** 一覧 1 回 + 各行で著者を個別取得 → 典型的な N+1 */
export async function listPostsWithAuthorsBad(db: Db): Promise<Array<Post & { author: User | null }>> {
  const posts = await db.posts.findMany({ limit: 50 });
  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      author: await db.users.findById(post.authorId),
    })),
  );
}
```

### 良い例（ID を集約してから一括取得）

重複著者が多い場合でも **`IN` は 1 回**にまとまり、メモリ上で `Map` に寄せます（クエリは概ね「投稿一覧 + 著者一覧」の 2 回）。

```typescript
type Post = { id: string; title: string; authorId: string };
type User = { id: string; name: string };

type Db = {
  posts: { findMany: (opts: { limit: number }) => Promise<Post[]> };
  users: { findManyByIds: (ids: string[]) => Promise<User[]> };
};

export async function listPostsWithAuthorsGood(db: Db): Promise<Array<Post & { author: User | null }>> {
  const posts = await db.posts.findMany({ limit: 50 });
  const authorIds = [...new Set(posts.map((p) => p.authorId))];
  const authors = await db.users.findManyByIds(authorIds);
  const authorById = new Map(authors.map((u) => [u.id, u]));

  return posts.map((post) => ({
    ...post,
    author: authorById.get(post.authorId) ?? null,
  }));
}
```

ORM を使う場合は、この「**先にキーを集める → `in` で一括 → Map で突き合わせ**」が、フレームワークの eager load / `include` に相当します。

## 影響（ユーザー視点と運用視点）

- **応答時間の悪化**: クエリや RPC が直列に増えるほど尾を引く
- **DB 側の負荷**: 同種の短いクエリが大量に発行され、プラン生成や接続プールを圧迫しやすい
- **外部 API 課金・レート制限**: DB ではなく Stripe や検索 API などをループで叩いている場合も、同じ構造でコストが跳ねる

## 見つけ方

### アプリケーションログ

開発環境で ORM の SQL ログを出し、「同じ形の `SELECT` が ID だけ変わって連打されていないか」を見ます。一覧操作の直後にクエリ数が跳ねていれば疑う価値があります。

### DB / APM

本番では **APM（例: トレース）**や **DB のスロークエリ**から、特定エンドポイントに対する **クエリ数の多さ**や **同型クエリの繰り返し**を確認します。CPU より「往復回数」がボトルネックになっているタイプです。

### 負荷試験

データ件数を変えながら負荷をかけ、**件数に対してレイテンシやクエリ数がほぼ線形に悪化していないか**を見ます。N+1 があれば、しばしば **O(N)** で劣化します。

## 対策の方向性

### 1. 1 回（少数回）のクエリにまとめる（JOIN / 一括 IN）

RDB であれば、`JOIN` や `WHERE id IN (...)` を使い、**一覧と関連を同じラウンドトリップで**取ります。ORM なら eager loading（例: `includes` / `preload` / `joinedload` などフレームワーク依存）を検討します。

```sql
-- 例: 投稿と著者をまとめて取得（イメージ）
SELECT p.*, u.name AS author_name
FROM posts p
JOIN users u ON u.id = p.author_id
ORDER BY p.created_at DESC
LIMIT 50;
```

### 2. バッチ取得（DataLoader パターン）

GraphQL や「ID リストを渡してまとめて返す」サービス境界では、**キーを集めてから一度で取る**パターンが効きます。GraphQL では **DataLoader** が定番です（同一リクエスト内のバッチ化と簡易キャッシュ）。

```typescript
import DataLoader from "dataloader";

type User = { id: string; name: string };

// 同一リクエスト内で「同じ ID はキャッシュ」「複数 ID はバッチで 1 クエリ」に寄せる
function createUserLoader(findManyByIds: (ids: readonly string[]) => Promise<User[]>) {
  return new DataLoader<string, User | null>(async (ids) => {
    const users = await findManyByIds(ids);
    const byId = new Map(users.map((u) => [u.id, u]));
    return ids.map((id) => byId.get(id) ?? null);
  });
}
```

### 3. API 設計側の逃がし（過剰取得とのトレードオフ）

- **フィールド選択**: `?fields=` のように必要な関連だけ広げる、あるいは逆に **デフォルトはフラット**にしてネストは別エンドポイントに分ける
- **専用の読み取り用エンドポイント**: 画面用に「一覧 + 必要な関連が既に埋まった DTO」を返す **BFF / 集約 API** を切る

「常に深いネストを許す」ほど、サーバ側で N+1 を起こしやすくなるため、**契約（スキーマや OpenAPI）と実装（ローダ・JOIN）をセットで設計**するのが安全です。

## まとめ

N+1 は「**1 回のユーザー操作に対して、裏で同種の取得がリスト長ぶん増える**」問題です。REST でも GraphQL でも、原因は **ループの中に隠れた I/O** に集約されることが多いです。

対策は **クエリをまとめる**、**ID バッチで取る**、**API の形を見直してサーバが制御しやすくする**の三方向から選ぶと整理しやすく、計測では **クエリ数やトレース上のスパン数**が有力な手がかりになります。
