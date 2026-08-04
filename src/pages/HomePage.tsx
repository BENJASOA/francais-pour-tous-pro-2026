import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { LessonCard } from '@components/LessonCard';
import { LoadingScreen } from '@components/LoadingScreen';
import { useAuth } from '@hooks/useAuth';
import { useContent } from '@hooks/useContent';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { Lesson } from '@types/index';

export const HomePage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { lessons, isLoading, loadLessons } = useContent();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dailyQuote] = useState('La vie est une belle aventure!');

  useEffect(() => {
    loadLessons();
  }, []);

  if (authLoading || isLoading) {
    return <LoadingScreen />;
  }

  const handleLessonClick = (lesson: Lesson) => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title="Français pour Tous Pro" onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="lg" sx={{ pb: 12, pt: 2 }}>
        {/* Welcome Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            p: 3,
            mb: 3,
            color: 'white',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Bienvenue {user?.displayName}! 👋
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            "{dailyQuote}"
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: '#667eea' }}>
              {t('home.continueLearning')}
            </Button>
            <Button variant="outlined" sx={{ borderColor: 'white', color: 'white' }}>
              {t('home.premiumBanner')}
            </Button>
          </Box>
        </Box>

        {/* Daily Lesson */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t('home.dailyLesson')}
          </Typography>
          <Grid container spacing={2}>
            {lessons.slice(0, 3).map((lesson) => (
              <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                <LessonCard lesson={lesson} onClick={handleLessonClick} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recent Lessons */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {t('home.recentLessons')}
          </Typography>
          <Grid container spacing={2}>
            {lessons.slice(3, 6).map((lesson) => (
              <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                <LessonCard lesson={lesson} onClick={handleLessonClick} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder={t('common.search')}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Box>
      </Container>

      <BottomNav />
    </motion.div>
  );
};
