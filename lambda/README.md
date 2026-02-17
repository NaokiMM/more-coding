# AWS Lambda Functions

このディレクトリには、AWS Lambdaで使用している関数のバックアップコードを環境別（dev / stg / prd）で保存します。

## ディレクトリ構造

```
lambda/
  ├── dev/          # 開発環境用
  │   ├── more-coding-learning-histories/
  │   ├── more-coding-learning-resume/
  │   ├── more-coding-me-api/
  │   ├── more-coding-questions-list/
  │   ├── more-coding-subscription-start/
  │   ├── more-coding-subscription-status/
  │   ├── more-coding-subscription-stop/
  │   ├── more-coding-profile-image/
  │   └── more-coding-inquiries-api/
  ├── stg/          # ステージング環境用（環境差分がある場合のみ配置）
  ├── prd/          # 本番環境用（環境差分がある場合のみ配置）
  └── README.md
```

- **dev**: 開発環境用のLambdaコード。通常はここをベースに各環境へデプロイします。
- **stg / prd**: 環境ごとにコード差分がある場合のみ、該当関数を配置してください。なければ dev のコードをデプロイ先の設定（環境変数など）で使い回します。

## テスト

各 Lambda のハンドラのユニットテストは `lambda/__tests__/` にあります。Node 組み込みの test ランナーで実行します。

```bash
# プロジェクトルートで
npm run test:lambda
```

- テスト対象は `dev/` のコードです（OPTIONS、401、500 など AWS を呼ばないパスを中心に検証）
- 環境変数未設定時のエラーや認証なし時の 401 などをアサートしています

## 注意事項

- 機密情報（APIキー、パスワードなど）は含めないでください
- 環境変数は `.env.example` ファイルに記載してください
- 各関数には必要に応じて `package.json` を含めてください
