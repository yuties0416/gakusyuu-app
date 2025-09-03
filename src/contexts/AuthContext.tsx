import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  loading: boolean;
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

  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email,
      name: '田中太郎',
      grade: '高校3年',
      targetSchools: ['東京大学', '早稲田大学'],
      subjects: ['数学', '英語', '国語'],
      points: 750,
      rank: getRankFromPoints(750),
      isPremium: false,
      createdAt: new Date(),
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      grade: userData.grade!,
      targetSchools: userData.targetSchools || [],
      subjects: userData.subjects || [],
      points: 0,
      rank: getRankFromPoints(0),
      isPremium: false,
      createdAt: new Date(),
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
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