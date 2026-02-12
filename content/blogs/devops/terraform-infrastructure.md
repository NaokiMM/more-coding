---
title: Terraform でインフラをコード化
date: 2026-01-09
tags: ["Terraform", "IaC", "インフラ", "AWS"]
excerpt: Terraformを使った Infrastructure as Code の実践方法を、AWS環境での具体例を通じて解説します。
---

# Terraform でインフラをコード化

Terraformは、インフラストラクチャをコードとして定義・管理するためのツールです。この記事では、基本的な使い方を解説します。

## Terraformの基本概念

- **Resource**: 作成・管理するインフラリソース
- **Provider**: AWS、Azure、GCPなどのクラウドプロバイダー
- **State**: 現在のインフラの状態を保存

## 基本的な設定

\`\`\`hcl
# provider.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}
\`\`\`

## リソースの作成

\`\`\`hcl
# s3.tf
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name"

  tags = {
    Name        = "My Bucket"
    Environment = "Production"
  }
}

resource "aws_s3_bucket_versioning" "my_bucket_versioning" {
  bucket = aws_s3_bucket.my_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
\`\`\`

## 変数の使用

\`\`\`hcl
# variables.tf
variable "bucket_name" {
  description = "S3バケット名"
  type        = string
}

# terraform.tfvars
bucket_name = "my-production-bucket"
\`\`\`

## 実行コマンド

\`\`\`bash
terraform init      # 初期化
terraform plan      # 変更内容の確認
terraform apply     # リソースの作成
terraform destroy   # リソースの削除
\`\`\`

## まとめ

Terraformを使うことで、インフラをコードとして管理し、バージョン管理や再現性を確保できます。これらの基本を理解して、効率的なインフラ管理を実現しましょう。
