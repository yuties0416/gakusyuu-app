import { useState } from 'react';
import { AuthForm } from './AuthForm';

export function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <AuthForm />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <section className="px-6 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          学習教材をシェアして
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            合格を掴もう
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          使用した教材の写真とレビュー、学習時間や成績の推移などの<strong className="text-blue-700">定量データ</strong>を共有できる、受験生のためのプラットフォーム。
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => setShowAuth(true)} className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors">アカウント作成 / ログイン</button>
          <a href="#features" className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors">詳しく見る</a>
        </div>
      </section>

      <section id="features" className="px-6 py-16 md:py-24 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:3xl font-bold text-gray-900 text-center">主要機能</h2>
          <p className="mt-3 text-gray-600 text-center">学習効率と信頼性を高めるための機能が揃っています</p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">教材投稿</h3>
              <p className="mt-2 text-sm text-gray-600">写真・レビュー・進捗・学習時間を記録し、他の受験生と共有。</p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
                <li>写真最大5枚</li>
                <li>5段階評価</li>
                <li>進捗と学習時間</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">学習時間計測</h3>
              <p className="mt-2 text-sm text-gray-600">日/週/月ごとの統計で習慣化をサポート。目標設定にも対応。</p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
                <li>リアルタイム計測</li>
                <li>統計グラフ</li>
                <li>目標達成率</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">信頼性システム</h3>
              <p className="mt-2 text-sm text-gray-600">OCRと検証フローで成績の真正性を担保。安心して比較検討。</p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
                <li>改ざん検知</li>
                <li>段階的信頼度</li>
                <li>匿名化表示</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">今すぐ無料ではじめよう</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">ランク制度やコミュニティ機能で、学習をもっと効率的に、もっと楽しく。</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => setShowAuth(true)} className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors">アカウント作成 / ログイン</button>
        </div>
      </section>
    </main>
  );
}
