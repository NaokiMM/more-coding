# --------------------
# S3（prdのみ）
#
# このファイルは「バケット本体」＋「最低限の安全設定」＋「CloudFront 連携」を
# ひとまとまりで管理する。
#
# ポイント:
# - 公開バケットにはしない（Public Access Block を有効化）
# - ACL での権限管理は使わない（BucketOwnerEnforced）
# - 暗号化は S3 管理キー（SSE-S3 / AES256）
# - learning-content は CloudFront(OAC) からの読み取りのみ許可
# --------------------

# ========================================
# learning-content（学習コンテンツ）
#
# CloudFront 経由で配信する前提のコンテンツ置き場。
# S3 への直接アクセスは基本的に許可せず、CloudFront からの GetObject のみを許可する。
# ========================================
resource "aws_s3_bucket" "learning_content_prd" {
  bucket = "more-coding-learning-content-prd"
}

# --------------------
# セキュリティ基本設定（公開ブロック / ACL無効 / 暗号化 / バージョニング）
# --------------------
resource "aws_s3_bucket_public_access_block" "learning_content_prd" {
  bucket = aws_s3_bucket.learning_content_prd.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "learning_content_prd" {
  bucket = aws_s3_bucket.learning_content_prd.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "learning_content_prd" {
  bucket = aws_s3_bucket.learning_content_prd.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "learning_content_prd" {
  bucket = aws_s3_bucket.learning_content_prd.id

  versioning_configuration {
    status = "Enabled"
  }
}

# --------------------
# CloudFront(OAC) → S3 読み取り許可
#
# Principal は CloudFront サービス。SourceArn を distribution ARN に縛って、
# “この CloudFront からのみ” 読めるようにする。
# --------------------
resource "aws_s3_bucket_policy" "learning_content_prd_cloudfront_read" {
  bucket = aws_s3_bucket.learning_content_prd.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action = [
          "s3:GetObject",
        ]
        Resource = "${aws_s3_bucket.learning_content_prd.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn_prd.arn
          }
        }
      },
    ]
  })
}

# ========================================
# profile-images（プロフィール画像）
#
# アプリ側でアップロード/参照する用途を想定。
# 現時点では CloudFront 配信の前提がないため、ここではバケットの安全設定のみ管理する。
# ========================================
resource "aws_s3_bucket" "profile_images_prd" {
  bucket = "more-coding-profile-images-prd"
}

# --------------------
# セキュリティ基本設定（公開ブロック / ACL無効 / 暗号化）
# バージョニングは当面 Suspended（必要になったら Enabled に変更）
# --------------------
resource "aws_s3_bucket_public_access_block" "profile_images_prd" {
  bucket = aws_s3_bucket.profile_images_prd.id

  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "profile_images_prd" {
  bucket = aws_s3_bucket.profile_images_prd.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "profile_images_prd" {
  bucket = aws_s3_bucket.profile_images_prd.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_versioning" "profile_images_prd" {
  bucket = aws_s3_bucket.profile_images_prd.id

  versioning_configuration {
    status = "Suspended"
  }
}

# --------------------
# import（既存バケットを Terraform 管理に取り込み）
# ※このファイルでは “バケット本体” の import のみ記載している
# --------------------
import {
  to = aws_s3_bucket.learning_content_prd
  id = "more-coding-learning-content-prd"
}

import {
  to = aws_s3_bucket.profile_images_prd
  id = "more-coding-profile-images-prd"
}