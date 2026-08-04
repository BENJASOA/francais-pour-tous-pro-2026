import { auth } from '@config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
} from 'firebase/auth';
import { db, storage } from '@config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { User } from '@types/index';

const googleProvider = new GoogleAuthProvider();

export class AuthService {
  // Register with email and password
  static async registerWithEmail(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(result.user, {
        displayName,
      });

      const userData: User = {
        id: result.user.uid,
        email: result.user.email || '',
        displayName,
        language: 'fr',
        isVIP: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', result.user.uid), userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  // Login with email and password
  static async loginWithEmail(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      return userDoc.data() as User;
    } catch (error) {
      throw error;
    }
  }

  // Login with Google
  static async loginWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      let userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        const userData: User = {
          id: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || undefined,
          language: 'fr',
          isVIP: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await setDoc(doc(db, 'users', result.user.uid), userData);
        userDoc = await getDoc(doc(db, 'users', result.user.uid));
      }

      return userDoc.data() as User;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  // Send password reset email
  static async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          resolve(userDoc.data() as User || null);
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
  }

  // Update user profile
  static async updateUserProfile(
    userId: string,
    data: Partial<User>
  ): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  // Upload user photo
  static async uploadUserPhoto(userId: string, file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `users/${userId}/profile.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      throw error;
    }
  }
}
