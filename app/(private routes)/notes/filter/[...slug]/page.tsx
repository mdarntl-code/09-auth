import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from 'next';

interface TaggedNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({params}:TaggedNotesPageProps) : Promise<Metadata> {
  const {slug} = await params;
  const filter = slug.join(" / ");

  return {
    title: `Notes Filter: ${filter} | NoteHub`,
    description: `Browse all personal notes filtered by ${filter}.`,
    openGraph: {
      title: `Notes Filter: ${filter}`,
      description: `Viewing notes matching the "${filter}" filter.`,
      url: `https://notehub.com/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function TaggedNotesPage({ params }: TaggedNotesPageProps) {
  const { slug } = await params;
  
  const currentTag = slug[0]; 
  const tagForApi = currentTag === 'all' ? "" : currentTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 6, search: "", tag: tagForApi }],
    queryFn: () => fetchNotes({ page: 1, perPage: 6, search: "", tag: tagForApi }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>
          {currentTag === 'all' ? 'All Notes' : `Tag: ${currentTag}`}
        </h1>

        <NotesClient key={currentTag} activeTag={tagForApi} />
      </div>
    </HydrationBoundary>
  );
}