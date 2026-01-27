"use client";

import { useRouter } from "next/navigation";

interface EndStudyButtonProps {
  categoryId: string;
  technology: string;
  courseType: "associate" | "professional" | "expert";
}

export default function EndStudyButton({ categoryId, technology, courseType }: EndStudyButtonProps) {
  const router = useRouter();

  const handleEndStudy = () => {
    if (confirm("学習を終了しますか？")) {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleEndStudy}
      className="ml-auto flex h-14 items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label="学習を終了する"
    >
      <span>終了</span>
      <span className="text-xs">する</span>
    </button>
  );
}
