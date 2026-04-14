## 📝 GAS × clasp × TypeScript セットアップ手順

### 概要
ローカルで Google Apps Script（GAS） を開発するために、clasp と TypeScript を使った環境を構築する手順をまとめる。

---

## 1. プロジェクト作成

```bash
npm init -y
```

## 2. 必要パッケージのインストール
```bash
npm install -D @google/clasp typescript @types/google-apps-script
```

## 3. Googleにログイン
```bash
npx clasp login
```
ブラウザが開くので、Googleアカウントで認証する。

## 4. GASプロジェクト作成
```bash
npx clasp create
```
これで以下が生成される：

 - .clasp.json
 - appsscript.json

 ## 5. TypeScript設定
 ```bash
 npx tsc --init
 ```
 必要に応じて tsconfig.json を調整する。

 ## 6. コードを書く
 例：src/index.ts
```ts
 function hello() {
  Logger.log("Hello GAS");
}
```

## 7. ビルド
```bash
npx tsc
```

TypeScript → JavaScript に変換する。

## 8. GASへ反映
```bash
npx clasp push
```
ローカルのコードをGASにアップロードする。

## 9. Gitで管理
```bash
git add .
git commit -m "initial setup"
git push
```

---

## 🔹 bun / bunx の使い方

bun / bunx はよく見られるが、役割は以下のとおり。

- bun  
  → パッケージのインストール（npm install の代わり）

- bunx  
  → コマンドの実行（npx の代わり）