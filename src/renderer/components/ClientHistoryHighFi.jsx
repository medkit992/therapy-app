// src/components/ClientHistoryHighFi.jsx
import React from 'react';
import { Calendar, FileText, CheckSquare, MessageCircle, Mic } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-4 flex items-center justify-between hover:shadow-md transition`}>
    {children}
  </div>
);
const Button = ({ children, className = '', ...props }) => (
  <button className={`${className} px-3 py-2 rounded hover:bg-teal-50 transition`} {...props}>
    {children}
  </button>
);

const historyItems = [
  { id: 1, date: 'Jul 15, 2025', type: 'Appointment', title: 'Telehealth Session', icon: Calendar },
  { id: 2, date: 'Jul 12, 2025', type: 'Note', title: 'SOAP Note', icon: FileText },
  { id: 3, date: 'Jul 10, 2025', type: 'Task', title: 'Send Intake Forms', icon: CheckSquare },
  { id: 4, date: 'Jul 9, 2025', type: 'Message', title: 'Client Follow-up', icon: MessageCircle },
  { id: 5, date: 'Jul 8, 2025', type: 'Voice Note', title: 'Session Review', icon: Mic },
];

export default function ClientHistoryHighFi() {
  return (
    <div className="flex h-screen bg-gray-50 p-6">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">History</h2>
      </aside>
      <main className="flex-1 space-y-4 overflow-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Client History</h1>
        {historyItems.map(item => {
          const Icon = item.icon;
          return (
            <Card key={item.id}>
              <div className="flex items-center space-x-4">
                <Icon size={24} className="text-teal-600" />
                <div>
                  <div className="text-lg font-medium text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.date} • {item.type}</div>
                </div>
              </div>
              <Button variant="outline" className="text-gray-400 hover:text-teal-600">View</Button>
            </Card>
          );
        })}
      </main>
    </div>
  );
}
