import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

import type { Metadata } from "next";

import type { NoteTag } from "@/types/note";

const categories: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note and save it to your collection",
  openGraph: {
    title: "Create note",
    description: "Create a new note and save it to your collection",
    url: "/notes/action/create",
    images: [
      {
        url: "/og-create-note.png",
      },
    ],
  },
};

const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm categories={categories} />
      </div>
    </main>
  );
};

export default CreateNotePage;
