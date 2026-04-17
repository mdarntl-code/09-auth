import { noteInstance } from "./api";
import { Note } from "@/types/note";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { cookies } from "next/headers";

export const fetchNotes = async ({page, perPage = 12, search, tag} : FetchNotesParams): Promise<FetchNotesResponse> => {

    const response = await noteInstance.get<FetchNotesResponse>('/notes' , {
        params: {
            page,
            perPage,
            search, 
            tag
        },
    })
    return response.data;
}

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await noteInstance.get<Note>(`/notes/${noteId}`);
    return response.data;
}

export const getMe = async () => {
    const response = await noteInstance.get('/users/me');
    return response.data;
}

export const checkSession = async () => {
    const response = await noteInstance.get('/auth/session');
    return response.data;
}