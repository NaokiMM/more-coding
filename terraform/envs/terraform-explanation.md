# Terraform まわりで「知っている」こと（個人開発 more-coding ベース）

根拠は `terraform/envs/prd/*.tf` と `terraform/envs/README.md`。

---

## Terraform 知っていること

- Terraform の **resource** でインフラを宣言することを知っています。
- **`import { to = … id = … }`** で既存リソースを state に取り込むことを知っています。
- **`terraform init` / `fmt` / `validate` / `plan` / `apply`** の役割を知っています。
- **plan の結果をファイルに保存し、`apply` に渡す**流れを知っています。
- **tfstate を Git にコミットしない**運用を知っています。
- **`.terraform.lock.hcl`** をリポジトリで共有する考え方を知っています。

## AWS 知っていること

`prd` では **API の入口〜サーバレス〜データ・認証〜静的配信**までを、おもに **`aws_*` の resource** で扱っています。

### Provider（接続）

- **`provider "aws"`** でリージョンや認証プロファイルを指定することを知っています。

### API Gateway（HTTP API / v2）

- **`aws_apigatewayv2_*`** で HTTP API を Terraform から扱うことを知っています。
- **CORS** を API 本体に書くことを知っています。
- **`aws_apigatewayv2_route`** でルート（メソッド + パス）を表現することを知っています。
- ルートに **JWT 認証**を紐付けることを知っています。

### Lambda

- **`aws_lambda_function`** で関数名・ランタイム・ハンドラ・環境変数などを宣言することを知っています。
- **実行ロールを既存 IAM ロールの ARN で参照**することを知っています。

### DynamoDB

- **`aws_dynamodb_table`** でテーブル名・キー・属性・課金モード（オンデマンド等）を宣言することを知っています。

### Cognito

- **`aws_cognito_user_pool`** でサインイン方式・パスワードポリシー・削除保護などを宣言することを知っています。

### S3

- **`aws_s3_bucket`** と、**パブリックアクセスブロック**・**オブジェクトオーナーシップ**・**サーバ側暗号化**・**バージョニング**を別 resource で付けることを知っています。
- **`aws_s3_bucket_policy`** と **`jsonencode`** で JSON ポリシーを書くことを知っています。
- **CloudFront からだけオブジェクトを読ませる**ためのバケットポリシーの考え方を知っています。

### CloudFront

- **`aws_cloudfront_distribution`** でオリジン・ビヘイビア・ログ・WAF 紐付けなどを宣言することを知っています。
- **`aws_cloudfront_origin_access_control`（OAC）** で S3 オリジンへの署名付きアクセスを扱うことを知っています。

## AWS CLI 知っていること

- **API Gateway のルート一覧を CLI で JSON に出して**、Terraform の記述と突き合わせる、というやり方を知っています（手順は `README.md` に記載）。

---

## この `.tf` をどう書いたか

- **生成 AI に相談**しながら進めました（resource の書き方の確認、import の考え方、エラー時の切り分けなど）。
- **Terraform / AWS まわりの記事をいくつか読み**、内容を踏まえて **`terraform plan` やコンソール・CLI と突き合わせながら**手を動かしました。
