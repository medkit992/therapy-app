// src/renderer/api/clientsApi.ts
import axios from 'axios';

export interface Client {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    emergencyContact?: string;
}

export async function getClients(): Promise<Client[]> {
    const response = await axios.get<Client[]>('/api/clients');
    return response.data;
}

export async function getClient(id: number): Promise<Client> {
    const response = await axios.get<Client>(`/api/clients/${id}`);
    return response.data;
}

export async function createClient(payload: Partial<Client>): Promise<Client> {
    const response = await axios.post<Client>('/api/clients', payload);
    return response.data;
}

export async function updateClient(id: number, payload: Partial<Client>): Promise<Client> {
    const response = await axios.put<Client>(`/api/clients/${id}`, payload);
    return response.data;
}

export async function deleteClient(id: number): Promise<void> {
    await axios.delete(`/api/clients/${id}`);
}
