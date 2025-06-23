import axios from 'axios'; // <- now it’s a proper module

export interface ClientHistoryEntry {
    id: string;
    clientName: string;
    event: string;
    timestamp: string;
    description: string;
}

export const fetchClientHistory = async (): Promise<ClientHistoryEntry[]> => {
    const response = await axios.get('http://localhost:4000/api/client-history');
    return response.data;
};
