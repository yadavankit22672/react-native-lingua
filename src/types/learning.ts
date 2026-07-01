export type Language = {
  id: string;
  name: string;
  nativeName: string;
  code: string; // ISO code (e.g., 'es', 'fr')
  flag: string; // Emoji flag or URL
  learners?: string; // e.g., '28.4M'
};

export type Unit = {
  id: string;
  languageId: string;
  order: number;
  title: string;
  description: string;
};

export type Lesson = {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  goals: string[];
  aiTeacherPrompt: string; // Instructions for the AI Vision Agent
  activities: Activity[];
};

export type ActivityType = 
  | 'vocabulary' 
  | 'phrase' 
  | 'multiple_choice' 
  | 'listen' 
  | 'speak';

export type VocabularyItem = {
  term: string; // Word in target language
  translation: string; // Meaning in base language (e.g., English)
  pronunciation?: string;
  imageUrl?: string;
};

export type PhraseItem = {
  phrase: string;
  translation: string;
  pronunciation?: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  question?: string;
  options?: string[]; // For multiple choice
  correctAnswer?: string; // For multiple choice
  vocabulary?: VocabularyItem[]; // For vocabulary review
  phrases?: PhraseItem[]; // For phrase practice
};
