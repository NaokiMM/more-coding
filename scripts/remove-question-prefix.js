const fs = require('fs');
const path = require('path');

const files = [
  '../s3-assets/vue/reactive-state-composition-api.json',
  '../s3-assets/vue/template-rendering-ui-structure.json',
  '../s3-assets/react/components-jsx-rendering.json',
  '../s3-assets/react/event-form-optimization-tools.json',
  '../s3-assets/react/overview-thinking-overall.json',
  '../s3-assets/react/props-data-flow.json',
  '../s3-assets/react/state-hooks-side-effects.json'
];

files.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);
  
  // JSONファイルを読み込む
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 各エントリのquestionフィールドから「問題（...）\n\n」を削除
  data.forEach(item => {
    if (item.question) {
      // 「問題（...）\n\n」のパターンを削除
      // JSON.parse() で読み込むと、\n は実際の改行文字になる
      // 括弧がネストしている可能性があるため、非貪欲マッチを使用
      item.question = item.question.replace(/^問題（.*?）\n\n/, '');
      // 念のため、エスケープされた改行パターンも削除
      item.question = item.question.replace(/^問題（.*?）\\n\\n/, '');
      // さらに、単一の改行やスペースのバリエーションにも対応
      item.question = item.question.replace(/^問題（.*?）\s*\n\s*\n/, '');
    }
  });

  // ファイルに書き戻す
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`${relativePath} の処理が完了しました。`);
});

console.log('すべてのファイルの処理が完了しました。questionフィールドから「問題（...）\n\n」を削除しました。');
