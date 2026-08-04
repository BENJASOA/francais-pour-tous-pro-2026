// User Types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  country?: string;
  isVIP: boolean;
  vipExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication Types
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  duration: number; // in minutes
  category: string;
  imageURL?: string;
  content: string;
  isPremium: boolean;
  videoURL?: string;
  downloadable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Vocabulary Types
export interface Vocabulary {
  id: string;
  french: string;
  malagasy: string;
  english?: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  examples: string[];
  audioURL?: string;
  imageURL?: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  questions: QuizQuestion[];
  duration?: number; // in minutes
  passingScore: number; // percentage
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Video Types
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration: number; // in minutes
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: string;
  views: number;
  likes: number;
  isPremium: boolean;
  downloadable: boolean;
  subtitles?: {
    language: string;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number; // in Ariary
  currency: string;
  method: 'mvola' | 'orange-money' | 'airtel-money';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// VIP Subscription Types
export interface VIPSubscription {
  id: string;
  userId: string;
  plan: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  startDate: Date;
  endDate: Date;
  renewalDate?: Date;
  autoRenew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User Progress Types
export interface LessonProgress {
  userId: string;
  lessonId: string;
  progress: number; // percentage
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export interface QuizResult {
  userId: string;
  quizId: string;
  score: number; // percentage
  answers: Record<string, string>;
  passed: boolean;
  timeSpent: number; // in seconds
  completedAt: Date;
}

// UI State Types
export interface UIState {
  isDrawerOpen: boolean;
  selectedBottomNav: string;
  isDarkMode: boolean;
  language: 'fr' | 'en' | 'mg';
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
