// src/components/SessionNotesHighFi.jsx
import React from 'react';
import { Edit3 } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-6`}>{children}</div>
);
const Button = ({ children, className = '', variant, ...props }) => (
  <button
    className={`${className} px-4 py-2 rounded ${
      variant === 'outline' ? 'border border-gray-300' : 'bg-teal-600 text-white'
    } hover:shadow transition`}
    {...props}
  >
    {children}
  </button>
);
const TextArea = (props) => (
  <textarea
    className="w-full border rounded p-3 h-40 focus:outline-none focus:ring-2 focus:ring-teal-200"
    {...props}
  />
);

export default function SessionNotesHighFi() {
  // In a real app, you'd fetch notes by ID from params
  const clientName = 'Jane Doe';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Resources</h2>
        <ul className="space-y-3">
          {['PHQ-9', 'GAD-7', 'CBT Worksheet', 'Mindfulness Exercise'].map((res, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-2 hover:bg-teal-50 rounded cursor-pointer"
            >
              <span className="text-gray-800">{res}</span>
              <Edit3 className="text-gray-400 hover:text-teal-600 transition" size={16} />
            </li>
          ))}
        </ul>
      </aside>

      {/* Editor */}
      <main className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Notes for: {clientName}</h1>
          <div className="space-x-4">
            <Button variant="outline">Save Draft</Button>
            <Button>Finalize &amp; Lock</Button>
            <Button variant="outline" className="text-red-500">
              Follow-Up Task
            </Button>
          </div>
        </header>
        <Card className="flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-6">
            {['Subjective', 'Objective', 'Assessment', 'Plan'].map((section) => (
              <div key={section} className="flex flex-col">
                <h3 className="font-medium mb-2 text-gray-700">{section}</h3>
                <TextArea placeholder={`${section}...`} />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
