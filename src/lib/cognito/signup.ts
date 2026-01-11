import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getUserPool } from "./config";

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
