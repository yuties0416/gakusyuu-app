import { Clock, BookOpen, TrendingUp, Award, Calendar, Target, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMaterials } from '../contexts/MaterialsContext';
import { User as AppUser } from '../types';

export function UserProfile({ userOverride }: { userOverride?: AppUser }) {
  const { user } = useAuth();
  const viewingUser = userOverride ?? user;
  const { materials } = useMaterials();

  if (!viewingUser) return null;

  // 投稿数
  const myMaterials = materials.filter(m => m.userId === viewingUser.id);
  const postCount = myMaterials.length;

  // 総学習時間（分を時間へ）
  const sessionsKey = `study_sessions_${viewingUser.id}`;
  const sessionsRaw = typeof window !== 'undefined' ? localStorage.getItem(sessionsKey) : null;
  const sessions: Array<{ duration: number; subject: string; at: string }> = sessionsRaw ? JSON.parse(sessionsRaw) : [];
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  // 平均評価（自身の投稿のratings平均）
  const myRatings: number[] = myMaterials.map(m => {
    const r = m.ratings;
    return r ? (r.understanding + r.quality + r.value + r.recommendation) / 4 : 0;
  }).filter(v => v > 0);
  const avgRating = myRatings.length ? (myRatings.reduce((a,b)=>a+b,0) / myRatings.length) : 0;

  const stats = [
    { icon: BookOpen, label: '投稿数', value: String(postCount), color: 'text-blue-600' },
    { icon: Clock, label: '総学習時間', value: `${totalHours}h`, color: 'text-green-600' },
    { icon: TrendingUp, label: '平均評価', value: avgRating ? avgRating.toFixed(1) : '—', color: 'text-yellow-600' },
    { icon: Award, label: 'ポイント', value: viewingUser.points.toString(), color: 'text-purple-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{viewingUser.name}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: viewingUser.rank.color }}
                >
                  {viewingUser.rank.name}
                </span>
                <span className="text-blue-100">{viewingUser.points} ポイント</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>基本情報</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">学年:</span>
                  <span className="font-medium">{viewingUser.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">登録日:</span>
                  <span className="font-medium">{(() => {
                    const date = typeof viewingUser.createdAt === 'string' ? new Date(viewingUser.createdAt) : viewingUser.createdAt;
                    return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('ja-JP');
                  })()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>志望校</span>
              </h3>
              <div className="space-y-1">
                {viewingUser.targetSchools.map((school, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm mr-1 mb-1"
                  >
                    {school}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-sm text-gray-600">{label}</span>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>最近のアクティビティ</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <BookOpen className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">チャート式数学IAをレビュー</p>
              <p className="text-sm text-gray-600">2時間前</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">数学を2時間学習</p>
              <p className="text-sm text-gray-600">昨日</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <Award className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">努力家ランクにランクアップ！</p>
              <p className="text-sm text-gray-600">3日前</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}