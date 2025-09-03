import React, { useState } from 'react';
import { Search, Filter, SortDesc } from 'lucide-react';
import { Material } from '../types';
import { MaterialCard } from './MaterialCard';

interface MaterialsListProps {
  materials: Material[];
  onMaterialClick: (material: Material) => void;
}

export function MaterialsList({ materials, onMaterialClick }: MaterialsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('すべて');
  const [selectedLevel, setSelectedLevel] = useState('すべて');
  const [sortBy, setSortBy] = useState('新着順');

  const subjects = ['すべて', '数学', '英語', '国語', '理科', '社会'];
  const levels = ['すべて', '基礎', '標準', '応用', '難関'];
  const sortOptions = ['新着順', '評価順', '学習効果順', 'いいね順'];

  const filteredMaterials = materials
    .filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'すべて' || material.subject === selectedSubject;
      const matchesLevel = selectedLevel === 'すべて' || material.targetLevel.includes(selectedLevel);
      
      return matchesSearch && matchesSubject && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case '評価順':
          const aRating = Object.values(a.ratings).reduce((sum, val) => sum + val) / Object.keys(a.ratings).length;
          const bRating = Object.values(b.ratings).reduce((sum, val) => sum + val) / Object.keys(b.ratings).length;
          return bRating - aRating;
        case '学習効果順':
          const aImprovement = a.performanceData.afterScore - a.performanceData.beforeScore;
          const bImprovement = b.performanceData.afterScore - b.performanceData.beforeScore;
          return bImprovement - aImprovement;
        case 'いいね順':
          return b.likes - a.likes;
        default: // 新着順
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="教材名・著者名で検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredMaterials.length}件の教材が見つかりました
        </p>
      </div>

      {/* Materials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <MaterialCard
            key={material.id}
            material={material}
            onClick={() => onMaterialClick(material)}
          />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">教材が見つかりませんでした</h3>
          <p className="text-gray-600">検索条件を変更して再度お試しください</p>
        </div>
      )}
    </div>
  );
}