// Type definitions
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  country?: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  isVIP: boolean;
  vipExpiresAt?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  content: string;
  imageURL?: string;
  videoURL?: string;
  audioURL?: string;
  duration: number;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vocabulary {
  id: string;
  french: string;
  malagasy: string;
  pronunciation?: string;
  examples: string[];
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  audioURL?: string;
  createdAt: Date;
}

export interface Grammar {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  frenchExplanation: string;
  malagasyExplanation: string;
  examples: string[];
  exercises: Exercise[];
  isPremium: boolean;
  createdAt: Date;
}

export interface Exercise {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'listening' | 'writing';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
}

export interface Conjugation {
  id: string;
  infinitive: string;
  tense: 'Présent' | 'Imparfait' | 'Passé composé' | 'Passé simple' | 'Plus-que-parfait' | 'Futur simple' | 'Futur antérieur' | 'Conditionnel' | 'Subjonctif' | 'Impératif' | 'Participe';
  conjugations: Record<string, string>;
  examples: string[];
  exercises: Exercise[];
  createdAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  difficulty: number;
  timeLimit?: number;
  isPremium: boolean;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'listening' | 'writing';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audioURL?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  isPremium: boolean;
  downloadable: boolean;
  createdAt: Date;
}

export interface Audio {
  id: string;
  title: string;
  url: string;
  duration: number;
  type: 'pronunciation' | 'dialogue' | 'listening-practice';
  transcription?: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface PDF {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'book' | 'grammar' | 'vocabulary' | 'exercises';
  isPremium: boolean;
  size: number;
  createdAt: Date;
}

export interface VIPSubscription {
  id: string;
  userId: string;
  plan: 'monthly' | 'yearly';
  price: number;
  currency: string;
  startDate: Date;
  expiresAt: Date;
  autoRenew: boolean;
  paymentMethod: 'mvola' | 'orange-money' | 'airtel-money';
  status: 'active' | 'expired' | 'cancelled';
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: 'mvola' | 'orange-money' | 'airtel-money';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VIPCode {
  id: string;
  code: string;
  duration: number; // in months
  maxUses: number;
  usedCount: number;
  expiresAt: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  progress: number; // 0-100
  completedAt?: Date;
  lastAccessedAt: Date;
  score?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'lesson' | 'video' | 'subscription' | 'promotion';
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}
