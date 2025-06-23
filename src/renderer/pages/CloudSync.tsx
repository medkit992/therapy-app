import React, { useEffect, useState } from 'react';
import CloudSyncBackupHighFi from '../components/CloudSyncBackupHighFi';
import { fetchCloudSyncStatus, CloudSyncStatus } from '../api/cloudSyncApi';

const CloudSync: React.FC = () => {
    const [status, setStatus] = useState<CloudSyncStatus | null>(null);

    useEffect(() => {
        fetchCloudSyncStatus().then(setStatus).catch(console.error);
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Cloud Sync & Backup</h1>

            {status ? (
                <div className="bg-white shadow p-6 rounded-lg space-y-4">
                    <div>
                        <span className="font-medium text-gray-700">Last Synced:</span>{' '}
                        <span className="text-gray-900">{new Date(status.lastSynced).toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Auto-Sync:</span>{' '}
                        <span className={`font-semibold ${status.autoSyncEnabled ? 'text-green-600' : 'text-red-500'}`}>
                            {status.autoSyncEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium text-gray-700">Provider:</span>{' '}
                        <span className="text-gray-900">{status.storageProvider}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">Loading cloud sync status...</p>
            )}

            <div className="mt-8">
                <CloudSyncBackupHighFi />
            </div>
        </div>
    );
};

export default CloudSync;

