import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@store/themeStore';
import { useAuth } from '@hooks/useAuth';
import { LoadingScreen } from '@components/LoadingScreen';
import { colors, darkColors } from '@constants/theme';

// Pages
import { LoginPage } from '@pages/LoginPage';
import { RegisterPage } from '@pages/RegisterPage';
import { HomePage } from '@pages/HomePage';
import { VocabularyPage } from '@pages/VocabularyPage';
import { QuizPage } from '@pages/QuizPage';
import { VideosPage } from '@pages/VideosPage';
import { VIPPage } from '@pages/VIPPage';
import { ProfilePage } from '@pages/ProfilePage';
import { SettingsPage } from '@pages/SettingsPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  isLoading,
}) => {
  if (isLoading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated, isLoading } = useAuth();

  // Create theme
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? colors.primary : colors.primary,
      },
      secondary: {
        main: isDarkMode ? darkColors.secondary : colors.secondary,
      },
      background: {
        default: isDarkMode ? darkColors.background : colors.background,
        paper: isDarkMode ? darkColors.surface : colors.surface,
      },
      text: {
        primary: isDarkMode ? darkColors.dark : colors.dark,
        secondary: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, fontSize: '2.5rem' },
      h2: { fontWeight: 700, fontSize: '2rem' },
      h3: { fontWeight: 700, fontSize: '1.75rem' },
      h4: { fontWeight: 700, fontSize: '1.5rem' },
      h5: { fontWeight: 700, fontSize: '1.25rem' },
      h6: { fontWeight: 700, fontSize: '1rem' },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDarkMode
              ? '0 2px 8px rgba(0,0,0,0.3)'
              : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: isDarkMode
              ? '0 2px 8px rgba(0,0,0,0.4)'
              : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: '100vh',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vocabulary"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <VocabularyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/videos"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <VideosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vip"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <VIPPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
            },
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
