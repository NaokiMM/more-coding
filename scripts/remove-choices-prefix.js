const fs = require('fs');
const path = require('path');

const ASSOCIATE_DIR = path.join(__dirname, '../s3-assets/nuxtjs/associate');

function removeChoicePrefix(str) {
  const trimmed = str.trimStart();
  if (/^[A-D]\.\s/.test(trimmed)) {
    return trimmed.replace(/^[A-D]\.\s/, '').trimStart();
  }
  return str;
}

const files = fs.readdirSync(ASSOCIATE_DIR).filter((f) => f.endsWith('.json'));

files.forEach((filename) => {
  const filePath = path.join(ASSOCIATE_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let changeCount = 0;
  data.forEach((item) => {
    if (item.choices && Array.isArray(item.choices)) {
      item.choices = item.choices.map((choice) => {
        const before = choice;
        const after = removeChoicePrefix(choice);
        if (before !== after) changeCount++;
        return after;
      });
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`${filename}: ${changeCount} 件の choice から A./B./C./D. プレフィックスを削除しました。`);
});

console.log('すべてのファイルの処理が完了しました。');
