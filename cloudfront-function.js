// CloudFront Function: Viewer Request
// 拡張子なしのパスに /index.html を付与する

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


