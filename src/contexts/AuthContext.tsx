import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../utils/supabase/client';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  loading: boolean;
  awardPoints: (points: number, reason?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_RANKS = {
  beginner: { level: 'beginner', name: '初学者', color: '#6B7280', minPoints: 0 },
  learner: { level: 'learner', name: '学習者', color: '#3B82F6', minPoints: 101 },
  dedicated: { level: 'dedicated', name: '努力家', color: '#8B5CF6', minPoints: 501 },
  master: { level: 'master', name: '受験マスター', color: '#F59E0B', minPoints: 1501 },
  expert: { level: 'expert', name: '合格エキスパート', color: '#EF4444', minPoints: 3000 },
} as const;

const getRankFromPoints = (points: number): User['rank'] => {
  if (points >= 3000) return USER_RANKS.expert;
  if (points >= 1501) return USER_RANKS.master;
  if (points >= 501) return USER_RANKS.dedicated;
  if (points >= 101) return USER_RANKS.learner;
  return USER_RANKS.beginner;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ローカル保存用のユーザー型（パスワードハッシュを含む）
  interface StoredUser extends User {
    passwordHash: string;
  }

  const USERS_KEY = 'users';
  const CURRENT_USER_KEY = 'user';

  const readUsers = (): StoredUser[] => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? (JSON.parse(raw) as StoredUser[]) : [];
    } catch {
      return [];
    }
  };

  const writeUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const hashPassword = async (password: string): Promise<string> => {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const awardPoints = (points: number, _reason?: string) => {
    if (!user) return;
    const updatedPoints = Math.max(0, (user.points || 0) + Math.floor(points));
    const updatedUser: User = {
      ...user,
      points: updatedPoints,
      rank: getRankFromPoints(updatedPoints),
    };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    // USERS にも反映
    const users = readUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], points: updatedPoints, rank: updatedUser.rank };
      writeUsers(users);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const users = readUsers();
      const candidate = users.find(u => u.email === email);
      if (!candidate) {
        throw new Error('メールまたはパスワードが正しくありません');
      }
      const passwordHash = await hashPassword(password);
      if (candidate.passwordHash !== passwordHash) {
        throw new Error('メールまたはパスワードが正しくありません');
      }
      const safeUser: User = {
        id: candidate.id,
        email: candidate.email,
        name: candidate.name,
        grade: candidate.grade,
        targetSchools: candidate.targetSchools,
        subjects: candidate.subjects,
        points: candidate.points,
        rank: candidate.rank,
        createdAt: new Date(candidate.createdAt),
      };
      setUser(safeUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    try {
      const users = readUsers();
      const exists = users.some(u => u.email === userData.email);
      if (exists) {
        throw new Error('このメールアドレスは既に使用されています');
      }
      const passwordHash = await hashPassword(userData.password);
      const newUserBase: User = {
        id: Date.now().toString(),
        email: userData.email!,
        name: userData.name!,
        grade: userData.grade!,
        targetSchools: userData.targetSchools || [],
        subjects: userData.subjects || [],
        points: 0,
        rank: getRankFromPoints(0),
        createdAt: new Date(),
      };
      const storedUser: StoredUser = { ...newUserBase, passwordHash };
      const next = [...users, storedUser];
      writeUsers(next);
      setUser(newUserBase);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUserBase));
      // 新規登録通知（アプリ全体向け）
      try {
        window.dispatchEvent(
          new CustomEvent('user:registered', {
            detail: { id: newUserBase.id, email: newUserBase.email, name: newUserBase.name },
          })
        );
      } catch {}
      // Supabase への登録記録（環境変数が設定されている場合のみ）
      try {
        if (supabase) {
          await supabase.from('registrations').insert({
            user_id: newUserBase.id,
            email: newUserBase.email,
            name: newUserBase.name,
            created_at: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.warn('Failed to log registration to Supabase', e);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, awardPoints }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}