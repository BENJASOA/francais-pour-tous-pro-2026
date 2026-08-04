import { db, storage } from '@config/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, getBytes, getMetadata } from 'firebase/storage';
import { Lesson, Vocabulary, Grammar, Conjugation, Quiz, Video, Audio, PDF } from '@types/index';

export class ContentService {
  // Lessons
  static async getLessons(level?: string): Promise<Lesson[]> {
    try {
      let q;
      if (level) {
        q = query(collection(db, 'lessons'), where('level', '==', level), orderBy('createdAt', 'desc'));
      } else {
        q = query(collection(db, 'lessons'), orderBy('createdAt', 'desc'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Lesson));
    } catch (error) {
      throw error;
    }
  }

  static async getLessonById(id: string): Promise<Lesson> {
    try {
      const snapshot = await getDoc(doc(db, 'lessons', id));
      return { id: snapshot.id, ...snapshot.data() } as Lesson;
    } catch (error) {
      throw error;
    }
  }

  // Vocabulary
  static async getVocabulary(search?: string): Promise<Vocabulary[]> {
    try {
      const q = query(collection(db, 'vocabulary'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      let vocabulary = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Vocabulary));

      if (search) {
        vocabulary = vocabulary.filter(
          (v) =>
            v.french.toLowerCase().includes(search.toLowerCase()) ||
            v.malagasy.toLowerCase().includes(search.toLowerCase())
        );
      }

      return vocabulary;
    } catch (error) {
      throw error;
    }
  }

  // Grammar
  static async getGrammar(level?: string): Promise<Grammar[]> {
    try {
      let q;
      if (level) {
        q = query(collection(db, 'grammar'), where('level', '==', level));
      } else {
        q = query(collection(db, 'grammar'));
      }
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Grammar));
    } catch (error) {
      throw error;
    }
  }

  // Conjugation
  static async getConjugations(search?: string): Promise<Conjugation[]> {
    try {
      const q = query(collection(db, 'conjugation'));
      const snapshot = await getDocs(q);
      let conjugations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Conjugation));

      if (search) {
        conjugations = conjugations.filter((c) =>
          c.infinitive.toLowerCase().includes(search.toLowerCase())
        );
      }

      return conjugations;
    } catch (error) {
      throw error;
    }
  }

  // Quizzes
  static async getQuizzes(): Promise<Quiz[]> {
    try {
      const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Quiz));
    } catch (error) {
      throw error;
    }
  }

  // Videos
  static async getVideos(): Promise<Video[]> {
    try {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Video));
    } catch (error) {
      throw error;
    }
  }

  // Audios
  static async getAudios(): Promise<Audio[]> {
    try {
      const q = query(collection(db, 'audios'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Audio));
    } catch (error) {
      throw error;
    }
  }

  // PDFs
  static async getPDFs(): Promise<PDF[]> {
    try {
      const q = query(collection(db, 'pdfs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as PDF));
    } catch (error) {
      throw error;
    }
  }
}
