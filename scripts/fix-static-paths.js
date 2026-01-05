const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "../out");

// 修正が必要なページのリスト
const pagesToFix = ["signup", "login", "mypage", "verify-email"];

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

console.log("Static paths fixed successfully!");

