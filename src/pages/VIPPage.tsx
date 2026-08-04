import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { TopBar } from '@components/TopBar';
import { BottomNav } from '@components/BottomNav';
import { DrawerMenu } from '@components/DrawerMenu';
import { LoadingScreen } from '@components/LoadingScreen';
import { useAuth } from '@hooks/useAuth';
import { useUIStore } from '@store/uiStore';
import { useTranslation } from '@hooks/useTranslation';
import { useThemeStore } from '@store/themeStore';
import { PaymentService } from '@services/paymentService';
import toast from 'react-hot-toast';

interface VIPPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export const VIPPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { isDrawerOpen, toggleDrawer } = useUIStore();
  const { t } = useTranslation();
  const { isDarkMode } = useThemeStore();
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [vipCode, setVipCode] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<VIPPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mvola' | 'orange-money' | 'airtel-money'>('mvola');
  const [processing, setProcessing] = useState(false);

  const plans: VIPPlan[] = [
    {
      id: 'monthly',
      name: 'Premium Mensuel',
      price: 29900,
      duration: '1 mois',
      features: [
        'Accès illimité aux leçons',
        'Pas de publicités',
        'Téléchargement de contenu',
        'Support prioritaire',
      ],
    },
    {
      id: 'yearly',
      name: 'Premium Annuel',
      price: 299000,
      duration: '1 an',
      features: [
        'Accès illimité aux leçons',
        'Pas de publicités',
        'Téléchargement de contenu',
        'Support prioritaire',
        'Contenu exclusif',
      ],
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleValidateVIPCode = async () => {
    if (!vipCode) {
      toast.error('Veuillez entrer un code');
      return;
    }
    try {
      setProcessing(true);
      const result = await PaymentService.validateVIPCode(vipCode, user?.id || '');
      if (result) {
        toast.success('Code valide! Votre abonnement Premium est activé.');
        setVipCode('');
      } else {
        toast.error('Code invalide ou expiré');
      }
    } catch (error) {
      toast.error('Erreur lors de la validation du code');
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber || !selectedPlan) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      setProcessing(true);
      await PaymentService.createPayment(
        user?.id || '',
        selectedPlan.price,
        paymentMethod,
        phoneNumber
      );
      toast.success('Paiement initié! Vérifiez votre téléphone.');
      setOpenPaymentDialog(false);
    } catch (error) {
      toast.error('Erreur lors du paiement');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <TopBar title={t('vip.title')} onMenuClick={toggleDrawer} />
      <DrawerMenu open={isDrawerOpen} onClose={toggleDrawer} />

      <Container maxWidth="lg" sx={{ pb: 12, pt: 2 }}>
        {/* VIP Code Section */}
        <Card
          sx={{
            mb: 4,
            background: isDarkMode
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Avez-vous un code VIP?
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                value={vipCode}
                onChange={(e) => setVipCode(e.target.value.toUpperCase())}
                placeholder="Entrez votre code VIP"
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                    '&:hover fieldset': { borderColor: 'white' },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleValidateVIPCode}
                disabled={processing}
                sx={{ backgroundColor: 'white', color: '#667eea' }}
              >
                Valider
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Plans */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Choisissez votre plan
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}>
          {plans.map((plan) => (
            <Card
              key={plan.id}
              sx={{
                border: selectedPlan?.id === plan.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {plan.name}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                  {(plan.price / 1000).toFixed(0)}k MGA
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {plan.duration}
                </Typography>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} variant="body2">
                      ✓ {feature}
                    </Typography>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant={selectedPlan?.id === plan.id ? 'contained' : 'outlined'}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setOpenPaymentDialog(true);
                  }}
                >
                  S'abonner
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Effectuer un paiement</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="032 XX XX XX XX"
            />
            <TextField
              select
              fullWidth
              label="Méthode de paiement"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="mvola">MVola</option>
              <option value="orange-money">Orange Money</option>
              <option value="airtel-money">Airtel Money</option>
            </TextField>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Montant: {selectedPlan && (selectedPlan.price / 1000).toFixed(0)}k MGA
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? 'Traitement...' : 'Payer maintenant'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </motion.div>
  );
};
