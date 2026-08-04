// Database utilities for offline sync
import Dexie, { Table } from 'dexie';
import { Lesson, Vocabulary, Grammar, Conjugation, Quiz, Video, Audio, PDF } from '@types/index';

export class DatabaseService extends Dexie {
  lessons!: Table<Lesson>;
  vocabulary!: Table<Vocabulary>;
  grammar!: Table<Grammar>;
  conjugation!: Table<Conjugation>;
  quizzes!: Table<Quiz>;
  videos!: Table<Video>;
  audios!: Table<Audio>;
  pdfs!: Table<PDF>;

  constructor() {
    super('FrancaisPourTousDB');
    this.version(1).stores({
      lessons: 'id, category, level',
      vocabulary: 'id, category, level',
      grammar: 'id, level',
      conjugation: 'id, infinitive',
      quizzes: 'id',
      videos: 'id, level',
      audios: 'id, type',
      pdfs: 'id, type',
    });
  }

  // Lesson methods
  async addLessons(lessons: Lesson[]) {
    try {
      await this.lessons.bulkAdd(lessons);
    } catch (error) {
      console.error('Error adding lessons:', error);
    }
  }

  async getLessonsOffline(category?: string): Promise<Lesson[]> {
    try {
      if (category) {
        return await this.lessons.where('category').equals(category).toArray();
      }
      return await this.lessons.toArray();
    } catch (error) {
      console.error('Error getting lessons offline:', error);
      return [];
    }
  }

  // Vocabulary methods
  async addVocabulary(vocabulary: Vocabulary[]) {
    try {
      await this.vocabulary.bulkAdd(vocabulary);
    } catch (error) {
      console.error('Error adding vocabulary:', error);
    }
  }

  async searchVocabularyOffline(search: string): Promise<Vocabulary[]> {
    try {
      return await this.vocabulary
        .filter(
          (v) =>
            v.french.toLowerCase().includes(search.toLowerCase()) ||
            v.malagasy.toLowerCase().includes(search.toLowerCase())
        )
        .toArray();
    } catch (error) {
      console.error('Error searching vocabulary:', error);
      return [];
    }
  }

  // Conjugation methods
  async addConjugations(conjugations: Conjugation[]) {
    try {
      await this.conjugation.bulkAdd(conjugations);
    } catch (error) {
      console.error('Error adding conjugations:', error);
    }
  }

  async searchConjugationsOffline(search: string): Promise<Conjugation[]> {
    try {
      return await this.conjugation
        .filter((c) => c.infinitive.toLowerCase().includes(search.toLowerCase()))
        .toArray();
    } catch (error) {
      console.error('Error searching conjugations:', error);
      return [];
    }
  }

  // Clear all data
  async clearAll() {
    try {
      await this.lessons.clear();
      await this.vocabulary.clear();
      await this.grammar.clear();
      await this.conjugation.clear();
      await this.quizzes.clear();
      await this.videos.clear();
      await this.audios.clear();
      await this.pdfs.clear();
    } catch (error) {
      console.error('Error clearing database:', error);
    }
  }
}

export const db = new DatabaseService();
