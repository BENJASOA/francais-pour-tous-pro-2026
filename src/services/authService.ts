import { auth, db } from './firebase';
import {
  updateProfile as firebaseUpdateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

class AuthServiceClass {
  async updateUserProfile(
    userId: string,
    updates: Record<string, any>
  ): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }

  async uploadUserPhoto(userId: string, file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `users/${userId}/profile-photo`);
      const result = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(result.ref);
      return url;
    } catch (error) {
      throw new Error('Failed to upload photo');
    }
  }

  async getUserProfile(userId: string) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.data();
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  }
}

export const AuthService = new AuthServiceClass();
