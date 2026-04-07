# --------------------
# CloudFront Distributions
# --------------------
resource "aws_cloudfront_origin_access_control" "learning_content_prd" {
  name                              = "more-coding-learning-content-prd-oac"
  description                       = "OAC for more-coding-learning-content-prd (prd)"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn_prd" {
  # --------------------
  # General
  # --------------------
  enabled         = true
  is_ipv6_enabled = true
  comment         = "more-coding-cdnのprd"
  price_class     = "PriceClass_All"

  viewer_certificate {
    cloudfront_default_certificate = true
    minimum_protocol_version       = "TLSv1"
  }

  # --------------------
  # Security
  # --------------------
  web_acl_id = "arn:aws:wafv2:us-east-1:077793792738:global/webacl/CreatedByCloudFront-a381b2b7/1a0436dc-a81e-49c8-91fb-2ce3852507cd"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # --------------------
  # Origins
  # --------------------
  origin {
    domain_name              = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com"
    origin_id                = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com-mltm94cf23z"
    origin_access_control_id = aws_cloudfront_origin_access_control.learning_content_prd.id
  }

  # --------------------
  # Behaviors
  # --------------------
  default_cache_behavior {
    target_origin_id       = "more-coding-learning-content-prd.s3.ap-northeast-1.amazonaws.com-mltm94cf23z"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

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

  # --------------------
  # Logging
  # --------------------
  logging_config {
    include_cookies = false
    bucket          = "more-coding-cloudfront-logs-prd.s3.amazonaws.com"
    prefix          = "cloudfront/"
  }

  # --------------------
  # Tags
  # --------------------
  tags = {
    Name = "more-coding-cdn-prd"
  }
}

# すでにAWSにあるリソースをTerraformに取り込む
import {
  to = aws_cloudfront_distribution.cdn_prd
  id = "E7FYRVVFZPAQ7"
}

import {
  to = aws_cloudfront_origin_access_control.learning_content_prd
  id = "E1RZ1IG3NWYRD3"
}