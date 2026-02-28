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

// パスワードリセット用の確認コードを送信
export const forgotPassword = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.forgotPassword({
        onSuccess: () => resolve({ success: true }),
        onFailure: (err) =>
          resolve({
            success: false,
            error: err.message || "確認コードの送信に失敗しました",
          }),
        inputVerificationCode: () => resolve({ success: true }),
      });
    } catch (error) {
      resolve({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "確認コードの送信に失敗しました",
      });
    }
  });
};

// パスワードリセットを完了（確認コードと新パスワードで確定）
export const confirmForgotPassword = async (
  email: string,
  verificationCode: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: () => resolve({ success: true }),
        onFailure: (err) =>
          resolve({
            success: false,
            error: err.message || "パスワードの変更に失敗しました",
          }),
      });
    } catch (error) {
      resolve({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "パスワードの変更に失敗しました",
      });
    }
  });
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
