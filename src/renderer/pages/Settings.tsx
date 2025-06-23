import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">⚙️ Settings Module</h1>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-700 text-white rounded shadow hover:bg-black"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default Settings;
