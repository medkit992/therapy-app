import React, { useEffect, useState } from 'react';
import ClientHistoryHighFi from '../components/ClientHistoryHighFi';
import { fetchClientHistory, ClientHistoryEntry } from '../api/clientHistoryApi';

const ClientHistory: React.FC = () => {
  const [history, setHistory] = useState<ClientHistoryEntry[]>([]);

  useEffect(() => {
    fetchClientHistory().then(setHistory).catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Client History</h1>

      <div className="space-y-4 mb-6">
        {history.length > 0 ? (
          history.map(entry => (
            <div key={entry.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-800 font-medium">{entry.clientName}</span>
                <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-blue-600 font-semibold">{entry.event}</p>
              <p className="text-gray-700 text-sm mt-1">{entry.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No client history available.</p>
        )}
      </div>

      <ClientHistoryHighFi />
    </div>
  );
};

export default ClientHistory;

