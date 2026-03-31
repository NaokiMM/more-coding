/*
# --------------------
# API Gateway (HTTP API)
# --------------------

resource "aws_apigatewayv2_api" "http_api_prd" {
  name          = "more-coding-http-api-prd"
  protocol_type = "HTTP"

  cors_configuration {
    allow_credentials = false
    allow_headers = [
      "authorization",
      "content-type",
    ]
    allow_methods = [
      "DELETE",
      "GET",
      "OPTIONS",
      "POST",
      "PUT",
    ]
    allow_origins = [
      "https://d3gklr0mt0llh9.cloudfront.net",
      "https://more-coding.com",
    ]
    expose_headers = []
    max_age        = 0
  }
}

import {
  to = aws_apigatewayv2_api.http_api_prd
  id = "3vzpk49lm0"
}
*/