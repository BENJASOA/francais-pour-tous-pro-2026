import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { useUIStore } from '@store/uiStore';
import { useThemeStore } from '@store/themeStore';

interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title = 'Français pour Tous Pro', onMenuClick }) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: isDarkMode
          ? '0 4px 12px rgba(0,0,0,0.5)'
          : '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
