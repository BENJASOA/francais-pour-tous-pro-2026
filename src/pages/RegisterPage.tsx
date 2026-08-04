import React, { useState } from 'react';
import { Box, Container, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !displayName) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      await register(email, password, displayName);
      toast.success('Inscription réussie!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <h1>{t('auth.register')}</h1>
        </Box>

        <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            type="text"
            label="Nom complet"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            type="email"
            label={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label={t('auth.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {t('auth.register')}
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            onClick={() => navigate('/login')}
          >
            {t('auth.alreadyHaveAccount')}
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};
