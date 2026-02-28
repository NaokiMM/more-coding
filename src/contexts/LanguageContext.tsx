"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ja" | "en" | "cn";

const LANGUAGES: Language[] = ["ja", "en", "cn"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // ローカルストレージから言語設定を読み込む
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem("language", lang);
      // HTMLのlang属性を更新
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    const idx = LANGUAGES.indexOf(language);
    const nextIdx = (idx + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIdx]);
  };

  // マウント後にHTMLのlang属性を設定
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider / useLanguageはLanguageProvider内で使用する必要があります"
    );
  }
  return context;
}
