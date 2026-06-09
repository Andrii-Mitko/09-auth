import { User } from "@/types/user";
import { nextServer } from "./api";

export async function fetchNotes() {
  const response = await nextServer.get("/notes");
  return response.data;
}

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>("/auth/me", payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await nextServer.post("/upload", formData);
  return data.url;
};
