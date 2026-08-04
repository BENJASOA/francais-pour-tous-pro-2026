import { useThemeStore } from '@store/themeStore';
import { fr, en } from '@constants/translations';

export const useTranslation = () => {
  const { language } = useThemeStore();

  const t = (key: string, defaultValue?: string): string => {
    const translations = language === 'fr' ? fr : en;
    return (translations as Record<string, string>)[key] || defaultValue || key;
  };

  return { t, language };
};
