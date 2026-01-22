// CloudFront Function: Viewer Request (高度版)
// 拡張子なしのパスに /index.html を付与する
function handler(event) {
  var req = event.request;
  var uri = req.uri;

  // APIは触らない（必要なら増やす）
  if (uri.startsWith('/api')) return req;

  // 拡張子ありは触らない
  if (uri.match(/\.[a-zA-Z0-9]+$/)) return req;

  // /xxx/ → /xxx/index.html（内部リライト）
  if (uri.endsWith('/')) {
    req.uri = uri + 'index.html';
    return req;
  }

  // /xxx → /xxx/（301）
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: uri + '/' }
    }
  };
}
