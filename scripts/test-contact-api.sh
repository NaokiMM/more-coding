#!/bin/bash
# お問合わせ本番疎通テスト

curl -X POST \
  "$NEXT_PUBLIC_CONTACT_API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Naoki",
    "email":"test@example.com",
    "category":"テスト",
    "subject":"動作確認",
    "message":"お問い合わせのテストです"
  }'
