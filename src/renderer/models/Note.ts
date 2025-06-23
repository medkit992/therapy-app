// src/renderer/models/Note.ts
export interface Note {
    id: number;
    type: 'client' | 'session';
    clientId?: number;
    sessionId?: number;
    dateTime: string;
    title: string;
    content: string;
    tags: string[];            // now always an array
    mood?: number;
    followUps?: string[];
    audioUrl?: string;
    summary?: string;

    // add clientName here for convenience
    clientName?: string;
}
