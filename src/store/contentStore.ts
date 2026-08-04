import create from 'zustand';
import { Lesson, Vocabulary, Grammar, Conjugation, Quiz, Video, Audio, PDF } from '@types/index';

interface ContentStore {
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  conjugation: Conjugation[];
  quizzes: Quiz[];
  videos: Video[];
  audios: Audio[];
  pdfs: PDF[];
  isLoading: boolean;
  
  setLessons: (lessons: Lesson[]) => void;
  setVocabulary: (vocabulary: Vocabulary[]) => void;
  setGrammar: (grammar: Grammar[]) => void;
  setConjugation: (conjugation: Conjugation[]) => void;
  setQuizzes: (quizzes: Quiz[]) => void;
  setVideos: (videos: Video[]) => void;
  setAudios: (audios: Audio[]) => void;
  setPDFs: (pdfs: PDF[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  lessons: [],
  vocabulary: [],
  grammar: [],
  conjugation: [],
  quizzes: [],
  videos: [],
  audios: [],
  pdfs: [],
  isLoading: false,
  
  setLessons: (lessons) => set({ lessons }),
  setVocabulary: (vocabulary) => set({ vocabulary }),
  setGrammar: (grammar) => set({ grammar }),
  setConjugation: (conjugation) => set({ conjugation }),
  setQuizzes: (quizzes) => set({ quizzes }),
  setVideos: (videos) => set({ videos }),
  setAudios: (audios) => set({ audios }),
  setPDFs: (pdfs) => set({ pdfs }),
  setLoading: (isLoading) => set({ isLoading }),
}));
