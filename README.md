# site domain
https://engineer-skill-boost.com

# github domain
https://github.com/NaokiMM/skillboost

# IT資格アプリ教材（AI入力禁止/AI補助許可）
https://docs.google.com/spreadsheets/d/1M5k-YMU-nnv23_59H_eXhxl989TsWCPErkhwoJ39B1s/edit?gid=1587324847#gid=1587324847

# clone
git clone https://github.com/NaokiMM/skillboost.git

# 環境変数の扱い
設定値（URL など）はコードに直接書かず、環境変数として管理する。
・.env.local：環境ごとの値を定義する場所
・process.env：コードから環境変数を取得するための入口

.env.local の値は Next.js 起動時に読み込まれ、process.env 経由で利用される。
これにより、同じコードをローカル・本番で使い回せる。

# Secretsファイルリスト
※チーム内メンバーより提供必要有り。
・.env.local

# 主なコーディング手法
以下手法を主に採用する。
・Top-Down Readability（トップダウン設計）
・Main-first
・Entry-first

理由
・ファイルを開いた時点で「何をするコードか」を即座に把握できる
・実装詳細や補助処理を後回しにでき、読み進めやすい
・後から読み返す際や他者が参加した際の理解コストを下げられる

## GitHub へのコミット・プッシュルール
・ 1 push = 1 機能追加 を原則とする  
・ 変更するファイル数は問わない  
・ 各 push は「何をしたのか」を第三者に説明できる、理解しやすい単位にまとめる
