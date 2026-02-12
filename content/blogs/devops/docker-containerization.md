---
title: Docker コンテナ化入門
date: 2026-01-06
tags: ["Docker", "DevOps", "コンテナ"]
excerpt: Dockerを使ったアプリケーションのコンテナ化方法を、実践的な例を通じて学びます。
---

# Docker コンテナ化入門

Dockerは、アプリケーションをコンテナとしてパッケージングするためのプラットフォームです。この記事では、基本的な使い方を解説します。

## Dockerfileの作成

アプリケーションをコンテナ化するには、`Dockerfile`を作成します：

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## イメージのビルド

\`\`\`bash
docker build -t my-app:latest .
\`\`\`

## コンテナの実行

\`\`\`bash
docker run -p 3000:3000 my-app:latest
\`\`\`

## Docker Composeの活用

複数のサービスを管理するには、`docker-compose.yml`を使用：

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
\`\`\`

## まとめ

Dockerを使うことで、開発環境と本番環境の一貫性を保ち、デプロイを簡単にすることができます。コンテナ化を活用して、より効率的な開発ワークフローを構築しましょう。
