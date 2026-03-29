# more-coding-api（Hono）

more-coding サイト向けの **HTTP バックエンド**（Hono + Node）。  
Next.js（Lambda/Amplify 等）と役割を分け、長めの処理・バッチ・将来のサンドボックス実行などをここに寄せる想定。

## いま入っているもの

| パス | 説明 |
|------|------|
| `GET /health` | 死活監視（`SERVICE_NAME` でサービス名を上書き可） |
| `POST /run` | コード実行 API の **スタブ**（実実行は未実装） |

## 起動

```bash
cd hono/api && npm install && npm run dev
# http://localhost:4000/health
```

## ソース構成（トップダウン）

- `src/index.ts` — サーバー起動のみ
- `src/app.ts` — ミドルウェアとルートの組み立て
- `src/middleware/` — 共通ミドルウェア
- `src/routes/` — 機能別ルート

## 環境変数

| 変数 | 説明 |
|------|------|
| `PORT` | 待ち受けポート（既定: `4000`） |
| `SERVICE_NAME` | `/health` の `service` フィールド（既定: `more-coding-api`） |

Next から呼ぶ場合は、ベタ書きせず `MORE_CODING_API_URL` などの環境変数でベース URL を渡す。

## 今後の拡張（例）

- 認証: Cognito JWT をミドルウェアで検証
- CORS: 本番ドメインのみ許可
- `/run` 以外のルート: 課金・ジョブ・内部 API などを `src/routes/` に追加し `app.ts` でマウント
