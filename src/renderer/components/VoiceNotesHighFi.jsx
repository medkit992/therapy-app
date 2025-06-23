// src/components/VoiceNotesHighFi.jsx
import React from 'react';
import { Mic, StopCircle, Play, Code } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-4`}>{children}</div>
);
const Button = ({ children, className = '', variant, ...props }) => (
  <button
    className={`${className} px-4 py-2 rounded ${
      variant === 'outline' ? 'border border-gray-300' : 'bg-teal-600 text-white'
    } hover:shadow transition flex items-center space-x-2`}
    {...props}
  >
    {children}
  </button>
);

// Sample notes
const notes = [
  { id: 1, title: 'Session 1 Review', time: 'Jul 9, 02:15 PM' },
  { id: 2, title: 'Self-Reflection', time: 'Jul 8, 05:30 PM' },
];

export default function VoiceNotesHighFi() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-teal-600 mb-8">TherapyApp</h2>
        <nav className="space-y-4">
          <Button variant="outline" className="w-full text-left text-gray-700 hover:bg-teal-100 hover:text-teal-600">
            Voice Notes
          </Button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Voice Notes</h1>
          <div className="flex items-center space-x-4">
            <Button><Mic size={18} /><span>Record</span></Button>
            <Button><StopCircle size={18} /><span>Stop</span></Button>
          </div>
        </header>

        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-teal-600 mb-4">Recorded Notes</h3>
          <div className="space-y-4">
            {notes.map(note => (
              <div
                key={note.id}
                className="flex items-center justify-between p-4 hover:bg-gray-100 rounded transition"
              >
                <div>
                  <div className="text-lg font-medium text-gray-800">{note.title}</div>
                  <div className="text-sm text-gray-500">{note.time}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button><Play size={16} /><span>Play</span></Button>
                  <Button variant="outline"><Code size={16} /><span>Analyze &amp; Transcribe</span></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
