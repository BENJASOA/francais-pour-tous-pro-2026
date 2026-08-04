import create from 'zustand';
import { User, VIPSubscription } from '@types/index';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  vipSubscription: VIPSubscription | null;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setVIPSubscription: (subscription: VIPSubscription | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  vipSubscription: null,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  setVIPSubscription: (vipSubscription) => set({ vipSubscription }),
  logout: () => set({ user: null, isAuthenticated: false, vipSubscription: null }),
}));
