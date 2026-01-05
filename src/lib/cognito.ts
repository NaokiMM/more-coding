import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

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
const getUserPool = () => {
  return new CognitoUserPool(getPoolData());
};

// 会員登録
export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<{
  success: boolean;
  error?: string;
  user?: CognitoUser;
  userConfirmed?: boolean;
  requiresConfirmation?: boolean;
}> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const attributeList = [
        new CognitoUserAttribute({
          Name: "email",
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: "name",
          Value: name,
        }),
      ];

      userPool.signUp(
        email,
        password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
            resolve({
              success: false,
              error: err.message || "会員登録に失敗しました",
            });
            return;
          }

          if (result) {
            const userConfirmed = result.userConfirmed;
            resolve({
              success: true,
              user: result.user,
              userConfirmed: userConfirmed,
              requiresConfirmation: !userConfirmed,
            });
          } else {
            resolve({
              success: false,
              error: "会員登録に失敗しました",
            });
          }
        }
      );
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : "会員登録に失敗しました",
      });
    }
  });
};

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

// ユーザー情報を取得
export const getUserAttributes = (
  cognitoUser: CognitoUser
): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    cognitoUser.getUserAttributes((err, attributes) => {
      if (err) {
        reject(err);
        return;
      }

      const userAttributes: Record<string, string> = {};
      attributes?.forEach((attr) => {
        userAttributes[attr.Name] = attr.Value;
      });

      resolve(userAttributes);
    });
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

// メール確認コードを検証
export const confirmSignUp = async (
  email: string,
  code: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          resolve({
            success: false,
            error: err.message || "確認コードの検証に失敗しました",
          });
          return;
        }

        resolve({
          success: true,
        });
      });
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : "確認コードの検証に失敗しました",
      });
    }
  });
};

// 確認コードを再送信
export const resendConfirmationCode = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    try {
      const userPool = getUserPool();
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          resolve({
            success: false,
            error: err.message || "確認コードの再送信に失敗しました",
          });
          return;
        }

        resolve({
          success: true,
        });
      });
    } catch (error) {
      resolve({
        success: false,
        error: error instanceof Error ? error.message : "確認コードの再送信に失敗しました",
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

