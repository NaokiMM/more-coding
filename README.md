# 環境変数の扱い
設定値（URL など）はコードに直接書かず、環境変数として管理する。
・.env.local：環境ごとの値を定義する場所
・process.env：コードから環境変数を取得するための入口

.env.local の値は Next.js 起動時に読み込まれ、process.env 経由で利用される。
これにより、同じコードをローカル・本番で使い回せる。

# clone
git clone https://github.com/NaokiMM/skillboost.git