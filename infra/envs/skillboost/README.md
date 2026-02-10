
## envs/more-coding

`more-coding` 環境用の Terraform 定義を管理します。

### provider.tf

AWS プロバイダー設定と、この環境で利用する AWS リソースを定義します。

```hcl
provider "aws" {
  region  = "ap-northeast-1"
  profile = "xxxxxxxxxxxx"
}

resource "xxxxxxxxxxxx" "site" {
  bucket = "xxxxxxxxxxxx"
}
