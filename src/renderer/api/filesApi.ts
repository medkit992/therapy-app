import axios from 'axios';

export interface FileItem {
    id: string;
    name: string;
    sizeKB: number;
    uploadedAt: string;
}

export const fetchFiles = async (): Promise<FileItem[]> => {
    const response = await axios.get('http://localhost:4000/api/files');
    return response.data;
};
