import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo',
  };
  
  interface Draft {
    title: string;
    content: string;
    tag: string;
  }
  
  interface NoteStore {
    draft: Draft;
    setDraft: (newFields: Draft) => void;
    clearDraft: () => void;
  }

  export const useNoteStore = create<NoteStore>()(
    persist(
      (set) => ({
        draft: initialDraft,
  
        setDraft: (newFields) =>
          set((state) => ({
            draft: { ...state.draft, ...newFields },
          })),
  
        clearDraft: () => set({ draft: initialDraft }),
      }),
      {
        name: 'note-draft-storage',
      }
    )
  );