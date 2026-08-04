import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { useContent } from '@hooks/useContent';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { useAuth } from '@hooks/useAuth';
import { PaymentService } from '@services/paymentService';
import { Video } from '@types/index';
import toast from 'react-hot-toast';

export const VideosPage: React.FC = () => {
  const { videos, isLoading, loadVideos } = useContent();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [openVIPDialog, setOpenVIPDialog] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  if (isLoading && !videos.length) {
    return <LoadingScreen />;
  }

  const handleWatchVideo = (video: Video) => {
    if (video.isPremium && !user?.isVIP) {
      setOpenVIPDialog(true);
      return;
    }
    setSelectedVideo(video);
  };

  const handleDownload = async (video: Video) => {
    if (video.isPremium && !user?.isVIP) {
      toast.error('Passez à Premium pour télécharger');
      setOpenVIPDialog(true);
      return;
    }
    toast.success('Téléchargement commencé...');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={t('videos.title')} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="lg" sx={{ pb: 12, pt: 2 }}>
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {video.thumbnail && (
                  <Box
                    component="img"
                    src={video.thumbnail}
                    alt={video.title}
                    sx={{ height: 200, objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {video.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ fontSize: '0.85rem', p: 0.5, bgcolor: 'primary.light', borderRadius: 1 }}>
                      {video.level}
                    </Box>
                    <Box sx={{ fontSize: '0.85rem', p: 0.5, bgcolor: 'secondary.light', borderRadius: 1 }}>
                      {video.duration} min
                    </Box>
                    {video.isPremium && (
                      <Box sx={{ fontSize: '0.85rem', p: 0.5, bgcolor: 'warning.light', borderRadius: 1 }}>
                        Premium
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => handleWatchVideo(video)}
                    >
                      {t('videos.play')}
                    </Button>
                    {video.downloadable && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDownload(video)}
                      >
                        ⬇️
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onClose={() => setSelectedVideo(null)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedVideo?.title}</DialogTitle>
        <DialogContent>
          <Box
            component="iframe"
            src={selectedVideo?.url}
            width="100%"
            height={400}
            frameBorder="0"
            allowFullScreen
            sx={{ mt: 2 }}
          />
        </DialogContent>
      </Dialog>

      {/* VIP Dialog */}
      <Dialog open={openVIPDialog} onClose={() => setOpenVIPDialog(false)}>
        <DialogTitle>Devenir Premium</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Cette vidéo est disponible uniquement pour les membres Premium.
          </Typography>
          <Button variant="contained" fullWidth>
            S'abonner maintenant
          </Button>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </motion.div>
  );
};
