# --------------------
# S3 prdのみ
# --------------------

resource "aws_s3_bucket" "learning_content_prd" {
  bucket = "more-coding-learning-content-prd"
}

resource "aws_s3_bucket" "profile_images_prd" {
  bucket = "more-coding-profile-images-prd"
}

import {
  to = aws_s3_bucket.learning_content_prd
  id = "more-coding-learning-content-prd"
}

import {
  to = aws_s3_bucket.profile_images_prd
  id = "more-coding-profile-images-prd"
}