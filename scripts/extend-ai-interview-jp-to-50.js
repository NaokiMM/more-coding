#!/usr/bin/env node
/**
 * s3-assets/ai-interview の jp ディレクトリ内の各JSONファイルを50問に拡張する
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..', 's3-assets', 'ai-interview');
const TARGET_COUNT = 50;

const LEVELS = ['associate', 'professional', 'expert'];

function extendTo50(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let items;
  try {
    items = JSON.parse(content);
  } catch (e) {
    console.error('Parse error:', filePath, e.message);
    return;
  }

  if (!Array.isArray(items) || items.length === 0) {
    console.error('Invalid or empty:', filePath);
    return;
  }

  if (items.length > TARGET_COUNT) {
    const result = items.slice(0, TARGET_COUNT).map((q, i) => ({ ...q, id: i + 1 }));
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2) + '\n', 'utf8');
    console.log(filePath.replace(BASE_DIR + path.sep, ''), '->', result.length, '問（トリム）');
    return;
  }

  const originalCount = items.length;
  while (items.length < TARGET_COUNT) {
    const source = items[(items.length - originalCount) % originalCount];
    items.push({
      id: items.length + 1,
      question: source.question,
      correctAnswer: source.correctAnswer,
      explanation: source.explanation,
      choices: [...source.choices],
      category: source.category,
      filename: source.filename,
    });
  }

  const result = items.slice(0, TARGET_COUNT).map((q, i) => ({ ...q, id: i + 1 }));
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  console.log(filePath.replace(BASE_DIR + path.sep, ''), '->', result.length, '問');
}

function main() {
  for (const level of LEVELS) {
    const jpDir = path.join(BASE_DIR, level, 'jp');
    if (!fs.existsSync(jpDir)) continue;
    const files = fs.readdirSync(jpDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      extendTo50(path.join(jpDir, file));
    }
  }
}

main();
