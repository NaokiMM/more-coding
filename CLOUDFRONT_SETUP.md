# CloudFront Function セットアップガイド

## 問題
Next.jsの静的エクスポートをS3 + CloudFrontでホスティングする際、`/login`や`/mypage/settings`などのパスに直接アクセスすると「AccessDenied」エラーが発生する。

## 原因
- S3は`/login/index.html`としてファイルが存在する
- しかし`/login`にアクセスすると、S3は`/login`というオブジェクトを探す
- 存在しないため「AccessDenied」エラーが返される

## 解決方法: CloudFront Function

### 1. CloudFront Functionの作成

1. **AWSコンソールでCloudFront Functionを作成**
   - CloudFrontコンソール → Functions → Create function
   - Function name: `rewrite-uri-to-index`
   - Runtime: CloudFront Functions
   - Function code: `cloudfront-function.js`の内容をコピー

2. **Functionコード（最小構成）**
```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 既に拡張子がある場合はそのまま
  if (uri.includes('.')) {
    return request;
  }

  // 末尾が / の場合は index.html を追加
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else {
    // 末尾が / でない場合は /index.html を追加
    request.uri = uri + '/index.html';
  }

  return request;
}
```

### 2. CloudFront Distributionの設定

1. **Distributionを選択**
   - CloudFrontコンソール → Distributions → 対象のDistribution

2. **Behaviorsタブを開く**
   - デフォルトのBehavior（または対象のBehavior）を選択 → Edit

3. **Function associationsを設定**
   - Viewer Request: `rewrite-uri-to-index`を選択
   - Event type: Viewer Request

4. **Save changes**

### 3. デプロイ

- FunctionをPublish
- Distributionの変更をDeploy（数分かかります）

## 注意点

### ✅ 推奨事項

1. **Functionは軽量**
   - CloudFront Functionsは軽量で高速（1ms以下）
   - Lambda@Edgeより安価

2. **キャッシュの考慮**
   - 同じパス（例: `/login`）は同じ`/login/index.html`に解決される
   - キャッシュが効く

3. **テスト**
   - `/login` → `/login/index.html`に解決されることを確認
   - `/mypage/settings` → `/mypage/settings/index.html`に解決されることを確認

### ⚠️ 注意点

1. **拡張子の判定**
   - `.html`, `.js`, `.css`, `.png`など、既に拡張子があるファイルはそのまま
   - 誤って`/login.html`を`/login.html/index.html`に変換しないように注意

2. **ルートパス（/）**
   - `/`は`/index.html`に解決される（S3のデフォルト動作と一致）

3. **クエリパラメータ**
   - `?param=value`は保持される
   - Functionは`uri`のみを変更し、`querystring`は保持

4. **デプロイ時間**
   - Distributionの変更は5-15分かかる
   - 本番環境ではメンテナンス時間を考慮

## 代替案: CloudFrontのカスタムエラーレスポンス

Functionを使わない場合の代替案：

1. **Error Pagesタブを開く**
2. **Create Custom Error Response**
   - HTTP Error Code: 403 (Forbidden)
   - Response Page Path: `/index.html`
   - HTTP Response Code: 200 (OK)
   - Error Caching Minimum TTL: 0

**注意**: この方法は403エラーを200に変換するため、実際の403エラーも200として返される可能性がある。

## 推奨: CloudFront Function

CloudFront Functionの方が推奨される理由：
- より正確な処理（拡張子の判定）
- パフォーマンスが良い
- コストが安い
- エラーレスポンスを誤って変換しない

## テスト方法

1. **FunctionをPublish後、数分待つ**
2. **ブラウザで直接アクセス**
   - `https://your-cloudfront-domain.net/login`
   - `https://your-cloudfront-domain.net/mypage/settings`
3. **正常に表示されることを確認**

## トラブルシューティング

### まだ「AccessDenied」が表示される場合

1. **Functionが正しくアタッチされているか確認**
   - Behaviors → Viewer RequestにFunctionが設定されているか

2. **Distributionのデプロイが完了しているか確認**
   - Statusが「Deployed」になっているか

3. **キャッシュをクリア**
   - CloudFrontのInvalidationを実行
   - またはブラウザのキャッシュをクリア

4. **Functionコードを確認**
   - 構文エラーがないか
   - ロジックが正しいか


