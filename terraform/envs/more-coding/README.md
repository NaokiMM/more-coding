# envs/more-coding

`more-coding` 環境の Terraform 定義です。

## 各ファイルの役割

- **provider.tf** … AWS プロバイダーの設定（リージョン・プロファイル）と、この環境で作成するリソース（例: S3 バケット）を定義する。
- **.terraform.lock.hcl** … 利用するプロバイダー（AWS など）のバージョンを固定する。`terraform init` で自動更新される。
- **.terraform/** … `terraform init` で生成されるプロバイダー本体のキャッシュ。Git には含めない。
- **terraform.tfstate** … 現在のインフラの状態を保持する。Git には含めない（ローカルまたはリモートバックエンドで管理）。

## よく使うコマンド

- `cd terraform/envs/more-coding` でこのディレクトリへ移動
- `terraform init` … 初回またはプロバイダー変更時
- `terraform plan` … 変更内容の確認
- `terraform apply` … 変更の反映
