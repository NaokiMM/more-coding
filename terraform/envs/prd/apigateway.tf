# --------------------
# API Gateway (HTTP API)
# --------------------
resource "aws_apigatewayv2_api" "http_api_dev" {}
resource "aws_apigatewayv2_api" "http_api_prd" {}
resource "aws_apigatewayv2_api" "http_api_stg" {}

import {
  to = aws_apigatewayv2_api.http_api_dev
  id = "mawzxj2wb0"
}

import {
  to = aws_apigatewayv2_api.http_api_prd
  id = "3vzpk49lm0"
}

import {
  to = aws_apigatewayv2_api.http_api_stg
  id = "x9zpcbszc3"
}
