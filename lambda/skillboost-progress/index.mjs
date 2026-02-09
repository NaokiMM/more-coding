import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {

  try {
    const TableName = process.env.PROGRESS_TABLE;

    // HTTP API v2
    const method = event?.requestContext?.http?.method;
    const path = event?.requestContext?.http?.path;

    // Cognito JWT Authorizer (HTTP API) の claims
    const claims = event?.requestContext?.authorizer?.jwt?.claims;
    const userId = claims?.sub;

    if (!userId) {
      return { statusCode: 401, body: JSON.stringify({ message: "Unauthorized" }) };
    }
    if (!TableName) {
      return { statusCode: 500, body: JSON.stringify({ message: "PROGRESS_TABLE is not set" }) };
    }

    // =========================
    // GET /progress/items
    // =========================
    if (method === "GET" && path?.endsWith("/progress/items")) {
      const setId = event?.queryStringParameters?.setId;

      if (!setId) {
        return { statusCode: 400, body: JSON.stringify({ message: "Required: setId" }) };
      }

      // problemId が `set#${setId}#...` で始まる想定
      const prefix = `set#${setId}#`;

      const res = await ddb.send(
        new QueryCommand({
          TableName,
          KeyConditionExpression: "userId = :u AND begins_with(problemId, :p)",
          ExpressionAttributeValues: {
            ":u": userId,
            ":p": prefix,
          },
        })
      );

      return { statusCode: 200, body: JSON.stringify({ ok: true, items: res.Items ?? [] }) };
    }

    // =========================
    // POST /progress/answer
    // =========================
    if (method === "POST" && path?.endsWith("/progress/answer")) {
      const body = event?.body ? JSON.parse(event.body) : {};
      const { setId, problemId, isCorrect } = body;

      if (!setId || !problemId || typeof isCorrect !== "boolean") {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Required: setId, problemId, isCorrect(boolean)" }),
        };
      }

      const now = new Date().toISOString();

      const res = await ddb.send(
        new UpdateCommand({
          TableName,
          Key: { userId, problemId },
          UpdateExpression:
            "SET setId = :setId, lastAnsweredAt = :now, #st = :st " +
            "ADD attempts :one, correctCount :c, incorrectCount :ic",
          ExpressionAttributeNames: { "#st": "status" },
          ExpressionAttributeValues: {
            ":setId": setId,
            ":now": now,
            ":st": isCorrect ? "correct" : "incorrect",
            ":one": 1,
            ":c": isCorrect ? 1 : 0,
            ":ic": isCorrect ? 0 : 1,
          },
          ReturnValues: "ALL_NEW",
        })
      );

      return { statusCode: 200, body: JSON.stringify({ ok: true, item: res.Attributes }) };
    }

    // =========================
    // other routes
    // =========================
    return { statusCode: 404, body: JSON.stringify({ message: "Not Found" }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal error" }) };
  }
};
