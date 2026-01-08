# AWS > ブラウザ画面
https://d1z9w64vvsvlia.cloudfront.net/index.html
https://d1z9w64vvsvlia.cloudfront.net/

# aws confirtm
aws configure list-profiles

# s3にアプリをupload
npm run build
node scripts/fix-static-paths.js
aws s3 sync out/ s3://skillboost-bucket/ --delete --profile AdministratorAccess-077793792738

# aws login
aws sso login --profile AdministratorAccess-077793792738

# cloudfrontのキャッシュを更新
CloudFront > Distributions > ID > Invalidations > Create invalidations > 「/*」 > Save

# S3（skillboost-learning-content）の運用方式（簡潔）
・用途
　・学習問題・教材のJSON置き場（読む専用）
・構成
　・manifest/index.json：画面・科目ごとの一覧
　・questions/<subject>/<level>/<nnn>.json：問題本体
・命名ルール
　・問題番号は3桁固定（001 002）
　・画面からファイル名を直指定しない
・画面側の流れ
　・index.json → 問題JSONを順に取得して表示
・運用
　・追加：JSON追加＋index更新
　・修正：同じパスで上書き（Versioningで履歴保持）

# S3から取得するロジック
① ユーザー操作
/learn/typescript/beginner/basic-types/study

② Next.js が URL から値を渡す
params.categoryId === "basic-types"
※ ここまで S3は一切関係ない

③ アプリが「取りに行くURL」を組み立てる
/questions/typescript/${categoryId}.json
↓
/questions/typescript/basic-types.json
これは 文字列結合してるだけ。

※注意事項
Amazon S3 >  Buckets >  skillboost-learning-content > questions > 言語名 > カテゴリ名.json
にしてカテゴリ名は重複させてはいけない。一旦。同ファイルには100問以上の問題が入っていることがあるが
一旦s3の内容を画面表示させることが優先。

④ ブラウザで fetch が実行される
fetch("/questions/typescript/basic-types.json")
rewrites があれば
→ CloudFront に転送される
直URLなら
→ そのまま CloudFront に行く

⑤ CloudFront → S3
CloudFront:
  「/questions/typescript/basic-types.json くれ」

S3:
  「はい、このJSONです」
※ S3は
categoryId を知らない
アプリの構造も知らない
URL一致したファイルを返すだけ

⑥ アプリが JSON を受け取る
{
  "categoryId": "basic-types",
  "questions": [ ... ]
}

⑦ アプリ側で使う
questions[0].question → 問題文
questions[0].options → 選択肢
問題数 → questions.length

# 試験監視
Microsoft intune

# stripe APIテストの実行方法
1. テストモードに切り替え
Stripeダッシュボード右上の テストモード を ON にする。

2. 環境変数を設定
.env などに テスト用の秘密鍵を設定する（Git管理しない）。
STRIPE_SECRET_KEY=sk_test_xxx

3. API疎通確認（curl）
curl https://api.stripe.com/v1/balance \
  -u "$STRIPE_SECRET_KEY:"

JSONが返ればAPI接続成功。

4. 決済APIの簡易テスト（任意）
curl https://api.stripe.com/v1/payment_intents \
  -u "$STRIPE_SECRET_KEY:" \
  -d amount=100 \
  -d currency=jpy \
  -d "payment_method_types[]=card"

5. ダッシュボード確認
テストモードの イベント に
payment_intent.created が表示されていればOK。