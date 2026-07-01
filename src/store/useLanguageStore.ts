import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageState {
  selectedLanguageId: string | null;
  hasHydrated: boolean;
  setLanguage: (id: string) => void;
  clearLanguage: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageId: null,
      hasHydrated: false,
      setLanguage: (id) => set({ selectedLanguageId: id }),
      clearLanguage: () => set({ selectedLanguageId: null }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
