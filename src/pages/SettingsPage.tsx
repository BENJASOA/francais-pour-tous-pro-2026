import React, { useState, useEffect } from 'react';
import { Box, Container, Tabs, Tab, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { useThemeStore } from '@store/themeStore';
import { useAuth } from '@hooks/useAuth';

export const SettingsPage: React.FC = () => {
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode, language, setLanguage } = useThemeStore();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleLanguageChange = (lang: 'fr' | 'en' | 'mg') => {
    setLanguage(lang);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={t('common.settings')} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="sm" sx={{ pb: 12, pt: 2 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 3 }}>
          <Tab label="Apparence" />
          <Tab label="Langue" />
          <Tab label="Notifications" />
          <Tab label="À propos" />
        </Tabs>

        {/* Appearance Tab */}
        {tabValue === 0 && (
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Mode sombre
                </Typography>
                <Button
                  fullWidth
                  variant={isDarkMode ? 'contained' : 'outlined'}
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? '🌙 Mode sombre activé' : '☀️ Activer le mode sombre'}
                </Button>
              </CardContent>
            </Card>
          </Stack>
        )}

        {/* Language Tab */}
        {tabValue === 1 && (
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Langue de l'application
                </Typography>
                <Stack spacing={1}>
                  <Button
                    fullWidth
                    variant={language === 'fr' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('fr')}
                  >
                    🇫🇷 Français
                  </Button>
                  <Button
                    fullWidth
                    variant={language === 'en' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('en')}
                  >
                    🇬🇧 English
                  </Button>
                  <Button
                    fullWidth
                    variant={language === 'mg' ? 'contained' : 'outlined'}
                    onClick={() => handleLanguageChange('mg')}
                  >
                    🇲🇬 Malagasy
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        )}

        {/* Notifications Tab */}
        {tabValue === 2 && (
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Préférences de notification
                </Typography>
                <Stack spacing={2}>
                  <Button fullWidth variant="outlined">
                    🔔 Notifications push - Activées
                  </Button>
                  <Button fullWidth variant="outlined">
                    📧 Notifications email - Activées
                  </Button>
                  <Button fullWidth variant="outlined">
                    📱 Mode hors ligne - Désactivé
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        )}

        {/* About Tab */}
        {tabValue === 3 && (
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  À propos
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Version
                  </Typography>
                  <Typography variant="body1">1.0.0</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Développeur
                  </Typography>
                  <Typography variant="body1">BENJASOA</Typography>
                </Box>
                <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
                  📋 Politique de confidentialité
                </Button>
                <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
                  📄 Conditions d'utilisation
                </Button>
                <Button fullWidth variant="outlined">
                  💬 Nous contacter
                </Button>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Container>

      <BottomNav />
    </motion.div>
  );
};
