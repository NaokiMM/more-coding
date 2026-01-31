import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// 直書き禁止（いったん現状踏襲）
const ORIGIN = "https://d1z9w64vvsvlia.cloudfront.net";

const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
};

const json = (statusCode, bodyObj) => ({
  statusCode,
  headers: { "content-type": "application/json", ...corsHeaders },
  body: JSON.stringify(bodyObj),
});

export const handler = async (event) => {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;
  const email = claims?.email ?? null;
  const name = claims?.name ?? null;

  if (!sub) return json(401, { ok: false, message: "Unauthorized" });

  const membersTable = process.env.MEMBERS_TABLE;
  if (!membersTable) return json(500, { ok: false, message: "MEMBERS_TABLE is missing" });

  if (method === "GET" && path === "/me") {
    const key = { pk: `USER#${sub}`, sk: "PROFILE" };

    const got = await ddb.send(
      new GetCommand({
        TableName: membersTable,
        Key: key,
      })
    );

    if (!got.Item) {
      const item = { ...key, createdAt: new Date().toISOString() };
      await ddb.send(
        new PutCommand({
          TableName: membersTable,
          Item: item,
        })
      );

      return json(200, { ok: true, created: true, auth: { sub, name, email }, item });
    }

    return json(200, { ok: true, created: false, auth: { sub, name, email }, item: got.Item });
  }

  return json(404, { ok: false, message: "Not Found" });
};
