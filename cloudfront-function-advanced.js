// CloudFront Function: Viewer Request (高度版)
// 拡張子なしのパスに /index.html を付与する
// より詳細な処理を含む

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // 1. 既に拡張子がある場合はそのまま（.html, .js, .css, .png など）
  if (uri.match(/\.[a-zA-Z0-9]+$/)) {
    return request;
  }

  // 2. 末尾が / の場合は index.html を追加
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } 
  // 3. 末尾が / でない場合は /index.html を追加
  else {
    request.uri = uri + '/index.html';
  }

  return request;
}

