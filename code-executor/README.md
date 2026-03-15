# code-executor

LeetCode 風のコード実行環境用の Express バックエンド。  
TypeScript / React のコードをサンドボックスで実行し、結果を返すサービス。

## 開発の進め方

### 1. まずここから（今の状態）

- Express サーバーが立つ
- `GET /health` で死活確認
- `POST /run` はスタブ（実行は未実装）

```bash
cd code-executor && npm install && npm run dev
# http://localhost:4000/health
```

### 2. 次にやること（推奨順）

| 順番 | やること | 説明 |
|------|----------|------|
| ① | **サンドボックス実行の実装** | Docker コンテナ or `isolated-vm` 等でユーザーコードを安全に実行。まずは TypeScript のみで「コード文字列 → 実行 → stdout/stderr 返却」まで。 |
| ② | **問題データとの連携** | 問題ごとのテストケース（入力・期待出力）を S3 または API で取得し、`/run` でテスト実行 → 合否を返す。 |
| ③ | **Next フロントとの接続** | フロントから `NEXT_PUBLIC_CODE_EXECUTOR_URL` などでこのサーバーを呼ぶ。認証が必要なら JWT をヘッダーで渡し、code-executor で検証。 |
| ④ | **React 実行の対応** | 必要なら React 用のテンプレ（index.html + バンドル）を用意し、サンドボックス内でブラウザ代替（jsdom）または headless で実行。 |

### 3. 本番まわり（後回しでよい）

- デプロイ: ECS / EC2 / App Runner などでコンテナ or プロセスとして起動
- CORS: 本番ドメインを `cors` で許可
- 認証: Cognito JWT の検証を Express ミドルウェアで実施

## API（予定）

- `GET /health` — 死活監視
- `POST /run` — コード実行（body: `{ code: string, language?: "typescript" | "react" }`）

## 環境変数

- `PORT` — サーバー待ち受けポート（デフォルト: 4000）
