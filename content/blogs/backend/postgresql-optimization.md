---
title: PostgreSQL パフォーマンス最適化
date: 2026-01-12
tags: ["PostgreSQL", "データベース", "パフォーマンス", "SQL"]
excerpt: PostgreSQLのクエリパフォーマンスを向上させるためのインデックス戦略、クエリ最適化、設定調整の方法を解説します。
---

# PostgreSQL パフォーマンス最適化

PostgreSQLのパフォーマンスを最適化することで、アプリケーションの応答速度を大幅に向上させることができます。この記事では、実践的な最適化手法を紹介します。

## インデックスの適切な使用

### B-treeインデックス

最も一般的なインデックスタイプ：

\`\`\`sql
-- 単一カラムのインデックス
CREATE INDEX idx_user_email ON users(email);

-- 複合インデックス
CREATE INDEX idx_user_status_created ON users(status, created_at);
\`\`\`

### 部分インデックス

条件に一致する行のみにインデックスを作成：

\`\`\`sql
CREATE INDEX idx_active_users ON users(email) 
WHERE status = 'active';
\`\`\`

## クエリの最適化

### EXPLAIN ANALYZE の活用

クエリの実行プランを確認：

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

### N+1問題の回避

\`\`\`sql
-- 悪い例
SELECT * FROM posts;
-- 各投稿に対して別々にクエリ
SELECT * FROM comments WHERE post_id = 1;
SELECT * FROM comments WHERE post_id = 2;

-- 良い例
SELECT 
  p.*,
  json_agg(c.*) as comments
FROM posts p
LEFT JOIN comments c ON c.post_id = p.id
GROUP BY p.id;
\`\`\`

## 設定の調整

### postgresql.conf の最適化

\`\`\`conf
# メモリ設定
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 16MB

# 接続設定
max_connections = 100
\`\`\`

## バキュームとアナライズ

定期的なメンテナンス：

\`\`\`sql
VACUUM ANALYZE users;
\`\`\`

## まとめ

PostgreSQLのパフォーマンス最適化には、適切なインデックスの作成、クエリの最適化、設定の調整が重要です。これらの手法を実践して、高速なデータベースアプリケーションを構築しましょう。
