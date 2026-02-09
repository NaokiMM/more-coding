// lambda/skillboost-members-backfill-free/index.mjs
// 実行方法が不明
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event = {}) => {
  const membersTable = process.env.MEMBERS_TABLE;
  if (!membersTable) throw new Error("MEMBERS_TABLE is missing");

  // 安全装置：最初は小さく
  const maxUpdates = Number(event.maxUpdates ?? 200);
  const dryRun = Boolean(event.dryRun ?? false);

  let updated = 0;
  let scanned = 0;
  let lastKey = undefined;

  const now = new Date().toISOString();

  do {
    const res = await ddb.send(
      new ScanCommand({
        TableName: membersTable,
        ExclusiveStartKey: lastKey,

        // PROFILE行だけ対象（あなたの設計に合わせて）
        FilterExpression: "sk = :sk",
        ExpressionAttributeValues: { ":sk": "PROFILE" },

        // キーだけ取得して軽くする
        ProjectionExpression: "pk, sk",
      })
    );

    const items = res.Items ?? [];
    scanned += items.length;

    for (const it of items) {
      if (updated >= maxUpdates) {
        return {
          ok: true,
          stopped: true,
          dryRun,
          scanned,
          updated,
          message: `Stopped at maxUpdates=${maxUpdates}`,
        };
      }

      if (!dryRun) {
        await ddb.send(
          new UpdateCommand({
            TableName: membersTable,
            Key: { pk: it.pk, sk: it.sk },
            // 既存値があれば壊さない
            UpdateExpression:
              "SET membershipTier = if_not_exists(membershipTier, :tier), " +
              "isPaid = if_not_exists(isPaid, :paid), " +
              "paidAt = if_not_exists(paidAt, :paidAt), " +
              "updatedAt = :now",
            ExpressionAttributeValues: {
              ":tier": "free",
              ":paid": false,
              ":paidAt": null,
              ":now": now,
            },
          })
        );
      }

      updated++;
    }

    lastKey = res.LastEvaluatedKey;
  } while (lastKey);

  return { ok: true, dryRun, scanned, updated };
};
