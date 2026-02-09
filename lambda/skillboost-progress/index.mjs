/*
  Progress History Lambda（履歴のみ）

  DynamoDB:
  - PK: userId
  - SK: progressId = "progress#history#<ISO8601>"

  APIs:
  - POST /history
      body: { material, level, content, studiedAt? }
  - GET  /history?limit=30
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

    // GET /history (最新1件)
    if (method === "GET" && path?.endsWith("/history")) {
      const res = await ddb.send(
        new QueryCommand({
          TableName,
          KeyConditionExpression: "userId = :u AND begins_with(problemId, :p)",
          ExpressionAttributeValues: {
            ":u": userId,
            ":p": "history#",
          },
          Limit: 1,
          ScanIndexForward: false,
        })
      );

      return json(200, { ok: true, items: res.Items ?? [] });
    }

    // POST /history (履歴追加)
    if (method === "POST" && path?.endsWith("/history")) {
      const body = event?.body ? JSON.parse(event.body) : {};
      const { material, level, content, studiedAt } = body;

      if (!material || !level || !content) {
        return json(400, { message: "Required: material, level, content" });
      }

      const now =
        typeof studiedAt === "string" && studiedAt.length > 0
          ? studiedAt
          : new Date().toISOString();

      const item = {
        userId,
        problemId: `history#${now}`,
        material,
        level,
        content,
        studiedAt: now,
      };

      await ddb.send(
        new PutCommand({
          TableName,
          Item: item,
        })
      );

      return json(200, { ok: true, item });
    }

    return json(404, { message: "Not Found" });
  } catch (e) {
    console.error(e);
    return json(500, { message: "Internal error" });
  }
};
