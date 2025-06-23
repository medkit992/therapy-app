import axios from 'axios';

export interface CloudSyncStatus {
    lastSynced: string;
    autoSyncEnabled: boolean;
    storageProvider: string;
}

export const fetchCloudSyncStatus = async (): Promise<CloudSyncStatus> => {
    const response = await axios.get('http://localhost:4000/api/cloud-sync');
    return response.data;
};
