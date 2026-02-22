// unsubscribe lambda (Node.js 18+)
// npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ENV_NAME = "stg";
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

function getMethodPath(event) {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const path = event.requestContext?.http?.path || event.path;
  return { method, path };
}

function getUserSub(event) {
  return (
    event.requestContext?.authorizer?.jwt?.claims?.sub ||
    event.requestContext?.authorizer?.claims?.sub ||
    null
  );
}

export const handler = async (event) => {
  const { method, path } = getMethodPath(event);

  // ✅ 解約
  if (!(method === "DELETE" && path === "/me/subscription")) {
    return { statusCode: 404, body: JSON.stringify({ message: "Not Found" }) };
  }

  const sub = getUserSub(event);
  if (!sub) {
    return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
  }

  const pkUserId = `USER#${sub}`;
  const skTimestamp = 0; // あなたの設計に合わせる（画像は0）

  const now = new Date().toISOString();

  try {
    await ddb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userId: pkUserId, timestamp: skTimestamp },

        // paidAt は「Nullにする」より「削除」が定番
        UpdateExpression:
          "SET isPaid = :f, membershipTier = :free, updatedAt = :now REMOVE paidAt",

        // すでに無料なら二重実行でもOK扱いにしたい場合はここを外す or 調整
        ConditionExpression: "attribute_not_exists(isPaid) OR isPaid = :t",
        ExpressionAttributeValues: {
          ":f": false,
          ":t": true,
          ":free": "free",
          ":now": now,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    if (e?.name === "ConditionalCheckFailedException") {
      // 既に無料（または isPaid が true じゃない）でもOK扱いにする
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, alreadyFree: true }),
      };
    }
    console.error("Unsubscribe update failed:", e);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
};
