# terraformの手順書
## Terraform運用フロー

1. `.tf` を修正する（feature ブランチで作業）
2. `terraform plan` を実行する
   - この変更で AWS に何が起きるか確認する
3. PR を作成する
   - 変更内容と plan 結果を共有する
4. レビューする
   - コードと plan の差分が意図どおりか確認する
5. PR を `main` にマージする
   - `main` が正しい状態になる
6. `main` に対して `terraform apply` を実行する
   - `main` の内容を AWS に反映する

## Gitルール
### terraform関連でgitにアップロードするものとそうでないもの。

- `.tf` 系のファイル → Git にコミットする（OK）
- `tfstate` → Git にコミットしない（絶対 NG。バックエンド側で管理）
- `.terraform.lock.hcl` → 基本はコミットする（**tfstate とは扱いが逆**なので混同しない）

## terraform操作の事前準備
作業ディレクトリへ移動する。

```bash
cd terraform/envs/prd
```

### `terraform init` の切り分け（必要なときだけ）
`init` が期待どおり動かないときの例。

- `rm -rf .terraform` … ローカルのプロバイダ展開などをやり直す
- `rm -f .terraform.lock.hcl` … **通常は行わない**。プロバイダ解決の不整合を疑うときの最終手段（チームで lock を共有している場合は特に慎重に）

### 初回セットアップ、または上記のあと
terraform init

## terraform定常操作
### terraformファイル（.tf）を自動でキレイに整形するコマンド
terraform fmt

### state や保存した plan を人が読みやすい形で表示する
`terraform show` … 現在の state を表示  
`terraform show tfplan` … `terraform plan -out=tfplan` で保存した plan を表示

### HTTP API（API Gateway v2）の Routes 一覧を JSON で取得
`prd` の API は HTTP API（v2）想定。Integrations や Authorizers は `get-integrations` / `get-authorizers` など別サブコマンド。

```bash
aws apigatewayv2 get-routes \
  --api-id '<AWS コンソールの API ID>' \
  --region ap-northeast-1 \
  --profile AdministratorAccess-077793792738 \
  --output json > routes.json
```

### tfの文法や参照ミス の確認
terraform validate

## plan操作
### 差分確認だけしたいとき
terraform plan

### plan結果を保存したいとき
terraform plan -out=tfplan

### 保存したplanをそのまま適用したいとき
terraform apply tfplan

## apply準備
### 削除防止を追加（該当 `resource` ブロック内）
```hcl
lifecycle {
  prevent_destroy = true
}
```

## apply実行
### コードが表す望ましい状態を AWS に反映する（問題なければ実行）
terraform apply

## terraform import手法
全体方針（共通パターン）

- AWS からリソース一覧を取得する
- 各リソースの詳細を JSON に保存する
- JSON を見ながら Terraform に落とす
- 必要なら `import` で state に取り込む
