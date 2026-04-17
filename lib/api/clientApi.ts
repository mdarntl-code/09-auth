import { User } from "@/types/user";
import { noteInstance } from "./api";
import { Note, NoteTag } from "@/types/note";

// --- ТИПИ ТА ІНТЕРФЕЙСИ ---
export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// --- ФУНКЦІЇ ДЛЯ РОБОТИ З НОТАТКАМИ ---

export const fetchNotes = async ({ 
  page, 
  perPage = 12, 
  search, 
  tag 
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await noteInstance.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${noteId}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteParams): Promise<Note> => {
  const response = await noteInstance.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await noteInstance.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

// --- АВТОРИЗАЦІЯ ---

export const register = async (data: RegisterData):Promise<User> => {
  const response = await noteInstance.post<User>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData):Promise<User> => {
  const response = await noteInstance.post<User>('/auth/login', data);
  return response.data;
};

export const logout = async ():Promise<void> => {
  await noteInstance.post('/auth/logout');
};

export const checkSession = async ():Promise<User> => {
  const response = await noteInstance.get<User>('/auth/session');
  return response.data;
};

// --- КОРИСТУВАЧ ---

export const getMe = async ():Promise<User> => {
  const response = await noteInstance.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (updateData: { 
  username?: string 
}): Promise<User> => {
  const response = await noteInstance.patch<User>('/users/me', updateData);
  return response.data;
};