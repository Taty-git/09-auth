import {Note} from '../../types/note';
import {NewNote} from '../../types/note';
import {serverApi} from '../api/api';
import {RegisterRequest, User, CheckSessionRequest, LoginRequest, UpdateUserRequest} from '../../types/user';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag?: string
): Promise<NotesHttpResponse> => {
  const PARAMS = new URLSearchParams({
    ...(query !== "" ? { search: query } : {}),

    ...(tag !== undefined ? { tag } : null),
    page: page.toString(),
  });

  const response = await serverApi.get<NotesHttpResponse>("/notes", {
    params: PARAMS,
  });

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await serverApi.post("/notes", newNote);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await serverApi.get<Note>(`/notes/${id}`);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await serverApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await serverApi.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await serverApi.post<User>("/auth/login", data);
  return res.data;
};

export const editProfile = async (data: UpdateUserRequest) => {
  const res = await serverApi.patch<User>("/users/me", data);
  return res.data;
};

export const checkSession = async () => {
  const res = await serverApi.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await serverApi.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await serverApi.post("/auth/logout");
};