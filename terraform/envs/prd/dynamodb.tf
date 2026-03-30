# --------------------
# DynamoDB Tables
# --------------------
resource "aws_dynamodb_table" "question_list_dev" {}
resource "aws_dynamodb_table" "question_list_prd" {}
resource "aws_dynamodb_table" "question_list_stg" {}

resource "aws_dynamodb_table" "user_auth_members_dev" {}
resource "aws_dynamodb_table" "user_auth_members_prd" {}
resource "aws_dynamodb_table" "user_auth_members_stg" {}

resource "aws_dynamodb_table" "user_learn_history_dev" {}
resource "aws_dynamodb_table" "user_learn_history_prd" {}
resource "aws_dynamodb_table" "user_learn_history_stg" {}

resource "aws_dynamodb_table" "user_resume_learning_dev" {}
resource "aws_dynamodb_table" "user_resume_learning_prd" {}
resource "aws_dynamodb_table" "user_resume_learning_stg" {}

import {
  to = aws_dynamodb_table.question_list_dev
  id = "more-coding-question-list-dev"
}

import {
  to = aws_dynamodb_table.question_list_prd
  id = "more-coding-question-list-prd"
}

import {
  to = aws_dynamodb_table.question_list_stg
  id = "more-coding-question-list-stg"
}

import {
  to = aws_dynamodb_table.user_auth_members_dev
  id = "more-coding-user-auth-members-dev"
}

import {
  to = aws_dynamodb_table.user_auth_members_prd
  id = "more-coding-user-auth-members-prd"
}

import {
  to = aws_dynamodb_table.user_auth_members_stg
  id = "more-coding-user-auth-members-stg"
}

import {
  to = aws_dynamodb_table.user_learn_history_dev
  id = "more-coding-user-learn-history-dev"
}

import {
  to = aws_dynamodb_table.user_learn_history_prd
  id = "more-coding-user-learn-history-prd"
}

import {
  to = aws_dynamodb_table.user_learn_history_stg
  id = "more-coding-user-learn-history-stg"
}

import {
  to = aws_dynamodb_table.user_resume_learning_dev
  id = "more-coding-user-resume-learning-dev"
}

import {
  to = aws_dynamodb_table.user_resume_learning_prd
  id = "more-coding-user-resume-learning-prd"
}

import {
  to = aws_dynamodb_table.user_resume_learning_stg
  id = "more-coding-user-resume-learning-stg"
}
