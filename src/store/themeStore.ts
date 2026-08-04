import create from 'zustand';

interface ThemeStore {
  isDarkMode: boolean;
  language: 'fr' | 'en' | 'mg';
  toggleDarkMode: () => void;
  setLanguage: (language: 'fr' | 'en' | 'mg') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  language: 'fr',
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLanguage: (language) => set({ language }),
}));
