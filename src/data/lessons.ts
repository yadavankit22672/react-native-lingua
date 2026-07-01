import { Lesson } from '@/types/learning';

export const LESSONS: Lesson[] = [
  {
    id: 'lesson_es_1_1',
    unitId: 'unit_es_1',
    order: 1,
    title: 'Say Hello',
    description: 'Learn to say hello and goodbye in Spanish.',
    goals: ['Greet people', 'Say goodbye'],
    aiTeacherPrompt: 'You are a friendly Spanish teacher. Your student is learning to say hello and goodbye. Keep your responses short and encouraging. Speak primarily in English but use basic Spanish words like Hola, Adiós, Buenos días.',
    activities: [
      {
        id: 'act_1',
        type: 'vocabulary',
        vocabulary: [
          { term: 'Hola', translation: 'Hello' },
          { term: 'Adiós', translation: 'Goodbye' },
          { term: 'Buenos días', translation: 'Good morning' },
        ],
      },
      {
        id: 'act_2',
        type: 'multiple_choice',
        question: 'How do you say "Hello"?',
        options: ['Adiós', 'Hola', 'Gracias'],
        correctAnswer: 'Hola',
      },
      {
        id: 'act_3',
        type: 'phrase',
        phrases: [
          { phrase: 'Hola, ¿cómo estás?', translation: 'Hello, how are you?' },
        ],
      },
      {
        id: 'act_4',
        type: 'listen',
        question: 'Listen and select the correct translation for: Hola',
        options: ['Goodbye', 'Please', 'Hello'],
        correctAnswer: 'Hello',
      }
    ],
  },
  {
    id: 'lesson_fr_1_1',
    unitId: 'unit_fr_1',
    order: 1,
    title: 'Say Bonjour',
    description: 'Learn to greet people in French.',
    goals: ['Say hello', 'Ask how someone is doing'],
    aiTeacherPrompt: 'You are a warm French tutor. Introduce the words Bonjour and Ça va. Correct the student gently if they mispronounce.',
    activities: [
      {
        id: 'act_5',
        type: 'vocabulary',
        vocabulary: [
          { term: 'Bonjour', translation: 'Hello' },
          { term: 'Merci', translation: 'Thank you' },
        ],
      },
      {
        id: 'act_6',
        type: 'multiple_choice',
        question: 'What does "Bonjour" mean?',
        options: ['Goodbye', 'Hello', 'Please'],
        correctAnswer: 'Hello',
      }
    ],
  },
];
