import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Vocabulary as VocabIcon,
  School as SchoolIcon,
  Quiz as QuizIcon,
  VideoLibrary as VideoIcon,
  PictureAsPdf as PDFIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useUIStore } from '@store/uiStore';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
  const { toggleDrawer } = useUIStore();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { label: t('common.home'), icon: <HomeIcon />, path: '/' },
    { label: t('common.vocabulary'), icon: <VocabIcon />, path: '/vocabulary' },
    { label: t('common.grammar'), icon: <SchoolIcon />, path: '/grammar' },
    { label: t('common.conjugation'), icon: <SchoolIcon />, path: '/conjugation' },
    { label: t('common.quiz'), icon: <QuizIcon />, path: '/quiz' },
    { label: t('videos.title'), icon: <VideoIcon />, path: '/videos' },
    { label: t('pdfs.title'), icon: <PDFIcon />, path: '/pdfs' },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280 }}>
        {/* User Profile Section */}
        {user && (
          <>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={user.photoURL}
                sx={{ width: 56, height: 56 }}
              >
                {user.displayName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {user.displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </>
        )}

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Settings and Logout */}
        <List>
          <ListItem button onClick={() => handleMenuClick('/settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('common.settings')} />
          </ListItem>
          {user?.email === 'admin@example.com' && (
            <ListItem button onClick={() => handleMenuClick('/admin')}>
              <ListItemIcon>
                <AdminIcon />
              </ListItemIcon>
              <ListItemText primary={t('admin.title')} />
            </ListItem>
          )}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('common.logout')} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
