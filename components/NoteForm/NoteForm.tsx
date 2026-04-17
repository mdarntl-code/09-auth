"use client";

import{ createNote, } from '../../lib/api';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '../../lib/store/noteStore';
import { CreateNoteParams } from '../../lib/api';


function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const {mutate,isPending} = useMutation({
    mutationFn: createNote,
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: () => {
      alert("Error creating note!");
    }
  })

  const handleSubmit = async (formData: FormData) =>{
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as CreateNoteParams['tag'];

    mutate({title, content, tag});
  }

  return (
    <form className={css.form} action={handleSubmit}> 
      
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input} 
          required 
        />
      </div>
  
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
          required
        />
      </div>
  
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" value={draft.tag} onChange={handleChange} className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
  
      <div className={css.actions}>
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;