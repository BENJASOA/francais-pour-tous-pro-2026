import React from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Vocabulary } from '@types/index';
import { VolumeUp as VolumeIcon } from '@mui/icons-material';

interface VocabularyCardProps {
  word: Vocabulary;
  onFavorite?: (word: Vocabulary) => void;
  isFavorite?: boolean;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  word,
  onFavorite,
  isFavorite = false,
}) => {
  const playPronunciation = () => {
    if (word.audioURL) {
      const audio = new Audio(word.audioURL);
      audio.play();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {word.french}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {word.malagasy}
              </Typography>
            </Box>
            {word.audioURL && (
              <Button
                variant="contained"
                size="small"
                onClick={playPronunciation}
                sx={{ minWidth: 'auto' }}
              >
                <VolumeIcon fontSize="small" />
              </Button>
            )}
          </Box>

          {word.examples.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Exemples:
              </Typography>
              {word.examples.map((example, index) => (
                <Typography key={index} variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                  • {example}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip label={word.category} size="small" />
            {onFavorite && (
              <Button
                variant={isFavorite ? 'contained' : 'outlined'}
                size="small"
                onClick={() => onFavorite(word)}
              >
                {isFavorite ? '❤️ Favori' : '🤍 Ajouter'}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
