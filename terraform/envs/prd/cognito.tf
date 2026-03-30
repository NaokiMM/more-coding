# --------------------
# Cognito User Pools
# --------------------
resource "aws_cognito_user_pool" "more_coding_dev" {}
resource "aws_cognito_user_pool" "more_coding_prd" {}
resource "aws_cognito_user_pool" "more_coding_stg" {}

import {
  to = aws_cognito_user_pool.more_coding_dev
  id = "ap-northeast-1_ZgpOrvzRF"
}

import {
  to = aws_cognito_user_pool.more_coding_prd
  id = "ap-northeast-1_oEOTm9Lhz"
}

import {
  to = aws_cognito_user_pool.more_coding_stg
  id = "ap-northeast-1_bRoKVb6uS"
}
