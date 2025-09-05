import React, { useState } from 'react';
import { useMaterials } from '../contexts/MaterialsContext';
import { useAuth } from '../contexts/AuthContext';
import { Material } from '../types';
import { Upload, X, Star, Camera, Plus } from 'lucide-react';

export function PostMaterial() {
  const { addMaterial } = useMaterials();
  const { user, awardPoints } = useAuth();
  // navigation is handled by parent via onNavigate; we will dispatch a custom event
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    price: '',
    isbn: '',
    subject: '数学',
    subCategory: '',
    targetLevel: '標準',
    materialType: '参考書',
    usageStartDate: '',
    usageEndDate: '',
    totalStudyHours: '',
    pagesStudied: '',
    completionRate: '',
    beforeScore: '',
    afterScore: '',
    beforeDeviation: '',
    afterDeviation: '',
    review: '',
    tips: '',
    recommendedFor: '',
    tags: '',
  });

  const [ratings, setRatings] = useState({
    understanding: 5,
    quality: 5,
    value: 5,
    recommendation: 5,
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [pros, setPros] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);

  const subjects = ['数学', '英語', '国語', '理科', '社会'];
  const levels = ['基礎', '標準', '応用', '難関'];
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const newMaterial: Material = {
      id: String(Date.now()),
      userId: user.id,
      user,
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      price: Number(formData.price || 0),
      isbn: formData.isbn || undefined,
      subject: formData.subject,
      subCategory: formData.subCategory || '',
      targetLevel: formData.targetLevel,
      materialType: formData.materialType,
      images: uploadedImages,
      usagePeriod: {
        startDate: formData.usageStartDate ? new Date(formData.usageStartDate) : new Date(),
        endDate: formData.usageEndDate ? new Date(formData.usageEndDate) : new Date(),
      },
      totalStudyHours: Number(formData.totalStudyHours || 0),
      pagesStudied: Number(formData.pagesStudied || 0),
      completionRate: Number(formData.completionRate || 0),
      performanceData: {
        beforeScore: Number(formData.beforeScore || 0),
        afterScore: Number(formData.afterScore || 0),
        beforeDeviation: Number(formData.beforeDeviation || 0),
        afterDeviation: Number(formData.afterDeviation || 0),
      },
      ratings: {
        understanding: ratings.understanding,
        quality: ratings.quality,
        value: ratings.value,
        recommendation: ratings.recommendation,
      },
      review: formData.review,
      pros: pros.filter(p => p.trim().length > 0),
      cons: cons.filter(c => c.trim().length > 0),
      tips: formData.tips,
      recommendedFor: formData.recommendedFor,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      likes: 0,
      comments: [],
      verified: false,
      createdAt: new Date(),
    };
    addMaterial(newMaterial);
    // 投稿ボーナス（例: 50pt）
    awardPoints(50, 'post material');
    // ページ遷移（親のAppのonNavigateをトリガ）
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'materials' } }));
    alert('教材を投稿しました！');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const updatePros = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const addPros = () => setPros([...pros, '']);
  const removePros = (index: number) => setPros(pros.filter((_, i) => i !== index));

  const updateCons = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  const addCons = () => setCons([...cons, '']);
  const removeCons = (index: number) => setCons(cons.filter((_, i) => i !== index));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">教材を投稿する</h2>
          <p className="text-blue-100 mt-1">あなたの学習体験を共有して、後輩たちを応援しましょう</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* 教材の基本情報 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">基本情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  教材名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例：チャート式数学IA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  著者 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  出版社 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.publisher}
                  onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  価格（円）
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  科目 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  対象レベル <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.targetLevel}
                  onChange={(e) => setFormData({...formData, targetLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* 教材の写真 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">教材の写真</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">写真をアップロード</h4>
                <p className="text-gray-600 mb-4">表紙・目次・サンプルページなど（最大5枚）</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                  <span>写真を選択</span>
                </label>
              </div>
              
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 使用実績データ */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">使用実績</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">使用開始日</label>
                <input
                  type="date"
                  value={formData.usageStartDate}
                  onChange={(e) => setFormData({...formData, usageStartDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">使用終了日</label>
                <input
                  type="date"
                  value={formData.usageEndDate}
                  onChange={(e) => setFormData({...formData, usageEndDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">総学習時間（時間）</label>
                <input
                  type="number"
                  value={formData.totalStudyHours}
                  onChange={(e) => setFormData({...formData, totalStudyHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">完成度（%）</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.completionRate}
                  onChange={(e) => setFormData({...formData, completionRate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* 成果データ */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">学習成果</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">使用前</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">点数</label>
                    <input
                      type="number"
                      value={formData.beforeScore}
                      onChange={(e) => setFormData({...formData, beforeScore: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">偏差値</label>
                    <input
                      type="number"
                      value={formData.beforeDeviation}
                      onChange={(e) => setFormData({...formData, beforeDeviation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">使用後</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">点数</label>
                    <input
                      type="number"
                      value={formData.afterScore}
                      onChange={(e) => setFormData({...formData, afterScore: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">偏差値</label>
                    <input
                      type="number"
                      value={formData.afterDeviation}
                      onChange={(e) => setFormData({...formData, afterDeviation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 評価 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">評価</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries({
                understanding: '理解しやすさ',
                quality: '問題の質',
                value: 'コストパフォーマンス',
                recommendation: 'おすすめ度'
              }).map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatings({...ratings, [key]: star})}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= ratings[key as keyof typeof ratings]
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{ratings[key as keyof typeof ratings]}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 詳細レビュー */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">詳細レビュー</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  総合レビュー <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="この教材を使った感想、学習効果、おすすめポイントなどを詳しく教えてください"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">良かった点</label>
                  {pros.map((pro, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => updatePros(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="良かった点を入力"
                      />
                      {pros.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePros(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPros}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>追加</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">改善点</label>
                  {cons.map((con, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => updateCons(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="改善点を入力"
                      />
                      {cons.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCons(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCons}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>追加</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">使い方のコツ</label>
                <textarea
                  rows={3}
                  value={formData.tips}
                  onChange={(e) => setFormData({...formData, tips: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="効果的な使い方、学習スケジュール、注意点など"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">こんな人におすすめ</label>
                <textarea
                  rows={2}
                  value={formData.recommendedFor}
                  onChange={(e) => setFormData({...formData, recommendedFor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="どのような学習レベル・目標の人におすすめか"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タグ</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="基礎固め,短期集中,受験直前（カンマ区切り）"
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              投稿することで<a href="#" className="text-blue-600 hover:underline">利用規約</a>に同意したものとみなします
            </p>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              投稿する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}