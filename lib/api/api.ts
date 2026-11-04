import type { NoteTag } from "@/types/note";
import axios from "axios";

// Запити з браузера до власних Next.js API routes
export const nextServer = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};
