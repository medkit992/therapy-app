export enum SessionType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
  ASSESSMENT = 'assessment',
}

export interface SessionPayload {
  date: string;
  time: string;
  duration: number;
  location?: string;
  isTelehealth: boolean;
  reminderOffset: number;
  sessionType: SessionType;
  attachments?: string;
  moodRating?: number;
  notes?: string;
  recurrenceRule?: string;
  clientId: number;
}
