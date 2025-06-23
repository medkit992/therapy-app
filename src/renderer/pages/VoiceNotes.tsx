import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNotes: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50">
            <h1 className="text-3xl font-bold mb-6">🎤 Voice Notes Module</h1>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default VoiceNotes;
