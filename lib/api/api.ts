import { NoteListResponse, NoteTag } from "@/types/note";
import axios from "axios";

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NoteListResponse>("/notes", {
    params: { categoryId },
  });
  return res.data;
};

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await nextServer.post("/upload", formData);

  return data.url;
};
