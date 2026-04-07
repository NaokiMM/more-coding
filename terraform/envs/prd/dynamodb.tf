# --------------------
# DynamoDB Tables
# --------------------

# ========================================
# DynamoDB Table
# ========================================
resource "aws_dynamodb_table" "question_list_prd" {
  name         = "more-coding-question-list-prd"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  point_in_time_recovery {
    enabled = false
  }

  ttl {
    enabled = false
  }
}
# ========================================
# End DynamoDB Table
# ========================================

# ========================================
# DynamoDB Table
# ========================================
resource "aws_dynamodb_table" "user_auth_members_prd" {
  name         = "more-coding-user-auth-members-prd"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  point_in_time_recovery {
    enabled = false
  }

  ttl {
    enabled = false
  }
}
# ========================================
# End DynamoDB Table
# ========================================

# ========================================
# DynamoDB Table
# ========================================
resource "aws_dynamodb_table" "user_learn_history_prd" {
  name         = "more-coding-user-learn-history-prd"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  point_in_time_recovery {
    enabled = false
  }

  ttl {
    enabled = false
  }
}
# ========================================
# End DynamoDB Table
# ========================================

# ========================================
# DynamoDB Table
# ========================================
resource "aws_dynamodb_table" "user_resume_learning_prd" {
  name         = "more-coding-user-resume-learning-prd"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  point_in_time_recovery {
    enabled = false
  }

  ttl {
    enabled = false
  }
}
# ========================================
# End DynamoDB Table
# ========================================

# ========================================
# DynamoDB import
# ========================================
import {
  to = aws_dynamodb_table.question_list_prd
  id = "more-coding-question-list-prd"
}
# ========================================
# End DynamoDB import
# ========================================

# ========================================
# DynamoDB import
# ========================================
import {
  to = aws_dynamodb_table.user_auth_members_prd
  id = "more-coding-user-auth-members-prd"
}
# ========================================
# End DynamoDB import
# ========================================

# ========================================
# DynamoDB import
# ========================================
import {
  to = aws_dynamodb_table.user_learn_history_prd
  id = "more-coding-user-learn-history-prd"
}
# ========================================
# End DynamoDB import
# ========================================

# ========================================
# DynamoDB import
# ========================================
import {
  to = aws_dynamodb_table.user_resume_learning_prd
  id = "more-coding-user-resume-learning-prd"
}
# ========================================
# End DynamoDB import
# ========================================