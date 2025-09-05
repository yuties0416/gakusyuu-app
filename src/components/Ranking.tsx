import { useState } from 'react';
import { Crown, Medal, Trophy, User, TrendingUp, Clock, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Ranking() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overall');

  const tabs = [
    { id: 'overall', label: '総合ランキング', icon: Crown },
    { id: 'study-time', label: '学習時間', icon: Clock },
    { id: 'posts', label: '投稿数', icon: BookOpen },
    { id: 'improvement', label: '成績向上', icon: TrendingUp },
  ];

  // Mock ranking data
  const rankings = {
    overall: [
      { rank: 1, user: { name: '山田太郎', grade: '高校3年', rank: { name: '合格エキスパート', color: '#EF4444' } }, points: 3250, value: '3250pt' },
      { rank: 2, user: { name: '佐藤花子', grade: '高校3年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 2890, value: '2890pt' },
      { rank: 3, user: { name: '田中次郎', grade: '高校2年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 2650, value: '2650pt' },
      { rank: 4, user: { name: '高橋美咲', grade: '高校3年', rank: { name: '努力家', color: '#8B5CF6' } }, points: 1200, value: '1200pt' },
      { rank: 5, user: { name: '鈴木大輔', grade: '高校2年', rank: { name: '努力家', color: '#8B5CF6' } }, points: 950, value: '950pt' },
      { rank: 12, user: user, points: user?.points || 0, value: `${user?.points || 0}pt` },
    ],
    'study-time': [
      { rank: 1, user: { name: '田中次郎', grade: '高校2年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 456, value: '456時間' },
      { rank: 2, user: { name: '山田太郎', grade: '高校3年', rank: { name: '合格エキスパート', color: '#EF4444' } }, points: 423, value: '423時間' },
      { rank: 3, user: { name: '佐藤花子', grade: '高校3年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 389, value: '389時間' },
      { rank: 8, user: user, points: 127, value: '127時間' },
    ],
    posts: [
      { rank: 1, user: { name: '佐藤花子', grade: '高校3年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 28, value: '28件' },
      { rank: 2, user: { name: '山田太郎', grade: '高校3年', rank: { name: '合格エキスパート', color: '#EF4444' } }, points: 25, value: '25件' },
      { rank: 3, user: { name: '高橋美咲', grade: '高校3年', rank: { name: '努力家', color: '#8B5CF6' } }, points: 19, value: '19件' },
      { rank: 6, user: user, points: 12, value: '12件' },
    ],
    improvement: [
      { rank: 1, user: { name: '高橋美咲', grade: '高校3年', rank: { name: '努力家', color: '#8B5CF6' } }, points: 35, value: '+35点' },
      { rank: 2, user: { name: '田中次郎', grade: '高校2年', rank: { name: '受験マスター', color: '#F59E0B' } }, points: 32, value: '+32点' },
      { rank: 3, user: { name: '鈴木大輔', grade: '高校2年', rank: { name: '努力家', color: '#8B5CF6' } }, points: 28, value: '+28点' },
      { rank: 4, user: user, points: 27, value: '+27点' },
    ],
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-6 w-6 text-orange-400" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const currentRanking = rankings[activeTab as keyof typeof rankings];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Crown className="h-8 w-8" />
          <h1 className="text-2xl font-bold">ランキング</h1>
        </div>
        <p className="text-purple-100">
          努力する仲間たちと切磋琢磨して、一緒に成長していきましょう
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium hidden md:inline">{label}</span>
              <span className="font-medium md:hidden text-sm">{label.split('ランキング')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current user position */}
      {user && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <Award className="h-5 w-5 text-blue-600" />
            <span>あなたの現在の順位</span>
          </h3>
          {currentRanking.find(item => item.user === user) && (
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-3">
                {getRankIcon(currentRanking.find(item => item.user === user)?.rank || 0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: user.rank.color }}
                  >
                    {user.rank.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {currentRanking.find(item => item.user === user)?.rank}位 • {currentRanking.find(item => item.user === user)?.value}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rankings list */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h3>
          <div className="space-y-3">
            {currentRanking.slice(0, 10).map((item, index) => {
              const isCurrentUser = item.user === user;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                    isCurrentUser 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0 w-12 flex justify-center">
                    {getRankIcon(item.rank)}
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                          {typeof item.user === 'string' ? item.user : (item.user?.name ?? '')}
                        </span>
                        {item.user && typeof item.user === 'object' && (
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: item.user.rank.color }}
                          >
                            {item.user.rank.name}
                          </span>
                        )}
                      </div>
                      {item.user && typeof item.user === 'object' && (
                        <p className="text-xs text-gray-500">{item.user.grade}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-bold ${isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rank rewards info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ランク特典</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { rank: '努力家', color: '#8B5CF6', points: '501pt〜', rewards: ['詳細分析機能', '個人チャット3回/日'] },
            { rank: '受験マスター', color: '#F59E0B', points: '1501pt〜', rewards: ['優先サポート', '特別バッジ表示'] },
            { rank: '合格エキスパート', color: '#EF4444', points: '3000pt〜', rewards: ['無制限機能', 'メンター制度参加'] },
          ].map((rankInfo) => (
            <div key={rankInfo.rank} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: rankInfo.color }}
                >
                  {rankInfo.rank}
                </span>
                <span className="text-sm text-gray-600">{rankInfo.points}</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                {rankInfo.rewards.map((reward, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{reward}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}