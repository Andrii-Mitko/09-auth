import { nextServer } from "./api";

export async function fetchNotes() {
  const response = await nextServer.get("/notes");
  return response.data;
}
