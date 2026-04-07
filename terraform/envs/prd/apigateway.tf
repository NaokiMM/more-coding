# --------------------
# API Gateway (HTTP API)
# --------------------

resource "aws_apigatewayv2_api" "http_api_prd" {
  name          = "more-coding-http-api-prd"
  protocol_type = "HTTP" # 軽量・低コストなHTTP APIを採用

  # CORS設定
  cors_configuration {
    allow_credentials = false
    allow_headers = [
      "authorization",
      "content-type",
    ]
    # 許可するHTTPメソッド一覧（CRUD+CORS対応（OPTIONS））
    allow_methods = [
      "DELETE",
      "GET",
      "OPTIONS",
      "POST",
      "PUT",
    ]
    # 許可するオリジン（本番のCloudFrontドメインと独自ドメインのみ）
    allow_origins = [
      "https://d3gklr0mt0llh9.cloudfront.net",
      "https://more-coding.com",
    ]
    # フロントから参照可能にするレスポンスヘッダー（今回は不要）
    # CORSの許可結果を一切覚えない
    expose_headers = []
    max_age        = 0
  }
}

# API Gateway 全体（本体）の import
# 既存のAPI GatewayをTerraformのstate（状態）に取り込み管理対象にする
import {
  to = aws_apigatewayv2_api.http_api_prd
  id = "3vzpk49lm0"
}

########################################
########## API Gateway Routes ##########
########################################

# resourceの説明
# route_keyはAPIのパスとメソッド
# authorization_type・authorizer_idは認証まわり（Authorizationにある）
# targetはどこに処理飛ばすか（Integrationsにある）

# importの説明
# toはTerraform側のリソース
# idは既存RouteのID（コンソールのRoute detailsにある）

resource "aws_apigatewayv2_route" "get_me_subscription" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "GET /me/subscription"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/c9xqswf"
}

import {
  to = aws_apigatewayv2_route.get_me_subscription
  id = "3vzpk49lm0/0tgfoof"
}

resource "aws_apigatewayv2_route" "post_me_learning_resume" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "POST /me/learning-resume"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
}

import {
  to = aws_apigatewayv2_route.post_me_learning_resume
  id = "3vzpk49lm0/19hlhwj"
}

resource "aws_apigatewayv2_route" "put_me_profile_image" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "PUT /me/profile-image"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/ieqklhu"
}

import {
  to = aws_apigatewayv2_route.put_me_profile_image
  id = "3vzpk49lm0/2h2ukm7"
}

resource "aws_apigatewayv2_route" "post_me_subscription" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "POST /me/subscription"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/h3neunj"
}

import {
  to = aws_apigatewayv2_route.post_me_subscription
  id = "3vzpk49lm0/4a823u0"
}

resource "aws_apigatewayv2_route" "post_me_learning_histories" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "POST /me/learning-histories"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/4si6nmq"
}

import {
  to = aws_apigatewayv2_route.post_me_learning_histories
  id = "3vzpk49lm0/au9yvn3"
}

resource "aws_apigatewayv2_route" "post_inquiries" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "POST /inquiries"
  authorization_type = "NONE"
}

import {
  to = aws_apigatewayv2_route.post_inquiries
  id = "3vzpk49lm0/dfycb47"
}

resource "aws_apigatewayv2_route" "post_me_profile_image" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "POST /me/profile-image"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/ellxqce"
}

import {
  to = aws_apigatewayv2_route.post_me_profile_image
  id = "3vzpk49lm0/fpv50uf"
}

resource "aws_apigatewayv2_route" "get_me_learning_histories" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "GET /me/learning-histories"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/tw0dytf"
}

import {
  to = aws_apigatewayv2_route.get_me_learning_histories
  id = "3vzpk49lm0/fvjr9su"
}

resource "aws_apigatewayv2_route" "get_me_learning_resume" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "GET /me/learning-resume"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
}

import {
  to = aws_apigatewayv2_route.get_me_learning_resume
  id = "3vzpk49lm0/mlkh42k"
}

resource "aws_apigatewayv2_route" "get_me" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "GET /me"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/04fm07j"
}

import {
  to = aws_apigatewayv2_route.get_me
  id = "3vzpk49lm0/pj1dokd"
}

resource "aws_apigatewayv2_route" "get_me_profile_image" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "GET /me/profile-image"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/2f8ib3c"
}

import {
  to = aws_apigatewayv2_route.get_me_profile_image
  id = "3vzpk49lm0/qpxxj3n"
}

resource "aws_apigatewayv2_route" "delete_me_subscription" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "DELETE /me/subscription"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/cfzw2ie"
}

import {
  to = aws_apigatewayv2_route.delete_me_subscription
  id = "3vzpk49lm0/t51atfe"
}

resource "aws_apigatewayv2_route" "put_me" {
  api_id             = aws_apigatewayv2_api.http_api_prd.id
  route_key          = "PUT /me"
  authorization_type = "JWT"
  authorizer_id      = "np6zkt"
  target             = "integrations/04fm07j"
}

import {
  to = aws_apigatewayv2_route.put_me
  id = "3vzpk49lm0/ww5hwaf"
}

########################################
###### API Gateway Integrations #######
########################################

# resourceの説明
# API GatewayからLambdaにリクエストを送る設定（Integrations画面の内容）
# integration_uriは実行するLambda、その他はPayloadやTimeoutなどの設定

# importの説明
# 既存のIntegrationをTerraformで管理するための取り込み
# idはAPI ID / Integration ID（Integrations画面のID）

resource "aws_apigatewayv2_integration" "me_api_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-me-api-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.me_api_prd
  id = "3vzpk49lm0/04fm07j"
}

resource "aws_apigatewayv2_integration" "profile_image_get_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-profile-image-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.profile_image_get_prd
  id = "3vzpk49lm0/2f8ib3c"
}

resource "aws_apigatewayv2_integration" "learning_histories_post_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-learning-histories-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.learning_histories_post_prd
  id = "3vzpk49lm0/4si6nmq"
}

resource "aws_apigatewayv2_integration" "subscription_status_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-subscription-status-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.subscription_status_prd
  id = "3vzpk49lm0/c9xqswf"
}

resource "aws_apigatewayv2_integration" "subscription_stop_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-subscription-stop-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.subscription_stop_prd
  id = "3vzpk49lm0/cfzw2ie"
}

resource "aws_apigatewayv2_integration" "profile_image_post_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-profile-image-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.profile_image_post_prd
  id = "3vzpk49lm0/ellxqce"
}

resource "aws_apigatewayv2_integration" "subscription_start_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-subscription-start-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.subscription_start_prd
  id = "3vzpk49lm0/h3neunj"
}

resource "aws_apigatewayv2_integration" "profile_image_put_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-profile-image-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.profile_image_put_prd
  id = "3vzpk49lm0/ieqklhu"
}

resource "aws_apigatewayv2_integration" "learning_histories_get_prd" {
  api_id                 = aws_apigatewayv2_api.http_api_prd.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = "arn:aws:lambda:ap-northeast-1:077793792738:function:more-coding-learning-histories-prd"
  connection_type        = "INTERNET"
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

import {
  to = aws_apigatewayv2_integration.learning_histories_get_prd
  id = "3vzpk49lm0/tw0dytf"
}

########################################
###### API Gateway Authorization #######
########################################

# resourceの説明
# Authorizationで設定している認証（JWT）の内容
# トークンをどこから取るか・どのユーザープールを使うかを定義

# importの説明
# 既存のAuthorization設定をTerraformで管理するための取り込み
# idはAPI ID / Authorizer ID（Authorizationの画面にある）

resource "aws_apigatewayv2_authorizer" "jwt_prd_authorizer" {
  api_id           = aws_apigatewayv2_api.http_api_prd.id
  name             = "more-coding-jwt-prd-authorizer"
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]

  jwt_configuration {
    audience = ["48e61eu4153dgcjrttaasf1a36"]
    issuer   = "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_oEOTm9Lhz"
  }
}

import {
  to = aws_apigatewayv2_authorizer.jwt_prd_authorizer
  id = "3vzpk49lm0/np6zkt"
}