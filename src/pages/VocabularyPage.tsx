import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, TextField, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { VocabularyCard } from '@components/VocabularyCard';
import { LoadingScreen } from '@components/LoadingScreen';
import { useContent } from '@hooks/useContent';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { Vocabulary } from '@types/index';

export const VocabularyPage: React.FC = () => {
  const { vocabulary, isLoading, loadVocabulary } = useContent();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  useEffect(() => {
    loadVocabulary(search);
  }, [search]);

  const filteredVocabulary = vocabulary.filter(
    (v) => !selectedLevel || v.level === selectedLevel
  );

  const handleFavorite = (word: Vocabulary) => {
    setFavorites((prev) =>
      prev.includes(word.id) ? prev.filter((id) => id !== word.id) : [...prev, word.id]
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={t('common.vocabulary')} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="lg" sx={{ pb: 12, pt: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder={t('vocabulary.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{ mb: 3 }}
        />

        {/* Level Filter */}
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="Tous"
            onClick={() => setSelectedLevel(null)}
            variant={selectedLevel === null ? 'filled' : 'outlined'}
          />
          {levels.map((level) => (
            <Chip
              key={level}
              label={level}
              onClick={() => setSelectedLevel(level)}
              variant={selectedLevel === level ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        {/* Vocabulary Grid */}
        <Grid container spacing={2}>
          {filteredVocabulary.map((word) => (
            <Grid item xs={12} sm={6} md={4} key={word.id}>
              <VocabularyCard
                word={word}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(word.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <BottomNav />
    </motion.div>
  );
};
