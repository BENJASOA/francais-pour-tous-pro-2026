import { useEffect, useState } from 'react';
import { useContentStore } from '@store/contentStore';
import { ContentService } from '@services/contentService';
import { Lesson, Vocabulary, Grammar, Conjugation, Quiz, Video, Audio, PDF } from '@types/index';

export const useContent = () => {
  const store = useContentStore();
  const [error, setError] = useState<string | null>(null);

  const loadLessons = async (level?: string) => {
    try {
      store.setLoading(true);
      setError(null);
      const lessons = await ContentService.getLessons(level);
      store.setLessons(lessons);
      return lessons;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load lessons';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadVocabulary = async (search?: string) => {
    try {
      store.setLoading(true);
      setError(null);
      const vocabulary = await ContentService.getVocabulary(search);
      store.setVocabulary(vocabulary);
      return vocabulary;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load vocabulary';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadGrammar = async (level?: string) => {
    try {
      store.setLoading(true);
      setError(null);
      const grammar = await ContentService.getGrammar(level);
      store.setGrammar(grammar);
      return grammar;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load grammar';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadConjugations = async (search?: string) => {
    try {
      store.setLoading(true);
      setError(null);
      const conjugations = await ContentService.getConjugations(search);
      store.setConjugation(conjugations);
      return conjugations;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load conjugations';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadQuizzes = async () => {
    try {
      store.setLoading(true);
      setError(null);
      const quizzes = await ContentService.getQuizzes();
      store.setQuizzes(quizzes);
      return quizzes;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load quizzes';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadVideos = async () => {
    try {
      store.setLoading(true);
      setError(null);
      const videos = await ContentService.getVideos();
      store.setVideos(videos);
      return videos;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load videos';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadAudios = async () => {
    try {
      store.setLoading(true);
      setError(null);
      const audios = await ContentService.getAudios();
      store.setAudios(audios);
      return audios;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load audios';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  const loadPDFs = async () => {
    try {
      store.setLoading(true);
      setError(null);
      const pdfs = await ContentService.getPDFs();
      store.setPDFs(pdfs);
      return pdfs;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load PDFs';
      setError(message);
      throw err;
    } finally {
      store.setLoading(false);
    }
  };

  return {
    ...store,
    error,
    loadLessons,
    loadVocabulary,
    loadGrammar,
    loadConjugations,
    loadQuizzes,
    loadVideos,
    loadAudios,
    loadPDFs,
  };
};
