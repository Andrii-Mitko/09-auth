import { NoteTag } from "@/types/note";
import axios from "axios";

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};
