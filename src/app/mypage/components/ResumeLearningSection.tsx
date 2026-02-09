/*
 ResumeLearningSection
 --------------------
 マイページに表示する「学習再開」セクション。
 前回の学習履歴と同じUI（見出し＋カード＋テーブル）で統一。

 【役割】
 - 後々「再開先」（例: JavaScript/Associate/基礎表現）と「日時」（例: 2026/01/28 01:02）を一覧表示する予定
 - 現時点ではUIのみ。空の場合は「まだ学習再開の履歴がありません。」を表示
*/

"use client";

export default function ResumeLearningSection() {
  const items: { path: string; lastAccessedAt: string }[] = [];

  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        学習再開
      </h2>
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        {items.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">
            まだ学習再開の履歴がありません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    再開先
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    日時
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                      {item.path}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {item.lastAccessedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
