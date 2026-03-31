# terraform関連でgitにアップロードするものとそうでないもの。
・.tf系のファイル → アップロードする（OK）
・tfstate → アップロードしない（絶対NG）
・.lock.hcl → 基本はアップロードする（←ここだけ違う）

# 事前準備（不要なものを削除）
cd terraform/envs/prd
rm -rf .terraform
rm -f .terraform.lock.hcl

# 初回 or 壊れた時だけ
terraform init

# 定期実行の準備
terraform plan

# 既存リソースの設定を自動で書き出すコマンド
# generated.tf が存在する場合、中身が新しく生成されて上書きされる
terraform plan -generate-config-out=generated.tf

# tfの状態にAWSを合わせる（問題なければ実行）
terraform apply