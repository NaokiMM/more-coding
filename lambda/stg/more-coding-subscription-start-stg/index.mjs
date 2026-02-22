// lambda.js (Node.js 18+)
// npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ENV_NAME = "stg";
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE_NAME = process.env.TABLE_NAME;

// API Gateway(HTTP API)とREST APIの両対応で method/path を取る
function getMethodPath(event) {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path;
  return { method, path };
}

// 例：Cognito/JWT の sub を userId に使う想定（あなたの認証に合わせて調整）
function getUserSub(event) {
  return (
    event.requestContext?.authorizer?.jwt?.claims?.sub ||
    event.requestContext?.authorizer?.claims?.sub ||
    null
  );
}

export const handler = async (event) => {
  const { method, path } = getMethodPath(event);

  // ここがあなたの想定パス
  if (!(method === "POST" && path === "/me/subscription")) {
    return { statusCode: 404, body: JSON.stringify({ message: "Not Found" }) };
  }

  const sub = getUserSub(event);
  if (!sub) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  // DynamoDB のPK形式が USER#... なら合わせる（画像が USER#... っぽい）
  const pkUserId = `USER#${sub}`;
  const skTimestamp = 0; // 画像が 0 なので固定（設計が違うならここを変更）

  const now = new Date().toISOString();

  try {
    await ddb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userId: pkUserId, timestamp: skTimestamp },
        UpdateExpression:
          "SET isPaid = :t, membershipTier = :tier, paidAt = :now, updatedAt = :now",
        // すでに有料なら二重課金を防ぐ（不要なら削除OK）
        ConditionExpression: "attribute_not_exists(isPaid) OR isPaid = :f",
        ExpressionAttributeValues: {
          ":t": true,
          ":f": false,
          ":tier": "paid",
          ":now": now,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    if (e?.name === "ConditionalCheckFailedException") {
      // 既に有料だった（状態はOK扱いにする）
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, alreadyPaid: true }),
      };
    }

    console.error("Update failed:", e);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
};
