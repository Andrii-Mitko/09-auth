"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import css from "./notes.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/api";

type Props = {
  initialTag?: string;
};

export default function NotesClient({ initialTag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, initialTag],
    queryFn: () => {
      return fetchNotes({
        page,
        perPage: 12,
        search,
        tag: initialTag === "all" ? undefined : initialTag,
      });
    },
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />
      </header>

      <Link href="/notes/action/create" className={css.button}>
        Create note +
      </Link>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          page={page}
          onPageChange={setPage}
        />
      )}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
