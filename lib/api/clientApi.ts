import { User } from "@/types/user";
import { NewNoteData, nextServer } from "./api";
import {
  CheckSessionRequest,
  LoginRequest,
  RegisterRequest,
} from "@/types/note";

export const fetchNotes = async (params: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}) => {
  const res = await nextServer.get("/notes", {
    params,
  });

  return res.data;
};

export type UpdateUserRequest = {
  username: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post("/auth/logout");
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: NewNoteData) => {
  const res = await nextServer.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
};
