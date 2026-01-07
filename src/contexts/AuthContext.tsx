"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import {
  getCurrentUser,
  getUserAttributes,
  getSession,
  signOut as cognitoSignOut,
} from "@/lib/cognito";

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
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
      setCognitoUser(null);
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


