export interface User {
  id: string;
  email: string;
  name: string;
  grade: string;
  targetSchools: string[];
  subjects: string[];
  rank: UserRank;
  points: number;
  // プレミアム機能廃止に伴いフラグ削除
  avatar?: string;
  createdAt: Date;
}

export interface UserRank {
  level: 'beginner' | 'learner' | 'dedicated' | 'master' | 'expert';
  name: string;
  color: string;
  minPoints: number;
}

export interface Material {
  id: string;
  userId: string;
  user: User;
  title: string;
  author: string;
  publisher: string;
  price: number;
  isbn?: string;
  subject: string;
  subCategory: string;
  targetLevel: string;
  materialType: string;
  images: string[];
  
  // 使用実績
  usagePeriod: {
    startDate: Date;
    endDate: Date;
  };
  totalStudyHours: number;
  pagesStudied: number;
  completionRate: number;
  
  // 成果データ
  performanceData: {
    beforeScore: number;
    afterScore: number;
    beforeDeviation: number;
    afterDeviation: number;
  };
  
  // 評価
  ratings: {
    understanding: number;
    quality: number;
    value: number;
    recommendation: number;
  };
  
  review: string;
  pros: string[];
  cons: string[];
  tips: string;
  recommendedFor: string;
  tags: string[];
  
  likes: number;
  comments: Comment[];
  verified: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  materialId?: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  subject: string;
  notes?: string;
}