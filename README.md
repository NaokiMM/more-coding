# 事業構成要素
## サイトdomain
https://more-coding.com/

## GitHub
https://github.com/NaokiMM/more-coding

## 教材資料（非公開）
https://drive.google.com/drive/u/0/folders/12MTCsc9PduvNM-P7HixS1Ve5Kz-vwIAL

# 開発構成要素
## Stgブランチ
AWS AmpligyでStgブランチを本番同様、デプロイしています。 
また、Stgブランチは認証機能付きであるためUsername/Passwordが必要です。
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

## GitHub への適用ルール

### コミット・プッシュルール
1 push = 1 機能追加 を原則とし、各内容は「何をしたのか」を第三者に説明できる、理解しやすい形にまとめる。

### マージルール

すべての変更は以下の手順で反映してください。
・1. 作業用ブランチを作成<br>
・2. 変更をコミット・push
・3. Pull Request を作成
・4. 最低1件のレビュー承認後にマージ

※承認なしでは main にマージできません。

### GitHubブランチ設定方法
#### Repositry > Settings > Branches > Branch protection rule内でブランチルールを設定
#### PR必須: Require a pull request before merging > Require approvals（1）
#### 管理者もPR必須: Do not allow bypassing the above settings

## AWSクラウドの主な使用サービス
##### DB: DynamoDB
##### 認証: Cognito
##### メール配信：Amazon SES
##### サーバー: Lambda・Amplify（環境変数含む）
##### API: API Gateway
##### オブジェクトストレージ: S3
##### CDN: CloudFront
##### ドメイン管理: Route53
##### アカウン制御: IAM
##### コンテナサービス: Docker
##### 監視・ログ：CloudWatch
##### IAC:Terraform

## 試験実施ツール
### Safe Exam Browser
https://safeexambrowser.org/download_en.html

## テスト方針
### 単体テスト
ロジック単位の検証は自動テストで実施する。

### 結合テスト
API と DB、フロントエンドと API の連携部分を検証する。

### システムテスト（E2E）
システム全体の動作確認は
Playwright を使用して自動化する。
ブラウザ操作（画面遷移・フォーム入力・API応答確認など）を自動実行し、本番に近い環境での動作保証を行う。
重要なユーザーフロー（認証、サブスクリプション処理など）を中心に自動化し、UXや最終確認は必要に応じて手動テストを併用する。

## AI面接
https://aistudio.google.com　にて、Gemini APIを使用する。

## 請求サービス
Stripeを使用している。

### 必要なコマンド
#### ログイン確認
stripe login

#### ログイン確認
stripe config --list

## Contribution / コントリビューション
本リポジトリは OSSに近い運用 をしています。

## 共同開発者
リポジトリオーナーが Write 権限 を付与します。作業はブランチ作成 → PR。main への直接 push は不可。すべての PR は オーナーのレビュー・承認後にマージされます。

## 外部コントリビューター
Fork → 変更 → Pull Request を作成してください。
