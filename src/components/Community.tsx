import { useEffect, useState } from 'react';
import { MessageSquare, TrendingUp, Clock, Users, Plus, ThumbsUp, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Community() {
  const [activeSection, setActiveSection] = useState('discussions');
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const STORAGE_KEY = 'community_topics_v1';

  const sections = [
    { id: 'discussions', label: '勉強法相談', icon: MessageSquare },
    { id: 'schools', label: '志望校別', icon: TrendingUp },
    { id: 'success-stories', label: '合格体験談', icon: Users },
  ];

  const [discussionTopics, setDiscussionTopics] = useState<any[]>([
    {
      id: 1,
      title: '数学の勉強法で悩んでいます',
      author: '高校2年生',
      category: '勉強法相談',
      replies: 12,
      likes: 8,
      timeAgo: '2時間前',
      preview: 'チャート式を使っているのですが、なかなか偏差値が上がりません...',
      isHot: true,
    },
    {
      id: 2,
      title: '英単語の効率的な覚え方',
      author: '高校3年生',
      category: '勉強法相談',
      replies: 25,
      likes: 18,
      timeAgo: '5時間前',
      preview: 'システム英単語とターゲット1900で迷っています。皆さんはどちらがおすすめですか？',
      isHot: true,
    },
    {
      id: 3,
      title: '現代文の読解スピードを上げたい',
      author: '高校3年生',
      category: '勉強法相談',
      replies: 7,
      likes: 5,
      timeAgo: '1日前',
      preview: '入試本番で時間が足りなくなってしまいます。どうやって読解スピードを...',
    },
  ]);

  const [schoolTopics, setSchoolTopics] = useState<any[]>([
    {
      id: 1,
      title: '東京大学 理科一類 2024年合格',
      author: '合格エキスパート',
      category: '合格体験談',
      replies: 34,
      likes: 56,
      timeAgo: '3日前',
      preview: '現役で東大理一に合格しました。使用した教材と勉強法を詳しくシェアします...',
      isHot: true,
    },
    {
      id: 2,
      title: '早稲田大学商学部の入試対策',
      author: '受験マスター',
      category: '志望校対策',
      replies: 18,
      likes: 22,
      timeAgo: '1日前',
      preview: '早稲田商学部を目指している方へ、おすすめの教材と対策法をまとめました',
    },
  ]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.discussions) setDiscussionTopics((prev) => [...parsed.discussions, ...prev]);
        if (parsed.schools) setSchoolTopics((prev) => [...parsed.schools, ...prev]);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (discussions: any[], schools: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ discussions, schools }));
  };

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;
    const base = {
      id: Date.now(),
      title: title.trim(),
      author: user?.name ?? '匿名ユーザー',
      userId: user?.id,
      replies: 0,
      likes: 0,
      timeAgo: 'たった今',
      preview: content.trim().slice(0, 80),
      isHot: false,
    };
    if (activeSection === 'discussions') {
      const next = [{ ...base, category: '勉強法相談' }, ...discussionTopics];
      setDiscussionTopics(next);
      persist(next, schoolTopics);
    } else if (activeSection === 'schools') {
      const next = [{ ...base, category: '志望校対策' }, ...schoolTopics];
      setSchoolTopics(next);
      persist(discussionTopics, next);
    } else {
      const next = [{ ...base, category: '合格体験談' }, ...schoolTopics];
      setSchoolTopics(next);
      persist(discussionTopics, next);
    }
    setShowComposer(false);
    setTitle('');
    setContent('');
  };

  const getCurrentTopics = () => {
    switch (activeSection) {
      case 'discussions':
        return discussionTopics;
      case 'schools':
        return schoolTopics;
      case 'success-stories':
        return [...discussionTopics, ...schoolTopics].filter(t => t.category === '合格体験談');
      default:
        return discussionTopics;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8" />
          <h1 className="text-2xl font-bold">コミュニティ</h1>
        </div>
        <p className="text-green-100">
          受験生同士で情報交換し、共に成長していきましょう
        </p>
      </div>

      {/* Section tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-1">
        <div className="grid grid-cols-3 gap-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeSection === id
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* New post button */}
      <div className="flex justify-end">
        <button onClick={() => setShowComposer(true)} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>新規投稿</span>
        </button>
      </div>

      {showComposer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">新規投稿を作成</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトル"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="内容を入力..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button onClick={() => setShowComposer(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">キャンセル</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">投稿する</button>
            </div>
          </div>
        </div>
      )}

      {/* Topics list */}
      <div className="space-y-4">
        {getCurrentTopics().map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'profile', userId: (topic as any).userId || undefined } }));
                }}
                className="bg-gray-100 rounded-full p-3 hover:bg-green-100 transition-colors"
                title="プロフィールを見る"
              >
                <User className="h-5 w-5 text-gray-600 hover:text-green-600" />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {topic.title}
                  </h3>
                  {topic.isHot && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      HOT
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-2 text-sm text-gray-600">
                  <span>{topic.author}</span>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{topic.category}</span>
                  <span>•</span>
                  <span>{topic.timeAgo}</span>
                </div>
                
                <p className="text-gray-700 mb-3 line-clamp-2">{topic.preview}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{topic.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{topic.replies}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Community stats */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">コミュニティ統計</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-sm text-gray-600">アクティブユーザー</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">856</p>
            <p className="text-sm text-gray-600">今月の投稿</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">4.8</p>
            <p className="text-sm text-gray-600">平均満足度</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">12.3k</p>
            <p className="text-sm text-gray-600">総学習時間</p>
          </div>
        </div>
      </div>
    </div>
  );
}