import { useCallback } from 'react';
import { useUIStore } from '@store/uiStore';

export const useUI = () => {
  const {
    isDrawerOpen,
    selectedBottomNav,
    toggleDrawer,
    setSelectedBottomNav,
  } = useUIStore();

  const openDrawer = useCallback(() => {
    useUIStore.setState({ isDrawerOpen: true });
  }, []);

  const closeDrawer = useCallback(() => {
    useUIStore.setState({ isDrawerOpen: false });
  }, []);

  return {
    isDrawerOpen,
    selectedBottomNav,
    toggleDrawer,
    setSelectedBottomNav,
    openDrawer,
    closeDrawer,
  };
};
