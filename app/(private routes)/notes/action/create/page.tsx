import NoteForm from "../../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
   title:  "Create New Note | NoteHub",
   description: "Create a new personal note to stay organized and keep track of your thoughts.",
   openGraph: {
    title:  "Create New Note | NoteHub",
   description: "Create a new personal note to stay organized and keep track of your thoughts.",
   url: "https://notehub.com/notes/action/create",
   images: [{
    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
   }]
   }
    
}

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
