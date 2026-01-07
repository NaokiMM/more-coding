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