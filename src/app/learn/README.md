# 学習コンテンツ（問題データ）管理

このディレクトリには、各技術カテゴリの学習コンテンツ（問題集）のページが配置されています。
問題データ自体はS3に保存され、CloudFront経由で配信されます。

# S3への問題JSONアップロード形式

問題データをS3にアップロードする際は、以下のJSON形式に従ってください。

## ディレクトリ構造

```
/questions/{technology}/{course}/{filename}.json
```

例: `/questions/nextjs/associate/api-middleware.json`

## JSON型定義

```typescript
interface Question {
  id: string;              // 問題ID
  question: string;        // 問題文
  type: string;            // 問題の種類（選択肢、記述式、など）
  options: string[];       // 選択肢（配列）
  correctAnswer: number;   // 正解の番号（options配列のインデックス）
  explanation: string;     // 解説
}

interface CategoryData {
  categoryId: string;      // カテゴリID
  categoryName: string;    // カテゴリ名
  course: string;          // コース名（例: "associate", "professional"）
  technology: string;      // 技術名（例: "nextjs", "typescript"）
  questions: Question[];   // 問題の配列
  metadata: {
    version: string;       // バージョン
    lastUpdated: string;   // 最終更新日時（ISO形式）
    totalQuestions: number; // 問題総数
  };
}
```

## サンプルJSON

```json
{
  "categoryId": "api-middleware",
  "categoryName": "Next.js - API・ミドルウェア",
  "course": "associate",
  "technology": "nextjs",
  "questions": [
    {
      "id": "q1",
      "question": "Next.jsでAPIルートを作成する際の正しい方法は？",
      "type": "multiple-choice",
      "options": [
        "app/api/route.ts に配置する",
        "pages/api/route.ts に配置する",
        "components/api/route.ts に配置する",
        "public/api/route.ts に配置する"
      ],
      "correctAnswer": 0,
      "explanation": "App Routerを使用する場合、APIルートは app/api/route.ts に配置します。"
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2024-01-01T00:00:00.000Z",
    "totalQuestions": 1
  }
}
```

## データの取得方法

各学習ページ（例: `/learn/nextjs/associate/[categoryId]/study`）では、以下の形式でS3からJSONを取得します：

```typescript
const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
const jsonUrl = `${baseUrl}/questions/{technology}/{course}/${filename}`;
```

ファイル名（`filename`）は、各カテゴリの定義ファイル（例: `src/lib/categories/nextjs/associate-categories.ts`）の`file`プロパティで指定されています。
