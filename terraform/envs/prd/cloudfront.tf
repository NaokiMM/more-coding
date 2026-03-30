# --------------------
# CloudFront Distributions
# --------------------
resource "aws_cloudfront_distribution" "cdn_dev" {}
resource "aws_cloudfront_distribution" "cdn_prd" {}
resource "aws_cloudfront_distribution" "cdn_s3" {}

import {
  to = aws_cloudfront_distribution.cdn_dev
  id = "E1RL0N4Q8XN6GS"
}

import {
  to = aws_cloudfront_distribution.cdn_prd
  id = "E7FYRVVFZPAQ7"
}

import {
  to = aws_cloudfront_distribution.cdn_s3
  id = "EDW6XOU6MO13K"
}
