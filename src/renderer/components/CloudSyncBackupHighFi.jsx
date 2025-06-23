// src/components/CloudSyncBackupHighFi.jsx
import React from 'react';
import { Cloud, RefreshCw, Lock } from 'lucide-react';

// Stub UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-6`}>{children}</div>
);
const Button = ({ children, className = '', ...props }) => (
  <button className={`${className} px-4 py-2 rounded bg-teal-600 text-white hover:shadow transition`} {...props}>
    {children}
  </button>
);
const Toggle = ({ enabled }) => (
  <div className="relative inline-block w-12 h-6">
    <input type="checkbox" checked={enabled} readOnly className="opacity-0 w-0 h-0" />
    <div className={`absolute inset-0 rounded-full transition ${enabled ? 'bg-teal-600' : 'bg-gray-300'}`} />
    <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transition ${enabled ? 'translate-x-6' : ''}`} />
  </div>
);

export default function CloudSyncBackupHighFi() {
  const syncStatus = { online: true, lastBackup: 'Jul 19, 2025, 11:45 PM', nextBackupIn: '4h 15m' };
  return (
    <div className="flex h-screen bg-gray-50 p-6">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600">Sync & Backup</h2>
      </aside>
      <main className="flex-1 grid grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center mb-4">
            <Cloud size={32} className={syncStatus.online ? 'text-green-500' : 'text-gray-400'} />
            <h3 className="ml-4 text-xl font-semibold text-gray-800">{syncStatus.online ? 'Online' : 'Offline'}</h3>
          </div>
          <p className="text-gray-600 mb-4"><strong>Last Backup:</strong> {syncStatus.lastBackup}</p>
          <p className="text-gray-600 mb-6"><strong>Next Backup In:</strong> {syncStatus.nextBackupIn}</p>
          <div className="text-right">
            <Button><RefreshCw size={16} /> Sync Now</Button>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center"><Lock size={24} className="text-teal-600" /><h3 className="ml-2 text-xl font-semibold">Automatic Backups</h3></div>
            <Toggle enabled={true} />
          </div>
          <p className="text-gray-600 mb-2">When enabled, your data is encrypted and backed up every 24 hours.</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Encrypted storage</li>
            <li>Versioning support</li>
            <li>Restore points up to 30 days</li>
          </ul>
        </Card>
      </main>
    </div>
);
}
