// useState/useEffect/useContext を使うため（Client Component）

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { getCurrentUser, getUserAttributes, getSession, signOut as cognitoSignOut } from "@/lib/cognito";

interface User {
  email: string;
  name: string;
  subscriptionType?: string;
  [key: string]: string | undefined;
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

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setCognitoUser(currentUser);
        
        // API Gatewayからユーザー情報を取得
        try {
          const session = await getSession();
          if (session) {
            const response = await fetch(
              "https://h7sqt3sfpj.execute-api.ap-northeast-1.amazonaws.com/me",
              {
                headers: {
                  Authorization: `Bearer ${session.idToken}`,
                },
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              setUser(data as User);
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
        setUser(null);
        setCognitoUser(null);
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
    setUser(null);
    setCognitoUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

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


