// useState/useEffect/useContext を使うため（Client Component）

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getCurrentUser, getUserAttributes, getSession, signOut as cognitoSignOut } from "@/lib/cognito";

// /me エンドポイントのレスポンス型
interface MeResponse {
  ok: boolean;
  created: boolean;
  auth: {
    sub: string;
    name: string | null;
    email: string | null;
  };
  item: {
    pk: string;
    sk: string;
    createdAt?: string;
    [key: string]: any;
  };
}

interface User {
  email: string;
  name: string;
  subscriptionType?: string;
  auth?: {
    sub: string;
    name: string | null;
    email: string | null;
  };
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  cognitoUser: CognitoUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

// createContext<型（どちらか）>(初期値)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
  const [loading, setLoading] = useState(true);

  /*
    認証ユーザーをロードする処理。
    1. Cognitoから現在ユーザー取得
    2. セッションがあれば /me API を呼ぶ
    3. 本来は API Gateway 経由でユーザー情報を取得するが、
    失敗した場合は Cognito から直接取得する
  */
  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setCognitoUser(currentUser);
        
        // API Gatewayからユーザー情報を取得
        try {
          const session = await getSession();
          if (session) {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

            const response = await fetch(`${API_BASE_URL}/me`, {
              headers: {
                Authorization: `Bearer ${session.idToken}`,
              },
            });

            if (response.ok) {
              const data: MeResponse = await response.json();
              // auth と item をマージして User 型に変換
              const userData: User = {
                ...data.item,
                email: data.auth.email || data.item.email || "",
                name: data.auth.name || data.item.name || "",
                auth: data.auth,
                // API が membershipTier を返す場合も subscriptionType に揃える
                subscriptionType:
                  data.item.subscriptionType ?? data.item.membershipTier ?? "free",
              };
              setUser(userData);
              // console.log("課金状態:", userData.subscriptionType);
              // console.log("membershipTier:", userData.membershipTier);
            } else {
              // APIから取得できない場合はCognitoから取得
              const attributes = await getUserAttributes(currentUser);
              setUser(attributes as User);
            }
          } else {
            // セッションがない場合はCognitoから取得
            const attributes = await getUserAttributes(currentUser);
            setUser(attributes as User);
          }
        } catch (apiError) {
          console.error("Error fetching user from API:", apiError);
          // APIエラーの場合はCognitoから取得
          const attributes = await getUserAttributes(currentUser);
          setUser(attributes as User);
        }
      } else {
        // Cognito にいなければ Google セッションを確認
        try {
          const sessionRes = await fetch("/api/auth/session");
          if (sessionRes.ok) {
            const data = await sessionRes.json();
            if (data.user) {
              setUser(data.user as User);
              setCognitoUser(null);
            } else {
              setUser(null);
              setCognitoUser(null);
            }
          } else {
            setUser(null);
            setCognitoUser(null);
          }
        } catch {
          setUser(null);
          setCognitoUser(null);
        }
      }
    // try catch でエラーを処理
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
      setCognitoUser(null);
    // 最終時にloadingをfalseにする
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signOut = () => {
    cognitoSignOut();
    fetch("/api/auth/signout", { method: "POST" }).catch(() => {});
    setUser(null);
    setCognitoUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  /*
    認証情報と操作を Context に提供し、
    配下のコンポーネント（画面）を表示する
  */
  return (
    <AuthContext.Provider
      value={{
        user,
        cognitoUser,
        loading,
        isAuthenticated: !!user,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 認証情報（ユーザー・ログイン状態・操作）を取得するカスタムフック
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // 認証エラー
    throw new Error(
      "useAuth must be used within an AuthProvider / useAuthはAuthProvider内で使用する必要があります"
    );
  }
  return context;
}
