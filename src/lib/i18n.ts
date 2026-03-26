import ja from "../../locales/jp/ja.json"
import en from "../../locales/en/en.json"
import cn from "../../locales/cn/cn.json"
import kr from "../../locales/kr/kr.json"

export type Lang = "ja" | "en" | "cn" | "kr"

export const messages: Record<Lang, typeof ja> = {
  ja,
  en: en as typeof ja,
  cn: cn as typeof ja,
  kr: kr as typeof ja,
}

export function t(lang: Lang, key: string) {
  return (
    messages[lang][key as keyof typeof messages.ja] ||
    messages.ja[key as keyof typeof messages.ja] ||
    key
  )
}