# --------------------
# Cognito User Pool
# --------------------
resource "aws_cognito_user_pool" "more_coding_prd" {
  # --------------------
  # Overview / Basic
  # --------------------
  name                = "more-coding-prd"
  deletion_protection = "ACTIVE"
  mfa_configuration   = "OFF"

  # --------------------
  # Applications
  # --------------------
  # App clients はこのresourceでは管理しない。
  # Terraformでは aws_cognito_user_pool_client として別resourceで定義するため。
  # (例: more-coding-prd-user)

  # --------------------
  # Authentication > Sign-in
  # --------------------
  username_attributes = ["email"]

  username_configuration {
    case_sensitive = false
  }

  sign_in_policy {
    allowed_first_auth_factors = ["PASSWORD"]
  }

  # --------------------
  # Authentication > Sign-up
  # --------------------
  auto_verified_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  # --------------------
  # Security
  # --------------------
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 2
    }
  }

  password_policy {
    minimum_length                   = 8
    password_history_size            = 0
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  # --------------------
  # Branding
  # --------------------
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }
}

import {
  to = aws_cognito_user_pool.more_coding_prd
  id = "ap-northeast-1_oEOTm9Lhz"
}