// src/renderer/models/Client.ts
export interface Client {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    dateOfBirth?: string;          // ISO date string, e.g. "1980-07-21"
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    notes?: string;
}
