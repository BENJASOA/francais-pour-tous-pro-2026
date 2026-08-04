import { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { AuthService } from '@services/authService';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setAuthenticated, setLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setAuthenticated(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth check failed');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.loginWithEmail(email, password);
      setUser(user);
      setAuthenticated(true);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.registerWithEmail(email, password, displayName);
      setUser(user);
      setAuthenticated(true);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await AuthService.loginWithGoogle();
      setUser(user);
      setAuthenticated(true);
      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      setAuthenticated(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await AuthService.sendPasswordReset(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      throw err;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
  };
};
