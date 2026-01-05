const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "../out");

// 修正が必要なページのリスト（フラットなパス）
const pagesToFix = ["signup", "login", "mypage", "verify-email"];

// ネストされたパスのリスト（親ディレクトリ/子ディレクトリ）
const nestedPagesToFix = [
  { parent: "mypage", child: "settings" },
];

// フラットなパスの修正
pagesToFix.forEach((page) => {
  const htmlFile = path.join(outDir, `${page}.html`);
  const pageDir = path.join(outDir, page);
  const indexFile = path.join(pageDir, "index.html");

  // HTMLファイルが存在する場合
  if (fs.existsSync(htmlFile)) {
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // HTMLファイルをindex.htmlとしてコピー
    fs.copyFileSync(htmlFile, indexFile);
    console.log(`✓ Fixed: ${page}.html -> ${page}/index.html`);
  }
});

// ネストされたパスの修正
nestedPagesToFix.forEach(({ parent, child }) => {
  // パターン1: mypage-settings.html が存在する場合
  const flatHtmlFile = path.join(outDir, `${parent}-${child}.html`);
  // パターン2: mypage/settings.html が存在する場合
  const nestedHtmlFile = path.join(outDir, parent, `${child}.html`);
  
  const targetDir = path.join(outDir, parent, child);
  const targetIndexFile = path.join(targetDir, "index.html");

  let sourceFile = null;

  if (fs.existsSync(flatHtmlFile)) {
    sourceFile = flatHtmlFile;
  } else if (fs.existsSync(nestedHtmlFile)) {
    sourceFile = nestedHtmlFile;
  }

  if (sourceFile) {
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // HTMLファイルをindex.htmlとしてコピー
    fs.copyFileSync(sourceFile, targetIndexFile);
    console.log(`✓ Fixed: ${path.basename(sourceFile)} -> ${parent}/${child}/index.html`);
  } else {
    console.log(`⚠ Warning: ${parent}/${child} page not found (checked ${parent}-${child}.html and ${parent}/${child}.html)`);
  }
});

console.log("Static paths fixed successfully!");

