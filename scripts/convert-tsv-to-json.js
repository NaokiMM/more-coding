const fs = require('fs');
const path = require('path');

function parseTSVLine(line) {
  const parts = line.split('\t');
  if (parts.length < 10) return null;
  
  const no = parts[0].trim();
  const category = parts[2].trim();
  const functionName = parts[3].trim();
  const question = parts[4].trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n');
  const option1 = parts[5].trim();
  const option2 = parts[6].trim();
  const option3 = parts[7].trim();
  const option4 = parts[8].trim();
  const correctAnswer = parts[9].trim();
  const explanation = parts[10] ? parts[10].trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n') : '';
  
  // 正解のインデックスを計算
  let correctIndex = 0;
  if (correctAnswer.includes('正解：')) {
    const match = correctAnswer.match(/正解：([A-D])/);
    if (match) {
      correctIndex = match[1].charCodeAt(0) - 'A'.charCodeAt(0);
    }
  } else if (correctAnswer.includes('選択肢')) {
    const match = correctAnswer.match(/選択肢(\d+)/);
    if (match) {
      correctIndex = parseInt(match[1]) - 1;
    }
  } else if (['A', 'B', 'C', 'D'].includes(correctAnswer)) {
    correctIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
  }
  
  return {
    no,
    category,
    functionName,
    question,
    options: [option1, option2, option3, option4],
    correctIndex,
    explanation
  };
}

function convertTSVToJSON(inputFile, outputFile, technology, categoryId, categoryName) {
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n');
  
  const questions = [];
  let currentQuestion = null;
  let buffer = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // 行が数字で始まる場合、新しい問題の開始
    if (/^\d+\t/.test(line)) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = parseTSVLine(line);
      buffer = '';
    } else if (currentQuestion) {
      // 複数行にまたがる問題文や解説を結合
      buffer += line + '\n';
    }
  }
  
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  // 重複を除去（カテゴリ+機能+問題文で判定）
  const uniqueQuestions = [];
  const seen = new Set();
  
  for (const q of questions) {
    const key = `${q.category}-${q.functionName}-${q.question.substring(0, 50)}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueQuestions.push(q);
    }
  }
  
  const result = {
    categoryId,
    categoryName,
    course: "associate",
    technology,
    questions: uniqueQuestions.map((q, index) => ({
      id: `q${index + 1}`,
      question: q.question,
      type: "multiple-choice",
      options: q.options,
      correctAnswer: q.correctIndex,
      explanation: q.explanation,
      difficulty: "easy",
      tags: [q.category, q.functionName],
      function: q.functionName
    })),
    metadata: {
      version: "1.0.0",
      lastUpdated: "2024-01-15",
      totalQuestions: uniqueQuestions.length
    }
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Converted ${uniqueQuestions.length} questions from ${inputFile} to ${outputFile}`);
}

// ファイル変換
const dataDir = path.join(__dirname, '../data/learning-content');

// vue_1.json
convertTSVToJSON(
  path.join(dataDir, 'vue_1.json'),
  path.join(dataDir, 'vue_1.json'),
  'vue',
  'vue-basics',
  'Vue基礎 - Vue基礎・テンプレート・ディレクティブ・リアクティビティ'
);

// react_1.json
convertTSVToJSON(
  path.join(dataDir, 'react_1.json'),
  path.join(dataDir, 'react_1.json'),
  'react',
  'react-basics',
  'React基礎 - React基礎・JSX・コンポーネント・Props・State'
);

// nuxtjs_1.json
convertTSVToJSON(
  path.join(dataDir, 'nuxtjs_1.json'),
  path.join(dataDir, 'nuxtjs_1.json'),
  'nuxtjs',
  'nuxtjs-basics',
  'Nuxt.js基礎 - 基礎・ルーティング・コンポーネント・データ取得'
);

console.log('All conversions completed!');

