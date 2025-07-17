import {serverApi} from './api';
import {cookies} from 'next/headers';
import {Note, NewNote} from '../../types/note';
import {User} from '../../types/user';

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const getServerNotes = async (
    query: string,
    page: number,
    tag?: string
): Promise<NotesHttpResponse> => {
  const PARAMS = new URLSearchParams({
    ...(query !== "" ? {search: query} : {}),
    ...(tag !== undefined ? {tag} : {}),
    page: page.toString(),
  });
  const cookieStore = await cookies();

  const response = await serverApi.get("/notes", {
    params: PARAMS,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const createServerNote = async (newNote: NewNote): Promise<Note> => {
    const cookieStore = await cookies();
    const response = await serverApi.post("/notes", newNote, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
        return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await serverApi.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const deleteServerNote = async (id: string) => {
    const cookieStore = await cookies();
    const response = await serverApi.delete<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
        return response.data;
};

export const editProfile = async (data: User) => {
    const cookieStore = await cookies();
    const res = await serverApi.patch("/users/me", data, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
        return res.data;
};

export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const {data} = await serverApi.get("/users/me", {
        headers: {
        Cookie: cookieStore.toString(),
    },
    });
        return data;
};

export const checkSession = async () => {
    const cookieStore = await cookies();
    const response = await serverApi.get("/auth/session", {
        headers: {
        Cookie: cookieStore.toString(),
        },
    });
  return response;
};