// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    UPLOAD_PHOTO: '/users/upload-photo',
  },
  LESSONS: {
    LIST: '/lessons',
    GET: '/lessons/:id',
    SEARCH: '/lessons/search',
  },
  VOCABULARY: {
    LIST: '/vocabulary',
    SEARCH: '/vocabulary/search',
    FAVORITE: '/vocabulary/favorite',
  },
  QUIZZES: {
    LIST: '/quizzes',
    GET: '/quizzes/:id',
    SUBMIT: '/quizzes/:id/submit',
  },
  VIDEOS: {
    LIST: '/videos',
    GET: '/videos/:id',
  },
  PAYMENTS: {
    CREATE: '/payments/create',
    VERIFY: '/payments/verify',
    VALIDATE_VIP_CODE: '/payments/validate-code',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  THEME: 'theme_mode',
  LANGUAGE: 'language',
  FAVORITES: 'favorites',
  PROGRESS: 'progress',
};

// Firebase Collections
export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  LESSONS: 'lessons',
  VOCABULARY: 'vocabulary',
  QUIZZES: 'quizzes',
  QUIZ_RESULTS: 'quiz_results',
  VIDEOS: 'videos',
  PAYMENTS: 'payments',
  VIP_SUBSCRIPTIONS: 'vip_subscriptions',
  PROGRESS: 'progress',
};

// App Config
export const APP_CONFIG = {
  NAME: 'Français pour Tous Pro',
  VERSION: '1.0.0',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  TIMEOUT: 30000, // 30 seconds
};

// Quiz Config
export const QUIZ_CONFIG = {
  TIME_LIMIT: 60, // minutes
  PASSING_SCORE: 70, // percentage
  QUESTION_TYPES: ['multiple-choice', 'true-false', 'fill-blank', 'matching'],
};

// VIP Plans
export const VIP_PLANS = {
  MONTHLY: {
    id: 'monthly',
    name: 'Premium Mensuel',
    price: 29900, // in Ariary
    duration: 30, // days
  },
  YEARLY: {
    id: 'yearly',
    name: 'Premium Annuel',
    price: 299000, // in Ariary
    duration: 365, // days
  },
};

// Language Codes
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
  MG: 'mg',
};

// Difficulty Levels
export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Payment Methods
export const PAYMENT_METHODS = {
  MVOLA: 'mvola',
  ORANGE_MONEY: 'orange-money',
  AIRTEL_MONEY: 'airtel-money',
};
