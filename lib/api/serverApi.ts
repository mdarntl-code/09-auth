import { cookies } from "next/headers";
import { noteInstance } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { AxiosResponse } from "axios";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchNotes = async ({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const authConfig = await getAuthHeaders();
  
  const response = await noteInstance.get<FetchNotesResponse>('/notes', {
    ...authConfig,
    params: { page, perPage, search, tag },
  });
  
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const authConfig = await getAuthHeaders();
  
  const response = await noteInstance.get<Note>(`/notes/${noteId}`, authConfig);
  
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const authConfig = await getAuthHeaders();
  
  const response = await noteInstance.get<User>('/users/me', authConfig);
  
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const authConfig = await getAuthHeaders();
  
  const response = await noteInstance.get<User>('/auth/session', authConfig);
  
  return response; 
};