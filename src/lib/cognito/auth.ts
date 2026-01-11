import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { getUserPool } from "./config";

// ログイン
export const signIn = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  error?: string;
  tokens?: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
}> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            success: true,
            tokens: {
              accessToken: result.getAccessToken().getJwtToken(),
              idToken: result.getIdToken().getJwtToken(),
              refreshToken: result.getRefreshToken().getToken(),
            },
          });
        },
        onFailure: (err) => {
          resolve({
            success: false,
            error: err.message || "ログインに失敗しました",
          });
        },
      });
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : "ログインに失敗しました",
      });
    }
  });
};

// 現在のユーザーを取得
export const getCurrentUser = (): Promise<CognitoUser | null> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = userPool.getCurrentUser();

      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: Error | null, session: any) => {
        if (err || !session.isValid()) {
          resolve(null);
          return;
        }

        resolve(cognitoUser);
      });
    } catch (error) {
      resolve(null);
    }
  });
};

// ログアウト
export const signOut = (): void => {
  try {
    const userPool = getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  } catch (error) {
    console.error("ログアウトエラー:", error);
  }
};

// セッションを取得
export const getSession = (): Promise<{
  accessToken: string;
  idToken: string;
  refreshToken: string;
} | null> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = userPool.getCurrentUser();

      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: Error | null, session: any) => {
        if (err || !session.isValid()) {
          resolve(null);
          return;
        }

        resolve({
          accessToken: session.getAccessToken().getJwtToken(),
          idToken: session.getIdToken().getJwtToken(),
          refreshToken: session.getRefreshToken().getToken(),
        });
      });
    } catch (error) {
      resolve(null);
    }
  });
};
