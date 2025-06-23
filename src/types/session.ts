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
    reminderOffset: number;
    sessionType: SessionType;
    attachments?: string;
    moodRating: number;
    notes?: string;
    recurrenceRule?: string;
    createdAt: string;
    clientId: number;
    client?: {
        id: number;
        name: string;
    };
}

export type SessionPayload = Omit<Partial<Session>, 'id' | 'client'>;
