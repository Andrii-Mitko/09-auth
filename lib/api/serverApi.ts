import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getServerNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  search?: string,
  page?: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await api.get("/notes", {
    params: { search, page, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};
