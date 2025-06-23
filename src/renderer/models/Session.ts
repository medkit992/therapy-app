// src/renderer/models/Session.ts
export enum SessionType {
    INDIVIDUAL = 'individual',
    GROUP = 'group',
    ASSESSMENT = 'assessment',
}

export interface Session {
    id: number;
    date: string;
    time: string;
    duration: number;
    location?: string;
    isTelehealth: boolean;
    telehealthId?: string;
    telehealthUrl?: string;
    reminderOffset?: number;
    sessionType?: 'individual' | 'group' | 'assessment';
    attachments?: string;
    moodRating?: number;
    notes?: string;
    recurrenceRule?: string;
    createdAt?: string;
    clientId?: number;
    // 👇 Add this if you're rendering title in cards/details:
    title?: string;
}


// API payload now includes all new fields:
export type SessionPayload = Omit<Partial<Session>, 'id' | 'client'> & {
    clientId: number;
};
