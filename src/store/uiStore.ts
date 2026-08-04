import create from 'zustand';

interface UIStore {
  isDrawerOpen: boolean;
  selectedBottomNav: string;
  isOnline: boolean;
  toggleDrawer: () => void;
  setSelectedBottomNav: (nav: string) => void;
  setOnline: (online: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDrawerOpen: false,
  selectedBottomNav: 'home',
  isOnline: true,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setSelectedBottomNav: (selectedBottomNav) => set({ selectedBottomNav }),
  setOnline: (isOnline) => set({ isOnline }),
}));
