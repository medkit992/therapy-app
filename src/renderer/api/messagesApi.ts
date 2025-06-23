import axios from 'axios';

export interface Message {
    id: string;
    sender: string;
    timestamp: string;
    preview: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
    const response = await axios.get('http://localhost:4000/api/messages');
    return response.data;
};
