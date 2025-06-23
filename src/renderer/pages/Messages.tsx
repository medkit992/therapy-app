import React from 'react';
import { useNavigate } from 'react-router-dom';

const Messages: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
            <h1 className="text-3xl font-bold mb-6">💬 Messages Module</h1>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default Messages;
