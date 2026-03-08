/**
 * Gin 教材（チュートリアル）ページ
 * ルート: /learn/gin/tutorial
 *
 * Ginの概要・インストール・基本使い方を解説する読み物教材です。
 */

"use client";

import Link from "next/link";
import Header from "@/components/Header";

export default function GinTutorialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/learn/gin" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Gin
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">教材</span>
        </nav>

        <header className="mb-12">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white text-2xl font-bold shadow-lg">
            G
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Gin 教材
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Goの高速Webフレームワーク「Gin」の基礎を、このページで学びます。ルーティング、ミドルウェア、APIの基本まで押さえましょう。
          </p>
        </header>

        <article className="space-y-14">
          {/* 1. Ginとは */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">1</span>
              Ginとは
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200">Gin</strong>は、Go（Golang）で書かれた高速なWebフレームワークです。
              net/httpをベースに、ルーティング・ミドルウェア・JSONバインディングなどが標準で用意されており、REST APIやWebアプリを少ないコードで開発できます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>軽量でパフォーマンスが高い</li>
              <li>ルーティングが直感的（GET /users/:id など）</li>
              <li>ミドルウェアで認証・ログ・CORSなどを共通化できる</li>
              <li>JSONのバインディング・バリデーションが簡単</li>
            </ul>
          </section>

          {/* 2. インストール */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">2</span>
              インストール
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              Go 1.16以上で、モジュール対応プロジェクト内で以下を実行します。
            </p>
            <pre className="overflow-x-auto rounded-xl bg-slate-800 px-4 py-4 text-sm text-slate-100">
              <code>go get -u github.com/gin-gonic/gin</code>
            </pre>
          </section>

          {/* 3. 最初のサーバー */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">3</span>
              最初のサーバー（Hello World）
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">gin.Default()</code>でエンジンを作り、
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">GET</code>ルートを登録して<code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">Run()</code>で起動します。
            </p>
            <pre className="overflow-x-auto rounded-xl bg-slate-800 px-4 py-4 text-sm text-slate-100">
              <code>{`package main

import "github.com/gin-gonic/gin"

func main() {
  r := gin.Default()
  r.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "Hello World"})
  })
  r.Run(":8080")
}`}</code>
            </pre>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">r.Run(":8080")</code>で localhost:8080 でサーバーが立ちます。ブラウザで <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">http://localhost:8080/</code> にアクセスすると JSON が返ります。
            </p>
          </section>

          {/* 4. ルーティング */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">4</span>
              ルーティング
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              GET / POST / PUT / DELETE などメソッドごと、パスごとにハンドラを登録できます。パスに <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">:id</code> のようなパラメータも使えます。
            </p>
            <pre className="overflow-x-auto rounded-xl bg-slate-800 px-4 py-4 text-sm text-slate-100">
              <code>{`r.GET("/users", listUsers)
r.GET("/users/:id", getUser)
r.POST("/users", createUser)
r.PUT("/users/:id", updateUser)
r.DELETE("/users/:id", deleteUser)`}</code>
            </pre>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              パラメータは <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">c.Param("id")</code> で取得できます。ルートをグループ化する場合は <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">r.Group("/api")</code> を使います。
            </p>
          </section>

          {/* 5. ミドルウェア */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">5</span>
              ミドルウェア
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              ミドルウェアは、リクエストがハンドラに届く前（またはレスポンスを返す前）に実行される関数です。ロギング、認証、CORS などに使います。
            </p>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">gin.Default()</code> には Logger と Recovery が最初から付いています。自分で追加する場合は <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">r.Use(middleware)</code> で登録します。
            </p>
            <pre className="overflow-x-auto rounded-xl bg-slate-800 px-4 py-4 text-sm text-slate-100">
              <code>{`r := gin.New()
r.Use(gin.Logger(), gin.Recovery())

// 特定のグループだけにミドルウェアを付ける例
api := r.Group("/api")
api.Use(authMiddleware)
api.GET("/data", getData)`}</code>
            </pre>
          </section>

          {/* 6. リクエスト・レスポンス */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">6</span>
              リクエスト・レスポンス
            </h2>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              リクエストボディを構造体にバインドするには <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">c.ShouldBindJSON(&amp;obj)</code> を使います。レスポンスは <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">c.JSON(statusCode, data)</code> でJSONを返せます。
            </p>
            <pre className="overflow-x-auto rounded-xl bg-slate-800 px-4 py-4 text-sm text-slate-100">
              <code>{`type CreateUserRequest struct {
  Name  string \`json:"name" binding:"required"\`
  Email string \`json:"email" binding:"required,email"\`
}

func createUser(c *gin.Context) {
  var req CreateUserRequest
  if err := c.ShouldBindJSON(&req); err != nil {
    c.JSON(400, gin.H{"error": err.Error()})
    return
  }
  // 作成処理...
  c.JSON(201, gin.H{"id": 1, "name": req.Name})
}`}</code>
            </pre>
          </section>

          {/* 7. 次のステップ */}
          <section className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-8 dark:border-cyan-800 dark:bg-cyan-900/20">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/30 text-cyan-600 dark:text-cyan-400">7</span>
              次のステップ
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              ここまででGinの基本は押さえられました。続けて「Associate」の問題演習で理解を深め、必要に応じて「Professional」「Expert」にも挑戦しましょう。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/learn/gin/associate"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Associate を始める
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/learn/gin"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Gin トップに戻る
              </Link>
            </div>
          </section>
        </article>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
          <Link
            href="/learn/gin"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Gin に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
