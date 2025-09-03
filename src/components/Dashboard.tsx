import React from 'react';
import { BookOpen, Clock, TrendingUp, Users, Star, Target, ChevronRight, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockMaterials } from '../mockData';
import { PremiumBanner } from './PremiumBanner';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();

  if (!user) return null;

  const recentMaterials = mockMaterials.slice(0, 3);
  const totalStudyHours = 127; // Mock data
  const thisWeekHours = 18;
  const avgImprovement = 15.2;

  const quickActions = [
    { 
      title: '教材を投稿', 
      description: '新しい教材をシェア',
      icon: BookOpen, 
      page: 'post', 
      color: 'bg-blue-500' 
    },
    { 
      title: '教材を探す', 
      description: '学習に役立つ教材を発見',
      icon: Target, 
      page: 'materials', 
      color: 'bg-green-500' 
    },
    { 
      title: '学習記録', 
      description: '今日の学習を開始',
      icon: Clock, 
      page: 'timer', 
      color: 'bg-purple-500' 
    },
    { 
      title: 'コミュニティ', 
      description: '他の受験生と交流',
      icon: Users, 
      page: 'community', 
      color: 'bg-orange-500' 
    },
  ];

  const progressToNextRank = () => {
    const ranks = [
      { name: '初学者', points: 0 },
      { name: '学習者', points: 101 },
      { name: '努力家', points: 501 },
      { name: '受験マスター', points: 1501 },
      { name: '合格エキスパート', points: 3000 },
    ];

    const currentRankIndex = ranks.findIndex(rank => rank.points > user.points) - 1;
    if (currentRankIndex === -1 || currentRankIndex === ranks.length - 1) {
      return { progress: 100, nextRank: null, pointsNeeded: 0 };
    }

    const currentRank = ranks[currentRankIndex];
    const nextRank = ranks[currentRankIndex + 1];
    const progress = ((user.points - currentRank.points) / (nextRank.points - currentRank.points)) * 100;
    
    return {
      progress: Math.min(progress, 100),
      nextRank: nextRank.name,
      pointsNeeded: nextRank.points - user.points,
    };
  };

  const rankProgress = progressToNextRank();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              おかえりなさい、{user.name}さん！
            </h1>
            <p className="text-blue-100">
              今日も学習を頑張りましょう。あなたの成長を応援しています。
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <div 
              className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full"
            >
              <Award className="h-5 w-5" />
              <span className="font-semibold">{user.rank.name}</span>
            </div>
            <p className="text-sm text-blue-100 mt-1">{user.points} ポイント</p>
          </div>
        </div>
      </div>

      {/* Premium banner for non-premium users */}
      {!user.isPremium && (
        <PremiumBanner onUpgrade={() => console.log('Upgrade to premium')} />
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">学習時間</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">{thisWeekHours}h</span>
          </div>
          <p className="text-sm text-gray-600">今週の学習時間</p>
          <p className="text-xs text-green-600">総計: {totalStudyHours}時間</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-900">成績向上</span>
            </div>
            <span className="text-2xl font-bold text-green-600">+{avgImprovement}</span>
          </div>
          <p className="text-sm text-gray-600">平均点アップ</p>
          <p className="text-xs text-green-600">過去3ヶ月の平均</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold text-gray-900">ランク進捗</span>
            </div>
            <span className="text-2xl font-bold text-purple-600">{Math.round(rankProgress.progress)}%</span>
          </div>
          {rankProgress.nextRank ? (
            <>
              <div className="bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${rankProgress.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {rankProgress.nextRank}まで {rankProgress.pointsNeeded}pt
              </p>
            </>
          ) : (
            <p className="text-sm text-green-600">最高ランク達成！</p>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(({ title, description, icon: Icon, page, color }) => (
            <button
              key={title}
              onClick={() => onNavigate(page)}
              className="group bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-4 text-left transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <div className={`${color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent materials and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent popular materials */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">人気の教材</h2>
            <button
              onClick={() => onNavigate('materials')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>すべて見る</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentMaterials.map((material) => {
              const averageRating = Object.values(material.ratings).reduce((a, b) => a + b) / 4;
              return (
                <div
                  key={material.id}
                  onClick={() => {
                    setSelectedMaterial(material);
                    onNavigate('material-detail');
                  }}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{material.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{averageRating.toFixed(1)}</span>
                      <span>•</span>
                      <span>{material.subject}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning goals */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">今週の目標</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">学習時間目標</span>
              <span className="font-semibold text-blue-600">{thisWeekHours}/20時間</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(thisWeekHours / 20) * 100}%` }}
              ></div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">教材投稿目標</span>
                <span className="font-semibold text-green-600">2/3件</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '66%' }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => onNavigate('timer')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                学習を開始する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}