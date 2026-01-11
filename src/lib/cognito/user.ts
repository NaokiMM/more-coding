import { CognitoUser } from "amazon-cognito-identity-js";

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
