import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";

import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.join("/");

  return {
    title: `Notes filtered by ${filter}`,
    description: `List of notes filtered by ${filter}`,

    openGraph: {
      title: `Notes filtered by ${filter}`,
      description: `List of notes filtered by ${filter}`,
      url: `http://localhost:3000/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Filtered notes",
        },
      ],
      type: "website",
    },
  };
}

const FilterPage = async ({ params }: Props) => {
  const { slug } = await params;

  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchServerNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
};

export default FilterPage;
