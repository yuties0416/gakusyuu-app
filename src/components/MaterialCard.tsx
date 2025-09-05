import { Star, Clock, TrendingUp, CheckCircle, MessageCircle, Heart, BookOpen, User as UserIcon } from 'lucide-react';
import { Material } from '../types';

interface MaterialCardProps {
  material: Material;
  onClick: () => void;
}

export function MaterialCard({ material, onClick }: MaterialCardProps) {
  const averageRating = Object.values(material.ratings).reduce((a, b) => a + b) / Object.keys(material.ratings).length;
  const scoreImprovement = material.performanceData.afterScore - material.performanceData.beforeScore;
  const deviationImprovement = material.performanceData.afterDeviation - material.performanceData.beforeDeviation;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Header with image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
        {material.images[0] ? (
          <img
            src={material.images[0]}
            alt={material.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{material.title}</p>
            </div>
          </div>
        )}
        
        {material.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <CheckCircle className="h-3 w-3" />
            <span>認証済み</span>
          </div>
        )}

        {/* User rank badge + avatar tap */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'profile', userId: material.user.id, user: material.user } }));
            }}
            className="bg-white/70 rounded-full p-1 hover:scale-105 transition-transform"
            title={`${material.user.name}のプロフィールを見る`}
          >
            <UserIcon className="h-5 w-5 text-gray-700" />
          </button>
          <div
            className="px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: material.user.rank.color }}
          >
            {material.user.rank.name}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and basic info */}
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {material.title}
          </h3>
          <p className="text-sm text-gray-600">{material.author} • {material.publisher}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {material.subject}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {material.targetLevel}
            </span>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{material.totalStudyHours}時間</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600">+{scoreImprovement}点</span>
          </div>
        </div>

        {/* Performance improvement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-600">得点向上</p>
              <p className="font-bold text-green-600">+{scoreImprovement}点</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">偏差値向上</p>
              <p className="font-bold text-blue-600">+{deviationImprovement.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Review snippet */}
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">
          {material.review}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {material.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {material.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{material.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{material.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{material.comments.length}</span>
            </button>
          </div>
          <span className="text-xs text-gray-400">
            {material.createdAt.toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>
    </div>
  );
}