import axios from "axios";

export const api = axios.create({
  baseURL: "https://next-v1-notes-api.goit.study",
  withCredentials: true,
});

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
  status?: number;
}
