import { useCallback, useState, useEffect } from 'react';
import { useThemeStore } from '@store/themeStore';

const translations = {
  fr: {
    common: {
      home: 'Accueil',
      vocabulary: 'Vocabulaire',
      grammar: 'Grammaire',
      conjugation: 'Conjugaison',
      quiz: 'Quiz',
      search: 'Rechercher...',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      profile: 'Profil',
    },
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      loginWithGoogle: 'Connexion avec Google',
      dontHaveAccount: 'Pas encore de compte? S\'inscrire',
      alreadyHaveAccount: 'Déjà inscrit? Se connecter',
    },
    home: {
      continueLearning: 'Continuer l\'apprentissage',
      premiumBanner: 'Devenir Premium',
      dailyLesson: 'Leçon du jour',
      recentLessons: 'Leçons récentes',
    },
    vocabulary: {
      search: 'Chercher un mot...',
    },
    videos: {
      title: 'Vidéos',
      play: 'Regarder',
    },
    quiz: {
      results: 'Résultats du quiz',
    },
    vip: {
      title: 'VIP',
    },
    pdfs: {
      title: 'Documents PDF',
    },
    admin: {
      title: 'Admin',
    },
  },
  en: {
    common: {
      home: 'Home',
      vocabulary: 'Vocabulary',
      grammar: 'Grammar',
      conjugation: 'Conjugation',
      quiz: 'Quiz',
      search: 'Search...',
      settings: 'Settings',
      logout: 'Logout',
      profile: 'Profile',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginWithGoogle: 'Login with Google',
      dontHaveAccount: 'Don\'t have an account? Sign up',
      alreadyHaveAccount: 'Already have an account? Sign in',
    },
    home: {
      continueLearning: 'Continue Learning',
      premiumBanner: 'Go Premium',
      dailyLesson: 'Daily Lesson',
      recentLessons: 'Recent Lessons',
    },
    vocabulary: {
      search: 'Search a word...',
    },
    videos: {
      title: 'Videos',
      play: 'Watch',
    },
    quiz: {
      results: 'Quiz Results',
    },
    vip: {
      title: 'VIP',
    },
    pdfs: {
      title: 'PDF Documents',
    },
    admin: {
      title: 'Admin',
    },
  },
  mg: {
    common: {
      home: 'Laharana',
      vocabulary: 'Teny',
      grammar: 'Firaketana Teny',
      conjugation: 'Fizarana Asina',
      quiz: 'Fitsapana',
      search: 'Hahanaha...',
      settings: 'Safidy',
      logout: 'Fialan-tsamina',
      profile: 'Profil',
    },
    auth: {
      login: 'Hiditra',
      register: 'Misoloky',
      email: 'Email',
      password: 'Tenimiafina',
      confirmPassword: 'Jamba ny tenimiafina',
      loginWithGoogle: 'Hiditra amin\'i Google',
      dontHaveAccount: 'Tsy manana kaonty? Misoloky',
      alreadyHaveAccount: 'Manana kaonty? Hiditra',
    },
    home: {
      continueLearning: 'Itondra ny fianatra',
      premiumBanner: 'Ho Premium',
      dailyLesson: 'Fanomezam-pianarana isan-andro',
      recentLessons: 'Fanomezam-pianarana vao lasa',
    },
    vocabulary: {
      search: 'Hahanaha ny teny...',
    },
    videos: {
      title: 'Horonan-tsary',
      play: 'Hijery',
    },
    quiz: {
      results: 'Fitsapan-kahitakitahan\'ny Fitsapana',
    },
    vip: {
      title: 'VIP',
    },
    pdfs: {
      title: 'Taratasy PDF',
    },
    admin: {
      title: 'Mpandroso',
    },
  },
};

type TranslationKey = string;
type TranslationValue = string | Record<string, any>;

const getNestedTranslation = (
  obj: Record<string, TranslationValue>,
  path: string
): string => {
  const keys = path.split('.');
  let result: any = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the key path if translation not found
    }
  }

  return typeof result === 'string' ? result : path;
};

export const useTranslation = () => {
  const { language } = useThemeStore();
  const [currentLang, setCurrentLang] = useState<'fr' | 'en' | 'mg'>(
    language as 'fr' | 'en' | 'mg'
  );

  useEffect(() => {
    setCurrentLang(language as 'fr' | 'en' | 'mg');
  }, [language]);

  const t = useCallback(
    (key: string): string => {
      const langTranslations = translations[currentLang];
      return getNestedTranslation(langTranslations as Record<string, TranslationValue>, key);
    },
    [currentLang]
  );

  return { t, language: currentLang };
};
