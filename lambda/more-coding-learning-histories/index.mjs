/*
  Progress History Lambda（履歴のみ）

  DynamoDB:
  - PK: userId
  - SK: progressId = "progress#history#<ISO8601>"

  APIs:
  - POST /me/learning-histories
      body: { material, level, content, studiedAt? }
  - GET  /me/learning-histories?limit=30
*/
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const json = (statusCode, obj) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "access-control-allow-origin": "http://localhost:3000",
    "access-control-allow-headers": "authorization,content-type",
    "access-control-allow-methods": "GET,POST,OPTIONS",
  },
  body: JSON.stringify(obj),
});

export const handler = async (event) => {
  try {
    const TableName = process.env.PROGRESS_TABLE;

    const method = event?.requestContext?.http?.method;
    const path = event?.requestContext?.http?.path;

    if (method === "OPTIONS") return json(204, {});
    if (!TableName) return json(500, { message: "PROGRESS_TABLE is not set" });

    const claims = event?.requestContext?.authorizer?.jwt?.claims;
    const userId = claims?.sub;
    if (!userId) return json(401, { message: "Unauthorized" });

  /*
   GET /me/learning-histories (最新1件)
   --------------------
   ユーザーの最新の学習履歴を取得する。

  【役割】
  - ユーザーの最新の学習履歴を取得する
  - 取得結果（item）を提供する

  【実行条件】
  */
    // GET /me/learning-histories (最新1件)
    if (method === "GET" && path?.endsWith("/me/learning-histories")) {
      const userPk = `USER#${userId}`; // sub → USER#sub
    
      const res = await ddb.send(
        new QueryCommand({
          TableName,
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": userPk,
          },
          Limit: 30,               // 必要なら 1 にしてもOK
          ScanIndexForward: false, // timestamp降順（新しい順）
        })
      );
    
      return json(200, { ok: true, items: res.Items ?? [] });
    }

  /*
   GET /me/learning-histories (最新1件)
   --------------------
   ユーザーの最新の学習履歴を取得する。

  【役割】
  - ユーザーの最新の学習履歴を取得する
  - 取得結果（item）を提供する

  【実行条件】
  */
    // POST /me/learning-histories (履歴追加)
    if (method === "POST" && path?.endsWith("/me/learning-histories")) {
      const body = event?.body ? JSON.parse(event.body) : {};
      const { material, level, content, studiedAt } = body;
    
      if (!material || !level || !content) {
        return json(400, { message: "Required: material, level, content" });
      }
    
      const nowIso =
        typeof studiedAt === "string" && studiedAt.length > 0
          ? studiedAt
          : new Date().toISOString();
    
      const ts = Date.parse(nowIso);
      if (Number.isNaN(ts)) {
        return json(400, { message: "studiedAt must be ISO8601 string" });
      }
    
      const item = {
        userId: `USER#${userId}`, // ← Dynamoに合わせる
        timestamp: ts,            // ← SK 必須
        material,
        level,
        content,
        studiedAt: nowIso,
      };
    
      await ddb.send(
        new PutCommand({
          TableName,
          Item: item,
        })
      );
    
      return json(200, { ok: true, item });
    }

    /*
     Not Found
     --------------------
     リクエストされたパスが見つからない場合の処理。

    【役割】
     - リクエストされたパスが見つからない場合の処理。
     - 404 ステータスコードを返す。
    */
    return json(404, { message: "Not Found" });
  } catch (e) {
    console.error(e);
    return json(500, { message: "Internal error" });
  }
};
