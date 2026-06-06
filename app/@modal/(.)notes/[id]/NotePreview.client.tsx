"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

type NotePreviewProps = {
  id?: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const params = useParams();

  const noteId = id || (params?.id as string);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note</p>}
      {!data && !isLoading && <p>Note not found</p>}

      {data && (
        <div>
          <h1>{data.title}</h1>

          <p>{data.content}</p>

          <p>
            <strong>Tag:</strong> {data.tag}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>

          <button onClick={() => router.back()}>Close</button>
        </div>
      )}
    </Modal>
  );
}
