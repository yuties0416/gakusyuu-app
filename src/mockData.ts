import { Material, User } from './types';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'tanaka@example.com',
    name: '田中太郎',
    grade: '高校3年',
    targetSchools: ['東京大学', '早稲田大学'],
    subjects: ['数学', '英語'],
    rank: { level: 'dedicated', name: '努力家', color: '#8B5CF6', minPoints: 501 },
    points: 750,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'sato@example.com',
    name: '佐藤花子',
    grade: '高校2年',
    targetSchools: ['京都大学'],
    subjects: ['英語', '国語'],
    rank: { level: 'learner', name: '学習者', color: '#3B82F6', minPoints: 101 },
    points: 320,
    createdAt: new Date('2024-02-01'),
  },
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    title: 'チャート式基礎からの数学I+A',
    author: '黄チャート編集部',
    publisher: '数研出版',
    price: 2090,
    isbn: '978-4410105123',
    subject: '数学',
    subCategory: '数学I・A',
    targetLevel: '基礎～標準',
    materialType: '参考書',
    images: ['https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg'],
    
    usagePeriod: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-05-31'),
    },
    totalStudyHours: 120,
    pagesStudied: 800,
    completionRate: 85,
    
    performanceData: {
      beforeScore: 45,
      afterScore: 72,
      beforeDeviation: 48.5,
      afterDeviation: 58.2,
    },
    
    ratings: {
      understanding: 5,
      quality: 4,
      value: 5,
      recommendation: 5,
    },
    
    review: '基礎から応用まで段階的に学習できる良書。解説が丁寧で独学でも理解しやすい。特に二次関数の分野は図解が豊富で視覚的に理解できた。定期テストの成績が大幅に向上し、模試でも安定して高得点を取れるようになった。',
    pros: ['解説が丁寧', '例題が豊富', '基礎から応用まで体系的'],
    cons: ['ページ数が多い', '持ち運びに不便'],
    tips: '毎日30分ずつコツコツ進める。分からない問題は解説を読み返し、類似問題を繰り返し解く。',
    recommendedFor: '数学が苦手で基礎から固めたい人、独学で受験勉強を進めたい人',
    tags: ['基礎固め', 'コツコツ型', '独学向け', '定期テスト対策'],
    
    likes: 24,
    comments: [],
    verified: true,
    createdAt: new Date('2024-06-15'),
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    title: 'システム英単語',
    author: '刀祢雅彦',
    publisher: '駿台文庫',
    price: 1100,
    subject: '英語',
    subCategory: '英単語',
    targetLevel: '標準～難関',
    materialType: '単語帳',
    images: ['https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg'],
    
    usagePeriod: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-08-31'),
    },
    totalStudyHours: 95,
    pagesStudied: 400,
    completionRate: 90,
    
    performanceData: {
      beforeScore: 55,
      afterScore: 78,
      beforeDeviation: 52.1,
      afterDeviation: 61.8,
    },
    
    ratings: {
      understanding: 4,
      quality: 5,
      value: 4,
      recommendation: 5,
    },
    
    review: '入試頻出単語が効率よく覚えられる。ミニマルフレーズが記憶に残りやすく、長文読解力も自然と向上した。CDの音声も聞きやすく、通学時間を有効活用できた。',
    pros: ['頻出度順の構成', 'ミニマルフレーズが効果的', 'CD音声が聞きやすい'],
    cons: ['単語数が多く最初は圧倒される', '派生語の掲載が少ない'],
    tips: '1日100単語を目安に高速回転。音声を活用してリスニング対策も兼ねる。',
    recommendedFor: '効率的に単語力を向上させたい人、音声学習を活用したい人',
    tags: ['単語帳', '高速回転', 'CD付き', '通学時間'],
    
    likes: 18,
    comments: [],
    verified: false,
    createdAt: new Date('2024-09-01'),
  },
  {
    id: '3',
    userId: '1',
    user: mockUsers[0],
    title: '現代文読解力の開発講座',
    author: '霜栄',
    publisher: '駿台文庫',
    price: 1045,
    subject: '国語',
    subCategory: '現代文',
    targetLevel: '標準～応用',
    materialType: '問題集',
    images: ['https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg'],
    
    usagePeriod: {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-07-31'),
    },
    totalStudyHours: 80,
    pagesStudied: 200,
    completionRate: 75,
    
    performanceData: {
      beforeScore: 38,
      afterScore: 65,
      beforeDeviation: 45.2,
      afterDeviation: 56.8,
    },
    
    ratings: {
      understanding: 3,
      quality: 5,
      value: 4,
      recommendation: 4,
    },
    
    review: '現代文の論理的読解方法を体系的に学べる。最初は難しく感じたが、解法を身につけると安定して得点できるようになった。特に評論文の読み方が劇的に改善された。',
    pros: ['論理的解法', '質の高い問題', '詳細な解説'],
    cons: ['最初は理解が困難', '問題数が少ない'],
    tips: '解法パターンを完全に覚えるまで繰り返し学習。時間をかけて丁寧に取り組む。',
    recommendedFor: '現代文で安定した得点が欲しい人、論理的思考力を鍛えたい人',
    tags: ['論理的読解', '評論文', '解法パターン', '質重視'],
    
    likes: 31,
    comments: [],
    verified: true,
    createdAt: new Date('2024-08-15'),
  },
];