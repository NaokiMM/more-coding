"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center md:justify-start gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                MC
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                More Coding
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer.services.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#technologies" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.technologies")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer.company.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.company")}
                </Link>
              </li>
              <li>
                <Link href="/login/corporate" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.corporateLogin")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{t("footer.account.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.login")}
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {t("nav.signup")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
