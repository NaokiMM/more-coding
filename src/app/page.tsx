"use client";

// ホームページ
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const technologies = [
    {
      id: "javascript",
      nameKey: "tech.javascript.name" as const,
      descriptionKey: "tech.javascript.description" as const,
      color: "from-yellow-500 to-orange-600",
      icon: "JS",
    },
    {
      id: "typescript",
      nameKey: "tech.typescript.name" as const,
      descriptionKey: "tech.typescript.description" as const,
      color: "from-blue-500 to-blue-700",
      icon: "TS",
    },
    {
      id: "react",
      nameKey: "tech.react.name" as const,
      descriptionKey: "tech.react.description" as const,
      color: "from-cyan-500 to-blue-600",
      icon: "⚛️",
    },
    {
      id: "vue",
      nameKey: "tech.vue.name" as const,
      descriptionKey: "tech.vue.description" as const,
      color: "from-green-500 to-emerald-600",
      icon: "Vue",
    },
    {
      id: "nextjs",
      nameKey: "tech.nextjs.name" as const,
      descriptionKey: "tech.nextjs.description" as const,
      color: "from-gray-700 to-gray-900",
      icon: "▲",
    },
    {
      id: "nuxtjs",
      nameKey: "tech.nuxtjs.name" as const,
      descriptionKey: "tech.nuxtjs.description" as const,
      color: "from-green-600 to-emerald-700",
      icon: "ν",
    },
    {
      id: "devtools",
      nameKey: "tech.devtools.name" as const,
      descriptionKey: "tech.devtools.description" as const,
      color: "from-indigo-500 to-purple-600",
      icon: "🔧",
    },
    {
      id: "seo",
      nameKey: "tech.seo.name" as const,
      descriptionKey: "tech.seo.description" as const,
      color: "from-emerald-500 to-teal-600",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                {t("nav.signup")}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            {t("home.hero.title1")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("home.hero.title2")}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {t("home.hero.description")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="#technologies"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              {t("home.hero.getStarted")}
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("home.technologies.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {t("home.technologies.description")}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <Link
              key={tech.id}
              href={`/learn/${tech.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity group-hover:opacity-10`} />
              <div className="relative">
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${tech.color} text-white text-2xl font-bold shadow-lg`}>
                  {tech.icon}
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {t(tech.nameKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {t(tech.descriptionKey)}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {t("home.technologies.getStarted")}
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {t("home.about.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90 whitespace-pre-line">
            {t("home.about.description")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="mb-4 flex items-center justify-center md:justify-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                  SB
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  SkillBoost
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
                  <Link href="#technologies" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
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
    </div>
  );
}
