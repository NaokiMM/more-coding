# --------------------
# Lambda Functions
# --------------------
resource "aws_lambda_function" "questions_list_dev" {}
resource "aws_lambda_function" "questions_list_prd" {}
resource "aws_lambda_function" "questions_list_stg" {}

resource "aws_lambda_function" "me_api_dev" {}
resource "aws_lambda_function" "me_api_prd" {}
resource "aws_lambda_function" "me_api_stg" {}

resource "aws_lambda_function" "subscription_status_dev" {}
resource "aws_lambda_function" "subscription_status_prd" {}
resource "aws_lambda_function" "subscription_status_stg" {}

resource "aws_lambda_function" "subscription_start_dev" {}
resource "aws_lambda_function" "subscription_start_prd" {}
resource "aws_lambda_function" "subscription_start_stg" {}

resource "aws_lambda_function" "subscription_stop_dev" {}
resource "aws_lambda_function" "subscription_stop_prd" {}
resource "aws_lambda_function" "subscription_stop_stg" {}

resource "aws_lambda_function" "inquiries_api_dev" {}
resource "aws_lambda_function" "inquiries_api_prd" {}
resource "aws_lambda_function" "inquiries_api_stg" {}

resource "aws_lambda_function" "learning_histories_dev" {}
resource "aws_lambda_function" "learning_histories_prd" {}
resource "aws_lambda_function" "learning_histories_stg" {}

resource "aws_lambda_function" "learning_session_resume_dev" {}
resource "aws_lambda_function" "learning_session_resume_stg" {}
resource "aws_lambda_function" "learning_session_resume_prd" {}

resource "aws_lambda_function" "profile_image_dev" {}
resource "aws_lambda_function" "profile_image_prd" {}
resource "aws_lambda_function" "profile_image_stg" {}

import {
  to = aws_lambda_function.questions_list_dev
  id = "more-coding-questions-list-dev"
}

import {
  to = aws_lambda_function.questions_list_prd
  id = "more-coding-questions-list-prd"
}

import {
  to = aws_lambda_function.questions_list_stg
  id = "more-coding-questions-list-stg"
}

import {
  to = aws_lambda_function.me_api_dev
  id = "more-coding-me-api-dev"
}

import {
  to = aws_lambda_function.me_api_prd
  id = "more-coding-me-api-prd"
}

import {
  to = aws_lambda_function.me_api_stg
  id = "more-coding-me-api-stg"
}

import {
  to = aws_lambda_function.subscription_status_dev
  id = "more-coding-subscription-status-dev"
}

import {
  to = aws_lambda_function.subscription_status_prd
  id = "more-coding-subscription-status-prd"
}

import {
  to = aws_lambda_function.subscription_status_stg
  id = "more-coding-subscription-status-stg"
}

import {
  to = aws_lambda_function.subscription_start_dev
  id = "more-coding-subscription-start-dev"
}

import {
  to = aws_lambda_function.subscription_start_prd
  id = "more-coding-subscription-start-prd"
}

import {
  to = aws_lambda_function.subscription_start_stg
  id = "more-coding-subscription-start-stg"
}

import {
  to = aws_lambda_function.subscription_stop_dev
  id = "more-coding-subscription-stop-dev"
}

import {
  to = aws_lambda_function.subscription_stop_prd
  id = "more-coding-subscription-stop-prd"
}

import {
  to = aws_lambda_function.subscription_stop_stg
  id = "more-coding-subscription-stop-stg"
}

import {
  to = aws_lambda_function.inquiries_api_dev
  id = "more-coding-inquiries-api-dev"
}

import {
  to = aws_lambda_function.inquiries_api_prd
  id = "more-coding-inquiries-api-prd"
}

import {
  to = aws_lambda_function.inquiries_api_stg
  id = "more-coding-inquiries-api-stg"
}

import {
  to = aws_lambda_function.learning_histories_dev
  id = "more-coding-learning-histories-dev"
}

import {
  to = aws_lambda_function.learning_histories_prd
  id = "more-coding-learning-histories-prd"
}

import {
  to = aws_lambda_function.learning_histories_stg
  id = "more-coding-learning-histories-stg"
}

import {
  to = aws_lambda_function.learning_session_resume_dev
  id = "more-coding-learning-session-resume-dev"
}

import {
  to = aws_lambda_function.learning_session_resume_prd
  id = "more-coding-learning-session-resume-prd"
}

import {
  to = aws_lambda_function.learning_session_resume_stg
  id = "more-coding-learning-session-resume-stg"
}

import {
  to = aws_lambda_function.profile_image_dev
  id = "more-coding-profile-image-dev"
}

import {
  to = aws_lambda_function.profile_image_prd
  id = "more-coding-profile-image-prd"
}

import {
  to = aws_lambda_function.profile_image_stg
  id = "more-coding-profile-image-stg"
}
