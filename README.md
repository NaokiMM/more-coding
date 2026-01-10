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