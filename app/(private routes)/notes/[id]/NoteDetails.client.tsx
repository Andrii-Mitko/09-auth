"use client";

import { fetchNoteById } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";


export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    retry: false,
    refetchOnMount: false,

    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data) return <p>Note not found</p>;

  return (
    <div>
      <h1>{data.title}</h1>

      <p>{data.content}</p>

      <p>
        <strong>Tag:</strong> {data.tag}
      </p>

      <p>
        <strong>Created at:</strong>{" "}
        {new Date(data.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
