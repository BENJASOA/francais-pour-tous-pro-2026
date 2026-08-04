import React from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  VideoLibrary as VideoIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedBottomNav, selectedBottomNav } = useUIStore();
  const { t } = useTranslation();

  const routes: { path: string; label: string; icon: React.ReactNode }[] = [
    { path: '/', label: t('common.home'), icon: <HomeIcon /> },
    { path: '/vocabulary', label: t('common.vocabulary'), icon: <SchoolIcon /> },
    { path: '/quiz', label: t('common.quiz'), icon: <QuizIcon /> },
    { path: '/videos', label: t('videos.title'), icon: <VideoIcon /> },
    { path: '/profile', label: t('common.profile'), icon: <ProfileIcon /> },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    const path = routes[newValue].path;
    navigate(path);
    setSelectedBottomNav(path);
  };

  const currentIndex = routes.findIndex((r) => r.path === location.pathname);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentIndex === -1 ? 0 : currentIndex}
        onChange={handleChange}
        sx={{ width: '100%' }}
      >
        {routes.map((route, index) => (
          <BottomNavigationAction
            key={route.path}
            label={route.label}
            icon={route.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
