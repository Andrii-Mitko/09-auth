import axios from "axios";
import type { Note } from "../types/note";

/**
 * клиент для Next.js API routes
 */
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// -------------------- TYPES --------------------

export interface NoteListResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

// -------------------- NOTES --------------------

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const { data } = await api.get("/notes", {
    params: { page, perPage, search, tag },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (data: NewNoteData) => {
  const res = await api.post("/notes", data);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${noteId}`);
  return data;
};

// -------------------- AUTH --------------------

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
};
