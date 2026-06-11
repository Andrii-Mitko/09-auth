"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";
import { useState } from "react";
import { createNote, NewNoteData } from "@/lib/api/api";

type Props = {
  categories: NoteTag[];
};

const NoteForm = ({ categories }: Props) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      router.push("/notes/filter/all");
      clearDraft();
    },
    onError: () => {
      setError("Failed to create note");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };
  const handleCancel = () => router.push("/notes/filter/all");
  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.formGroup}>
        Title
        <input
          name="title"
          type="text"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {categories.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      {error && <p className={css.error}>{error}</p>}
    </form>
  );
};

export default NoteForm;
