import css from "./NotePreview.module.css";
import { Note } from "@/types/note";

interface NotePreviewProps {
  note: Note;
  onBack?: () => void;
}

export default function NotePreview({ note, onBack }: NotePreviewProps) {
  return (
    <div className={css.container}>
      {onBack && (
        <button className={css.backBtn} onClick={onBack}>
          ← Back to list
        </button>
      )}

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>
          {note.content}
        </div>

        <div className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}