import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { DrawerMenu } from '@components/DrawerMenu';
import { useAuth } from '@hooks/useAuth';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast.success('Connexion réussie!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('Connecté avec Google!');
      navigate('/');
    } catch (error) {
      toast.error('Erreur lors de la connexion Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <h1>Français pour Tous Pro</h1>
          <p>Apprenez le français facilement et rapidement</p>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {t('auth.login')}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {t('auth.loginWithGoogle')}
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            onClick={() => navigate('/register')}
          >
            {t('auth.dontHaveAccount')}
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};
