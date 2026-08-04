import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  Auth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore';
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth: Auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Initialize Storage
const storage: FirebaseStorage = getStorage(app);

// Connect to emulators (only in development)
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    // Emulator already connected
  }
}

export { app, auth, db, storage };
