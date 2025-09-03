import React from 'react';
import { Crown, Zap, Star, MessageCircle, TrendingUp } from 'lucide-react';

interface PremiumBannerProps {
  onUpgrade: () => void;
}

export function PremiumBanner({ onUpgrade }: PremiumBannerProps) {
  const premiumFeatures = [
    { icon: Zap, title: '無制限投稿', description: '教材レビューを無制限で投稿' },
    { icon: TrendingUp, title: '詳細分析', description: '学習効果の詳細な統計・分析' },
    { icon: MessageCircle, title: '個人チャット', description: '他のユーザーと直接メッセージ' },
    { icon: Star, title: 'AI推薦', description: '高精度な教材推薦システム' },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Crown className="h-6 w-6" />
        <h3 className="text-xl font-bold">プレミアムプラン</h3>
        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">月額100円</span>
      </div>
      
      <p className="text-purple-100 mb-6">
        より充実した機能で学習効率を最大化しましょう
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {premiumFeatures.map(({ icon: Icon, title, description }) => (
          <div key={title} className="text-center">
            <div className="bg-white/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Icon className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-xs text-purple-100">{description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onUpgrade}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors transform hover:scale-105"
        >
          今すぐアップグレード
        </button>
        <p className="text-xs text-purple-100 mt-2">
          初回30日間無料 • いつでもキャンセル可能
        </p>
      </div>
    </div>
  );
}