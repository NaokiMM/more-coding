# --------------------
# S3
# --------------------
resource "aws_s3_bucket" "learning_content_dev" {}
resource "aws_s3_bucket" "learning_content_prd" {}
resource "aws_s3_bucket" "learning_content_stg" {}
resource "aws_s3_bucket" "profile_images_dev" {}
resource "aws_s3_bucket" "profile_images_prd" {}
resource "aws_s3_bucket" "profile_images_stg" {}

import {
  to = aws_s3_bucket.learning_content_dev
  id = "more-coding-learning-content-dev"
}

import {
  to = aws_s3_bucket.learning_content_prd
  id = "more-coding-learning-content-prd"
}

import {
  to = aws_s3_bucket.learning_content_stg
  id = "more-coding-learning-content-stg"
}

import {
  to = aws_s3_bucket.profile_images_dev
  id = "more-coding-profile-images-dev"
}

import {
  to = aws_s3_bucket.profile_images_prd
  id = "more-coding-profile-images-prd"
}

import {
  to = aws_s3_bucket.profile_images_stg
  id = "more-coding-profile-images-stg"
}
