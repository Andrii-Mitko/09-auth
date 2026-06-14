export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
};

export type CheckSessionRequest = {
  success: boolean;
};
export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
export type Tag = (typeof tags)[number];
