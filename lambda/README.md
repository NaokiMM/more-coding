# AWS Lambda Functions

このディレクトリには、AWS Lambdaで使用している関数のバックアップコードを保存します。

## ディレクトリ構造

各Lambda関数は、関数名に対応するサブディレクトリまたはファイルとして配置してください。

例：
```
lambda/
  ├── function-name-1/
  │   ├── index.js
  │   └── package.json
  ├── function-name-2/
  │   ├── index.js
  │   └── package.json
  └── README.md
```

## 注意事項

- 機密情報（APIキー、パスワードなど）は含めないでください
- 環境変数は `.env.example` ファイルに記載してください
- 各関数には必要に応じて `package.json` を含めてください
