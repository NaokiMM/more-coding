# --------------------
# Lambda Functions
# --------------------

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "question_list_prd" {
  function_name = "more-coding-question-list-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-question-list-prd-role-me22t1pa"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"

  environment {
    variables = {
      ALLOWED_ORIGIN = "https://d3gklr0mt0llh9.cloudfront.net"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "me_api_prd" {
  function_name = "more-coding-me-api-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-me-api-prd-role-mamp2pn7"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"

  environment {
    variables = {
      ALLOWED_ORIGIN = "https://d3gklr0mt0llh9.cloudfront.net"
      MEMBERS_TABLE  = "more-coding-user-auth-members-prd"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "subscription_status_prd" {
  function_name = "more-coding-subscription-status-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-subscription-status-prd-role-qnme5100"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "subscription_start_prd" {
  function_name = "more-coding-subscription-start-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-subscription-start-prd-role-29ogp0w4"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"

  environment {
    variables = {
      TABLE_NAME = "more-coding-user-auth-members-prd"
    }
  }
}

# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "subscription_stop_prd" {
  function_name = "more-coding-subscription-stop-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-subscription-stop-prd-role-smt2u4r9"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"

  environment {
    variables = {
      TABLE_NAME = "more-coding-user-auth-members-prd"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "inquiries_api_prd" {
  function_name = "more-coding-inquiries-api-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-inquiries-api-prd-role-1oy07r2e"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"

  environment {
    variables = {
      FROM_EMAIL = "no-reply@more-coding.com"
      TO_EMAIL   = "namnam3225@gmail.com"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "learning_histories_prd" {
  function_name = "more-coding-learning-histories-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-learning-histories-prd-role-fahbfj7w"
  runtime       = "nodejs24.x"
  handler       = "index.handler"

  filename = "dummy.zip"

  # 👇ここに追加
  environment {
    variables = {
      PROGRESS_TABLE = "more-coding-user-learn-history-prd"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "learning_session_resume_prd" {
  function_name = "more-coding-learning-session-resume-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-learning-session-resume-prd-role-8onpf95f"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  filename      = "dummy.zip"

  environment {
    variables = {
      PROGRESS_TABLE = "more-coding-user-resume-learning-prd"
    }
  }
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Lambda Function
# ========================================
resource "aws_lambda_function" "profile_image_prd" {
  function_name = "more-coding-profile-image-prd"
  role          = "arn:aws:iam::077793792738:role/service-role/more-coding-profile-image-prd-role-ytvrcjs1"
  handler       = "index.handler"
  runtime       = "nodejs24.x"
  description   = "prd"
  filename      = "dummy.zip"
}
# ========================================
# End Lambda Function
# ========================================

# ========================================
# Import Lambda Functions
# ========================================
import {
  to = aws_lambda_function.question_list_prd
  id = "more-coding-question-list-prd"
}

import {
  to = aws_lambda_function.me_api_prd
  id = "more-coding-me-api-prd"
}

import {
  to = aws_lambda_function.subscription_status_prd
  id = "more-coding-subscription-status-prd"
}

import {
  to = aws_lambda_function.subscription_start_prd
  id = "more-coding-subscription-start-prd"
}

import {
  to = aws_lambda_function.subscription_stop_prd
  id = "more-coding-subscription-stop-prd"
}

import {
  to = aws_lambda_function.inquiries_api_prd
  id = "more-coding-inquiries-api-prd"
}

import {
  to = aws_lambda_function.learning_histories_prd
  id = "more-coding-learning-histories-prd"
}

import {
  to = aws_lambda_function.learning_session_resume_prd
  id = "more-coding-learning-session-resume-prd"
}

import {
  to = aws_lambda_function.profile_image_prd
  id = "more-coding-profile-image-prd"
}
# ========================================
# End Import Lambda Functions
# ========================================