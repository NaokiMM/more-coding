# terraformの手順書
## Terraform運用フロー

1. `.tf` を修正する（feature ブランチで作業）
2. `terraform plan` を実行する
   - この変更で AWS に何が起きるか確認する
3. PR を作成する
   - 変更内容と plan 結果を共有する
4. レビューする
   - コードと plan の差分が意図どおりか確認する
5. PR を `main` にマージする
   - `main` が正しい状態になる
6. `main` に対して `terraform apply` を実行する
   - `main` の内容を AWS に反映する

## Gitルール
### terraform関連でgitにアップロードするものとそうでないもの。
・.tf系のファイル → Gitアップロードする（OK）
・tfstate → Gitアップロードしない（絶対NG）
・.lock.hcl → 基本はアップロードする（←ここだけ違う）

## terraform操作の事前準備
cd terraform/envs/prd
rm -rf .terraform
rm -f .terraform.lock.hcl

### terraform初回 or terraformが壊れた時だけ使用
terraform init

## terraform定常操作
### terraformファイル（.tf）を自動でキレイに整形するコマンド
terraform fmt

###「AWSの実態をTerraform用コードに変換するための中間データを見る」
terraform show

### 各tfファイルのRoutes・Integrations・Authorizers取得
aws 対象リソース get-routes \
  --api-id AWS画面に記載されている \
  --region AWS画面に記載されている \
  --profile AdministratorAccess-077793792738（SSOログイン時に使用している）
  -- json > xxxxxxx.json（ここに出力させた方がわかりやすい。）

### tfの文法や参照ミス の確認
terraform validate

## plan操作
### 差分確認だけしたいとき
terraform plan

### plan結果を保存したいとき
terraform plan -out=tfplan

### 保存したplanをそのまま適用したいとき
terraform apply tfplan

## apply準備
### 削除防止を追加
lifecycle {
  prevent_destroy = true
}

## apply実行
### tfの状態にAWSを合わせる（問題なければ実行）
terraform apply

## terraform import手法
全体方針（共通パターン）
  • AWS から リソース一覧を取得
  • 各リソースの 詳細を JSON に保存
  • JSON を見ながら Terraform に落とす
  • 必要なら import で state に取り込む