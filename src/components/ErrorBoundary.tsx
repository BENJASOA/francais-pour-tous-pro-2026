import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeStore } from '@store/themeStore';

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error, onRetry }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            backgroundColor: isDarkMode ? 'rgba(244, 67, 54, 0.1)' : 'rgba(244, 67, 54, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(244, 67, 54, 0.2)',
            p: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'error.main' }}>
            ⚠️ Une erreur s'est produite
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {error || 'Une erreur inattendue s\'est produite.'}
          </Typography>
          {onRetry && (
            <Button variant="contained" color="primary" onClick={onRetry}>
              Réessayer
            </Button>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};
