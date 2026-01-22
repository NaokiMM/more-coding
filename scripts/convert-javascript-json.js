const fs = require('fs');
const path = require('path');

const javascriptDir = path.join(__dirname, '../s3-assets/javascript');
const files = [
  'variables-scope-functions.json',
  'basic-expression.json',
  'objects-arrays-prototype.json',
  'latest-features.json',
  'async-event-loop.json'
];

// カテゴリ名のマッピング
const categoryMap = {
  'javascript-variables-scope-functions': '①JavaScript - 変数・スコープ・関数',
  'javascript-basic-expression': '①JavaScript - 基礎表現',
  'javascript-objects-arrays-prototype': '①JavaScript - オブジェクト・配列・プロトタイプ',
  'javascript-latest-features': '①JavaScript - 最新機能',
  'javascript-async-event-loop': '①JavaScript - 非同期・イベントループ'
};

function convertAnswerIndexToLetter(index) {
  const letters = ['A', 'B', 'C', 'D'];
  return `正解：${letters[index]}`;
}

function convertQuestion(oldQuestion, categoryName, filename) {
  return {
    id: parseInt(oldQuestion.id.replace('q', ''), 10),
    question: oldQuestion.question,
    correctAnswer: convertAnswerIndexToLetter(oldQuestion.correctAnswer),
    explanation: oldQuestion.explanation,
    choices: oldQuestion.options,
    category: categoryName,
    filename: filename
  };
}

files.forEach(filename => {
  const filePath = path.join(javascriptDir, filename);
  console.log(`Processing ${filename}...`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  
  // categoryNameを取得
  const categoryId = data.categoryId;
  const categoryName = categoryMap[categoryId] || data.categoryName;
  
  // questions配列を変換
  const convertedQuestions = data.questions.map(q => 
    convertQuestion(q, categoryName, filename)
  );
  
  // 新しい形式で保存
  fs.writeFileSync(
    filePath,
    JSON.stringify(convertedQuestions, null, 2),
    'utf8'
  );
  
  console.log(`  Converted ${convertedQuestions.length} questions`);
});

console.log('All files converted successfully!');
