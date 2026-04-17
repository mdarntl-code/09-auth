'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreview from "@/components/NotePreview/NotePreview";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Завантаження...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <p>Помилка завантаження нотатки.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}