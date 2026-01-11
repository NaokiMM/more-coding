import { CognitoUserPool } from "amazon-cognito-identity-js";

// Cognito設定を取得する関数
const getPoolData = (): { UserPoolId: string; ClientId: string } => {
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

  const missingVars: string[] = [];
  if (!userPoolId) {
    missingVars.push("NEXT_PUBLIC_COGNITO_USER_POOL_ID");
  }
  if (!clientId) {
    missingVars.push("NEXT_PUBLIC_COGNITO_CLIENT_ID");
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Cognito設定が不足しています。以下の環境変数を.env.localに設定してください:\n${missingVars.join("\n")}\n\n例:\nNEXT_PUBLIC_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxxxxxx\nNEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx`
    );
  }

  // ここまで来れば、userPoolIdとclientIdは必ずstring
  return {
    UserPoolId: userPoolId as string,
    ClientId: clientId as string,
  };
};

// UserPoolを取得する関数（遅延初期化）
export const getUserPool = () => {
  return new CognitoUserPool(getPoolData());
};
