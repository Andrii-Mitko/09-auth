import { User } from "@/types/user";
import type { NewNote, Note } from "../../types/note";
import { nextServer } from "./api";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search?: string,
  page?: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search: String(search), page, tag },
  });
  return data;
};

export const createNote = async (newNote: NewNote) => {
  const { data } = await nextServer.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
};

export type RegisterRequest = { email: string; password: string };

export const register = async (user: RegisterRequest) => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};

export type LoginRequest = { email: string; password: string };

export const login = async (user: LoginRequest) => {
  const { data } = await nextServer.post<User>("/auth/login", user);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
