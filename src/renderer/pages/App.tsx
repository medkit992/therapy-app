// src/renderer/App.tsx
import React from 'react';
import Dashboard from './Dashboard';

const App: React.FC = () => {
    const metrics = {
        clientCount: 10,
        noteCount: 5,
        sessionCount: 8,
        fileCount: 2,
        taskCount: 6,
    };

    return (
        <div>
            <h1>Therapist Dashboard</h1>
            <Dashboard metrics={metrics} />
        </div>
    );
};

export default App;
