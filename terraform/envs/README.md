# terraformの手順書

## terraform関連でgitにアップロードするものとそうでないもの。
・.tf系のファイル → Gitアップロードする（OK）
・tfstate → Gitアップロードしない（絶対NG）
・.lock.hcl → 基本はアップロードする（←ここだけ違う）

## 事前準備（不要なものを削除）
cd terraform/envs/prd
rm -rf .terraform
rm -f .terraform.lock.hcl

## 初回 or 壊れた時だけ
terraform init

## 定期実行の準備
terraform plan

## tfの状態にAWSを合わせる（問題なければ実行）
terraform apply
