import axios from 'axios';

export interface Settings {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
    autoSync: boolean;
}

export const fetchSettings = async (): Promise<Settings> => {
    const response = await axios.get('http://localhost:4000/api/settings');
    return response.data;
};
