import axios from 'axios';

export interface VoiceNote {
    id: string;
    fileName: string;
    date: string;
    tags: string[];
}

export const fetchVoiceNotes = async (): Promise<VoiceNote[]> => {
    const response = await axios.get('http://localhost:4000/api/voicenotes');
    return response.data;
};
