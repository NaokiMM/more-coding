# 事業構成要素
## サイトdomain
https://more-coding.com/

## GitHub
https://github.com/NaokiMM/more-coding

## 事業内ドキュメント/教材
https://drive.google.com/drive/u/0/folders/12MTCsc9PduvNM-P7HixS1Ve5Kz-vwIAL

# 開発構成要素
## 環境変数の扱い
設定値（URL など）はコードに直接書かず、環境変数として管理する。
### .env.local
.env.local：環境ごとの値を定義する場所
### process.env
process.env：コードから環境変数を取得するための入口

### 連携
.env.local の値は Next.js 起動時に読み込まれ、process.env 経由で利用される。
これにより、同じコードをローカル・本番で使い回せる。

# Secretsファイルリスト
※チーム内メンバーより提供必要有り。
・.env.local

# 主なコーディング手法と理由
### 手法
Top-Down Readability（トップダウン設計）

### 理由
ファイルを開いた時点で「何をするコードか」を即座に把握できたり、実装詳細や補助処理を後回しにでき、読み進めやすいため。

## GitHub へのコミット・プッシュルール
1 push = 1 機能追加 を原則とし、変更するファイル数は問わない。また各 push は「何をしたのか」を第三者に説明できる、理解しやすい単位にまとめる。commit メッセージには「何に」「何を」（可能であれば「どのように」も）したのかを記載する

## AWSクラウドの主な使用サービス
##### DB: DynamoDB
##### 認証: Cognito
##### サーバー: Lambda・Amplify（環境変数含む）
##### API: API Gateway
##### オブジェクトストレージ: S3
##### CDN: CloudFront
##### アカウン制御: IAM
##### Container: Docker

## 試験実施ツール
### Safe Exam Browser
https://safeexambrowser.org/download_en.html

## Contribution / コントリビューション
本リポジトリは OSSに近い運用 をしています。

## 共同開発者
リポジトリオーナーが Write 権限 を付与します。作業はブランチ作成 → PR。main への直接 push は不可。すべての PR は オーナーのレビュー・承認後にマージされます。

## 外部コントリビューター
Fork → 変更 → Pull Request を作成してください。