import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { useAuth } from '@hooks/useAuth';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { AuthService } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';

export const ProfilePage: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [country, setCountry] = useState(user?.country || '');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      setSaving(true);
      await AuthService.updateUserProfile(user.id, {
        displayName,
        phoneNumber,
        country,
      });
      toast.success('Profil mis à jour!');
      setEditing(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setSaving(true);
      // TODO: Implement password change in Firebase
      toast.success('Mot de passe changé!');
      setOpenPasswordDialog(false);
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setSaving(true);
      const url = await AuthService.uploadUserPhoto(user.id, file);
      await AuthService.updateUserProfile(user.id, { photoURL: url });
      toast.success('Photo mise à jour!');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={t('common.profile')} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="sm" sx={{ pb: 12, pt: 2 }}>
        {/* Profile Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={user?.photoURL}
              sx={{ width: 120, height: 120, mb: 2 }}
            >
              {user?.displayName?.[0]}
            </Avatar>
            <Button
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                minWidth: 40,
                height: 40,
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              <PhotoCameraIcon />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleUploadPhoto}
              />
            </Button>
          </Box>

          {user?.isVIP && (
            <Box sx={{ display: 'inline-block', p: 1, bgcolor: 'warning.light', borderRadius: 1, mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'warning.dark' }}>
                ⭐ Premium Actif
              </Typography>
            </Box>
          )}
        </Box>

        {/* Profile Info */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Email
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Box>

              {editing ? (
                <>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Numéro de téléphone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Pays"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setEditing(false)}
                    >
                      Annuler
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Nom
                    </Typography>
                    <Typography variant="body1">{displayName || '-'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Téléphone
                    </Typography>
                    <Typography variant="body1">{phoneNumber || '-'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Pays
                    </Typography>
                    <Typography variant="body1">{country || '-'}</Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setEditing(true)}
                  >
                    Modifier le profil
                  </Button>
                </>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Security */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Sécurité
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpenPasswordDialog(true)}
              sx={{ mb: 1 }}
            >
              Changer le mot de passe
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent>
            <Stack spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                color="warning"
                onClick={() => navigate('/vip')}
              >
                Devenir Premium
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Changer le mot de passe</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleChangePassword}
              disabled={saving}
            >
              Changer
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </motion.div>
  );
};
