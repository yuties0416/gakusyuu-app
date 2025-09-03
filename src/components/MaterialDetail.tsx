import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, TrendingUp, User, Heart, MessageCircle, Share2, Calendar, BookOpen, Target } from 'lucide-react';
import { Material } from '../types';

interface MaterialDetailProps {
  material: Material;
  onBack: () => void;
}

export function MaterialDetail({ material, onBack }: MaterialDetailProps) {
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');

  const averageRating = Object.values(material.ratings).reduce((a, b) => a + b) / 4;
  const scoreImprovement = material.performanceData.afterScore - material.performanceData.beforeScore;
  const deviationImprovement = material.performanceData.afterDeviation - material.performanceData.beforeDeviation;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Here you would add the comment to the database
      console.log('Comment submitted:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{material.title}</h1>
          <p className="text-gray-600">{material.author} • {material.publisher}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {material.images.length > 0 ? (
                material.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${material.title} - ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))
              ) : (
                <div className="col-span-2 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-2" />
                    <p>画像がありません</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance data */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">学習成果</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">+{scoreImprovement}</p>
                <p className="text-sm text-gray-600">得点向上</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">+{deviationImprovement.toFixed(1)}</p>
                <p className="text-sm text-gray-600">偏差値向上</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{material.totalStudyHours}</p>
                <p className="text-sm text-gray-600">学習時間</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">{material.completionRate}%</p>
                <p className="text-sm text-gray-600">完成度</p>
              </div>
            </div>
          </div>

          {/* Review */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">詳細レビュー</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{material.review}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-600 mb-2">✓ 良かった点</h4>
                <ul className="space-y-1">
                  {material.pros.map((pro, index) => (
                    <li key={index} className="text-sm text-gray-700">• {pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 mb-2">△ 改善点</h4>
                <ul className="space-y-1">
                  {material.cons.map((con, index) => (
                    <li key={index} className="text-sm text-gray-700">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>

            {material.tips && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">💡 使い方のコツ</h4>
                <p className="text-sm text-blue-800">{material.tips}</p>
              </div>
            )}

            {material.recommendedFor && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-600 mb-2">👥 こんな人におすすめ</h4>
                <p className="text-sm text-purple-800">{material.recommendedFor}</p>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">コメント ({material.comments.length})</h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="この教材についてコメントする..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  コメント投稿
                </button>
              </div>
            </form>

            {material.comments.length > 0 ? (
              <div className="space-y-4">
                {material.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.user.name}</span>
                        <span className="text-xs text-gray-500">{comment.createdAt.toLocaleDateString('ja-JP')}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>まだコメントはありません</p>
                <p className="text-sm">最初のコメントを投稿してみましょう</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User info */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">投稿者</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gray-200 rounded-full p-3">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{material.user.name}</p>
                <div className="flex items-center space-x-2">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: material.user.rank.color }}
                  >
                    {material.user.rank.name}
                  </span>
                  <span className="text-xs text-gray-500">{material.user.points}pt</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>学年:</span>
                <span>{material.user.grade}</span>
              </div>
              <div className="flex justify-between">
                <span>投稿日:</span>
                <span>{material.createdAt.toLocaleDateString('ja-JP')}</span>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">評価</h3>
            <div className="space-y-3">
              {Object.entries({
                understanding: '理解しやすさ',
                quality: '問題の質',
                value: 'コスパ',
                recommendation: 'おすすめ度'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{label}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= material.ratings[key as keyof typeof material.ratings]
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {material.ratings[key as keyof typeof material.ratings]}/5
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
                  <span className="text-gray-600">総合評価</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {material.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">アクション</h3>
            <div className="space-y-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
                  liked
                    ? 'bg-red-50 text-red-600 border-2 border-red-200'
                    : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? 'いいね済み' : 'いいね'}</span>
                <span>({material.likes + (liked ? 1 : 0)})</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>シェア</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>投稿者にメッセージ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar with basic info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">教材情報</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">科目:</span>
                <span className="font-medium">{material.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">対象レベル:</span>
                <span className="font-medium">{material.targetLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">教材種類:</span>
                <span className="font-medium">{material.materialType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">価格:</span>
                <span className="font-medium">¥{material.price.toLocaleString()}</span>
              </div>
              {material.isbn && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium text-xs">{material.isbn}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">使用実績</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">使用期間:</span>
                </div>
              </div>
              <p className="text-gray-700">
                {material.usagePeriod.startDate.toLocaleDateString('ja-JP')} ～ {material.usagePeriod.endDate.toLocaleDateString('ja-JP')}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{material.totalStudyHours}h</p>
                  <p className="text-xs text-gray-600">学習時間</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{material.completionRate}%</p>
                  <p className="text-xs text-gray-600">完成度</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment form */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">コメントを投稿</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="この教材についてコメントしましょう..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              投稿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}