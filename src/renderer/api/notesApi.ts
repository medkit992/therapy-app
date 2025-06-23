import axios from 'axios';
import { Note } from '../models/Note';

export async function fetchNotes(): Promise<Note[]> {
    const res = await axios.get<Note[]>('/api/notes');
    return res.data;
}
export async function fetchNote(id: number): Promise<Note> {
    const res = await axios.get<Note>(`/api/notes/${id}`);
    return res.data;
}
export async function createNote(payload: Partial<Note>): Promise<Note> {
    const res = await axios.post<Note>('/api/notes', payload);
    return res.data;
}
export async function updateNote(id: number, payload: Partial<Note>): Promise<Note> {
    const res = await axios.put<Note>(`/api/notes/${id}`, payload);
    return res.data;
}
export async function deleteNote(id: number): Promise<void> {
    await axios.delete(`/api/notes/${id}`);
}
export async function uploadRecording(id: number, file: File): Promise<Note> {
    const form = new FormData();
    form.append('audio', file);
    const res = await axios.post<Note>(`/api/notes/${id}/recording`, form);
    return res.data;
}
export async function fetchClients() {
    const res = await axios.get('/api/notes/helpers/clients');
    return res.data as { id: number; name: string }[];
}
export async function fetchUpcomingSessions() {
    const res = await axios.get('/api/notes/helpers/sessions/upcoming');
    return res.data as { id: number; date: string; time: string }[];
}
export async function fetchPastSessions() {
    const res = await axios.get('/api/notes/helpers/sessions/history');
    return res.data as { id: number; date: string; time: string }[];
}
