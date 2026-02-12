---
title: CI/CD パイプライン構築ガイド
date: 2026-01-11
tags: ["CI/CD", "DevOps", "自動化", "GitHub Actions"]
excerpt: GitHub Actionsを使った継続的インテグレーション・継続的デプロイメントパイプラインの構築方法を解説します。
---

# CI/CD パイプライン構築ガイド

CI/CDパイプラインを構築することで、コードの品質を保証し、デプロイを自動化できます。この記事では、GitHub Actionsを使った実践的な方法を紹介します。

## GitHub Actions の基本

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm install
    - run: npm test
    - run: npm run lint
\`\`\`

## テストの自動化

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm test
      env:
        CI: true
\`\`\`

## 自動デプロイ

\`\`\`yaml
jobs:
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to AWS
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ap-northeast-1
    - name: Deploy
      run: |
        # デプロイスクリプト
\`\`\`

## マトリックスビルド

複数の環境やバージョンでテストを実行：

\`\`\`yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16, 18, 20]
\`\`\`

## まとめ

CI/CDパイプラインを構築することで、コードの品質向上とデプロイの効率化を実現できます。GitHub Actionsを活用して、自動化された開発ワークフローを構築しましょう。
