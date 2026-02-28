import ja from "../../locales/jp/ja.json"
import en from "../../locales/en/en.json"
import cn from "../../locales/cn/cn.json"

export type Lang = "ja" | "en" | "cn"

export const messages = {
  ja,
  en,
  cn
}

export function t(lang: Lang, key: string) {
  return messages[lang][key as keyof typeof messages.ja] || key
}