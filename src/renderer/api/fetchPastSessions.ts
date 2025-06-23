import { Session } from '../../types/session';

export async function fetchPastSessions(): Promise<Session[]> {
    const res = await fetch('http://localhost:3001/sessions');
    if (!res.ok) {
        throw new Error('Failed to fetch sessions');
    }
    const sessions = await res.json();
    return sessions;
}