import React from 'react';
import { Search, User, BookOpen, Clock, Star, MessageCircle, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'materials', label: '教材を探す', icon: Search },
    { id: 'post', label: '投稿する', icon: BookOpen },
    { id: 'timer', label: '学習時間', icon: Clock },
    { id: 'ranking', label: 'ランキング', icon: Star },
    { id: 'community', label: 'コミュニティ', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">学習教材シェア</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                currentPage === id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {user && (
          <div className="flex items-center space-x-3">
            {user.isPremium && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-xs font-medium">
                <Crown className="h-3 w-3" />
                <span>プレミアム</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className={`text-xs font-medium`} style={{ color: user.rank.color }}>
                  {user.rank.name} ({user.points}pt)
                </p>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <User className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}