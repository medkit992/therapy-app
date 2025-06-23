import axios from 'axios';
import { Session, SessionPayload } from '../models/Session';

export async function fetchUpcomingSessions(): Promise<Session[]> {
    const res = await axios.get<Session[]>('/api/sessions/upcoming');
    return res.data;
}

export async function fetchSession(id: number): Promise<Session> {
    const res = await axios.get<Session>(`/api/sessions/${id}`);
    return res.data;
}

export async function createSession(payload: SessionPayload) {
    return (await axios.post<Session>('/api/sessions', payload)).data;
}

export async function updateSession(id: number, payload: SessionPayload): Promise<Session> {
    const res = await axios.put<Session>(`/api/sessions/${id}`, payload);
    return res.data;
}

export async function deleteSession(id: number): Promise<void> {
    await axios.delete(`/api/sessions/${id}`);
}
