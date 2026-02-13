"use client";

// ホームページ
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";
import Header from "@/components/Header";
import AdBanner from "@/components/AdBanner";

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
      id: "nodejs",
      nameKey: "tech.nodejs.name" as const,
      descriptionKey: "tech.nodejs.description" as const,
      color: "from-green-600 to-green-800",
      icon: "🟢",
    },
    {
      id: "nestjs",
      nameKey: "tech.nestjs.name" as const,
      descriptionKey: "tech.nestjs.description" as const,
      color: "from-red-600 to-red-800",
      icon: "🔴",
    },
    {
      id: "express",
      nameKey: "tech.express.name" as const,
      descriptionKey: "tech.express.description" as const,
      color: "from-gray-600 to-gray-800",
      icon: "⚡",
    },
    {
      id: "gin",
      nameKey: "tech.gin.name" as const,
      descriptionKey: "tech.gin.description" as const,
      color: "from-cyan-500 to-teal-600",
      icon: "Gin",
    },
    {
      id: "laravel",
      nameKey: "tech.laravel.name" as const,
      descriptionKey: "tech.laravel.description" as const,
      color: "from-red-500 to-red-700",
      icon: "🔴",
    },
    {
      id: "django",
      nameKey: "tech.django.name" as const,
      descriptionKey: "tech.django.description" as const,
      color: "from-green-600 to-emerald-700",
      icon: "🐍",
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
    {
      id: "ai-interview",
      nameKey: "tech.ai-interview.name" as const,
      descriptionKey: "tech.ai-interview.description" as const,
      color: "from-purple-500 to-pink-600",
      icon: "🤖",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

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

      {/* Ad Banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AdBanner />
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
    </div>
  );
}
