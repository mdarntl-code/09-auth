'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useState, useEffect } from "react";
import Link from "next/link";
import css from "./notes.module.css"; 
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../../components/Pagination/Pagination";
import NoteList from "../../../../../components/NoteList/NoteList";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface NotesClientProps {
  activeTag?: string;
}

function NotesClient({ activeTag = "" }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isError, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['notes', { page, perPage: 6, search: debouncedSearch, tag: activeTag }],
    queryFn: () => fetchNotes({ page, perPage: 6, search: debouncedSearch, tag: activeTag }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container || css.app}> 
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        
        {data && data.totalPages > 1 && (
          <Pagination 
            totalPages={data.totalPages} 
            currentPage={page} 
            onPageChange={setPage} 
          />
        )}
        
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      <main 
        className={css.main} 
        style={{ opacity: isPlaceholderData ? 0.6 : 1, transition: 'opacity 0.2s' }}
      >
        {isLoading && !data && <p className={css.status}>Завантаження нотаток...</p>}
        {isError && <p className={css.error}>Сталася помилка при завантаженні нотаток.</p>}
        
        {data && <NoteList notes={data.notes} />}
        
        {data && data.notes.length === 0 && (
          <p className={css.status}>Нотаток не знайдено.</p>
        )}
      </main>

      
    </div>
  );
}

export default NotesClient;