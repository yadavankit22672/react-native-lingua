import { Lesson } from '@/types/learning';

export const LESSONS: Lesson[] = [
  // SPANISH UNIT 1
  {
    id: 'lesson_es_1_1',
    unitId: 'unit_es_1',
    order: 1,
    title: 'Greetings & Introductions',
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
    id: 'lesson_es_1_2',
    unitId: 'unit_es_1',
    order: 2,
    title: 'Daily Life',
    description: 'Learn essential everyday phrases.',
    goals: ['Say please and thank you', 'Ask how someone is doing'],
    aiTeacherPrompt: 'You are a friendly Spanish teacher. Help the student practice please and thank you.',
    activities: [
      { id: 'act_es_2_1', type: 'vocabulary', vocabulary: [{ term: 'Por favor', translation: 'Please' }, { term: 'Gracias', translation: 'Thank you' }] }
    ],
  },
  {
    id: 'lesson_es_1_3',
    unitId: 'unit_es_1',
    order: 3,
    title: 'At the Café',
    description: 'Count from one to ten in Spanish.',
    goals: ['Count up to 10', 'Recognize numbers'],
    aiTeacherPrompt: 'You are a Spanish tutor helping the student learn numbers 1 to 10.',
    activities: [
      { id: 'act_es_3_1', type: 'vocabulary', vocabulary: [{ term: 'Uno', translation: 'One' }, { term: 'Dos', translation: 'Two' }] }
    ],
  },
  {
    id: 'lesson_es_1_4',
    unitId: 'unit_es_1',
    order: 4,
    title: 'Travel & Directions',
    description: 'Identify common colors.',
    goals: ['Name colors', 'Describe objects'],
    aiTeacherPrompt: 'Help the student practice colors like rojo, azul, and verde.',
    activities: [
      { id: 'act_es_4_1', type: 'vocabulary', vocabulary: [{ term: 'Rojo', translation: 'Red' }, { term: 'Azul', translation: 'Blue' }] }
    ],
  },
  {
    id: 'lesson_es_1_5',
    unitId: 'unit_es_1',
    order: 5,
    title: 'Shopping',
    description: 'Talk about your family members.',
    goals: ['Name family members', 'Say who they are'],
    aiTeacherPrompt: 'Practice family vocabulary like madre, padre, and hermano.',
    activities: [
      { id: 'act_es_5_1', type: 'vocabulary', vocabulary: [{ term: 'Madre', translation: 'Mother' }, { term: 'Padre', translation: 'Father' }] }
    ],
  },
  {
    id: 'lesson_es_1_6',
    unitId: 'unit_es_1',
    order: 6,
    title: 'Family & Friends',
    description: 'Learn basic food items.',
    goals: ['Order a drink', 'Name common foods'],
    aiTeacherPrompt: 'Practice basic food vocabulary.',
    activities: [
      { id: 'act_es_6_1', type: 'vocabulary', vocabulary: [{ term: 'Agua', translation: 'Water' }, { term: 'Pan', translation: 'Bread' }] }
    ],
  },

  // FRENCH UNIT 1
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
  {
    id: 'lesson_fr_1_2',
    unitId: 'unit_fr_1',
    order: 2,
    title: 'Polite Phrases',
    description: 'Learn to say please and thank you.',
    goals: ['Say please', 'Say thank you'],
    aiTeacherPrompt: 'Teach S\'il vous plaît and Merci.',
    activities: [
      { id: 'act_fr_2_1', type: 'vocabulary', vocabulary: [{ term: 'S\'il vous plaît', translation: 'Please' }, { term: 'Merci', translation: 'Thank you' }] }
    ],
  },
  {
    id: 'lesson_fr_1_3',
    unitId: 'unit_fr_1',
    order: 3,
    title: 'Numbers 1-5',
    description: 'Count to five in French.',
    goals: ['Count up to 5', 'Recognize numbers'],
    aiTeacherPrompt: 'Teach numbers 1 to 5.',
    activities: [
      { id: 'act_fr_3_1', type: 'vocabulary', vocabulary: [{ term: 'Un', translation: 'One' }, { term: 'Deux', translation: 'Two' }] }
    ],
  },
  {
    id: 'lesson_fr_1_4',
    unitId: 'unit_fr_1',
    order: 4,
    title: 'Colors',
    description: 'Identify common colors.',
    goals: ['Name colors', 'Describe objects'],
    aiTeacherPrompt: 'Teach colors like rouge and bleu.',
    activities: [
      { id: 'act_fr_4_1', type: 'vocabulary', vocabulary: [{ term: 'Rouge', translation: 'Red' }, { term: 'Bleu', translation: 'Blue' }] }
    ],
  },
  {
    id: 'lesson_fr_1_5',
    unitId: 'unit_fr_1',
    order: 5,
    title: 'Family',
    description: 'Talk about your family.',
    goals: ['Name family members'],
    aiTeacherPrompt: 'Teach family vocabulary like mère and père.',
    activities: [
      { id: 'act_fr_5_1', type: 'vocabulary', vocabulary: [{ term: 'Mère', translation: 'Mother' }, { term: 'Père', translation: 'Father' }] }
    ],
  },
  {
    id: 'lesson_fr_1_6',
    unitId: 'unit_fr_1',
    order: 6,
    title: 'Basic Food',
    description: 'Learn simple food items.',
    goals: ['Order a drink'],
    aiTeacherPrompt: 'Teach words like eau and pain.',
    activities: [
      { id: 'act_fr_6_1', type: 'vocabulary', vocabulary: [{ term: 'Eau', translation: 'Water' }, { term: 'Pain', translation: 'Bread' }] }
    ],
  }
];
