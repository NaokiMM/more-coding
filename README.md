アプリ側
NextJs・tsでアプリを作成
SSRはほとんどないと思う

クラウド側（既に用意した。）
1. DB: 諸々考慮してDynamoDBを使用することとする
2. 認証: ログイン機能は必要なのでcognitoは使用する
3. サーバー: lambdaでいいと思う
4. API: API Gateway
5. ストレージ: S3
6. CDN: CloudFront

これで一旦最小構成で完成。

# AWS > ブラウザ画面
https://d1z9w64vvsvlia.cloudfront.net/index.html
https://d1z9w64vvsvlia.cloudfront.net/