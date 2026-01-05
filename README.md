# AWS > ブラウザ画面
https://d1z9w64vvsvlia.cloudfront.net/index.html
https://d1z9w64vvsvlia.cloudfront.net/

# aws confirtm
aws configure list-profiles

# s3にアプリをuploadする前の準備
npm run build
node scripts/fix-static-paths.js

# aws cli login & upload
aws s3 sync out/ s3://skillboost-bucket/ --delete --profile AdministratorAccess-077793792738

# cloudfrontのキャッシュを更新
CloudFront > Distributions > Invalidations > Create invalidations > 「/*」 > Save