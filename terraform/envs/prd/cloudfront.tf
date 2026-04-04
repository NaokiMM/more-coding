# --------------------
# CloudFront Distributions
# --------------------
resource "aws_cloudfront_distribution" "cdn_prd" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = "more-coding-cdnのprd"
  price_class     = "PriceClass_All"
  web_acl_id      = "arn:aws:wafv2:us-east-1:077793792738:global/webacl/CreatedByCloudFront-a381b2b7/1a0436dc-a81e-49c8-91fb-2ce3852507cd"

  # Tags
  tags = {
    Name = "more-coding-cdn-prd"
  }

  # origins
  origin {
    domain_name              = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com"
    origin_id                = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com-mltm94cf23z"
    origin_access_control_id = "E1RZ1IG3NWYRD3"
  }

  # Behaviors
  default_cache_behavior {
    target_origin_id       = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com-mltm94cf23z"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # Behaviors
  ordered_cache_behavior {
    path_pattern               = "/questions/*"
    target_origin_id           = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com-mltm94cf23z"
    viewer_protocol_policy     = "redirect-to-https"
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    compress                   = true
    cache_policy_id            = "658327ea-f89d-4fab-a63d-7e88639e58f6"
    response_headers_policy_id = "eaab4381-ed33-4a86-88ca-d9558dc6cd63"
  }

  # CloudFront全体へのアクセスを国単位で制御している
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # HTTPS通信の設定（証明書とセキュリティレベル）
  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1"
  }
}

# すでにAWSにあるリソースをTerraformに取り込む
import {
  to = aws_cloudfront_distribution.cdn_prd
  id = "E7FYRVVFZPAQ7"
}