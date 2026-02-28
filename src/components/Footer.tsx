/**
 * Footer コンポーネント
 *
 * サイト共通のフッター。ロゴ・タグライン、サービス・会社・アカウントのリンク群、著作権表示を表示する。
 * 表示文言は LanguageContext と useTranslation で言語切り替えに対応。
 * 料金ページ（/pricing）上で料金リンクをクリックした場合はページ内トップへスムーズスクロールする。
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const tKey = (key: string) => t(language, key);
  const pathname = usePathname();

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/pricing") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
                {tKey("serviceTitle")}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {tKey("footer.tagline")}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{tKey("footer.services.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#technologies" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.technologies")}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.blog")}
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  onClick={handlePricingClick}
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  {tKey("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{tKey("footer.company.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/company" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.company")}
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("footer.legal")}
                </Link>
              </li>
              <li>
                <Link href="/login/corporate" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.corporateLogin")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">{tKey("footer.account.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.login")}
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                  {tKey("nav.signup")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            {tKey("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
