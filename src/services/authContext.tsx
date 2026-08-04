import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User as AuthUser } from '@types/index';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Failed to login');
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        displayName,
        isVIP: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Failed to register');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          isVIP: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      throw new Error('Failed to login with Google');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Failed to logout');
    }
  };

  const updateUserProfile = async (updates: Partial<AuthUser>) => {
    if (!auth.currentUser) throw new Error('No user logged in');

    try {
      if (updates.displayName) {
        await updateProfile(auth.currentUser, { displayName: updates.displayName });
      }
      if (updates.photoURL) {
        await updateProfile(auth.currentUser, { photoURL: updates.photoURL });
      }
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
