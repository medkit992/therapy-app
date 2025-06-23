// src/renderer/components/Dashboard.tsx
import React from 'react';

export interface Metrics {
    clientCount: number;
    noteCount: number;
    sessionCount: number;
    fileCount: number;
    taskCount: number;
}

interface Props {
    metrics: Metrics;
}

const Dashboard: React.FC<Props> = ({ metrics }) => {
    return (
        <div>
            <h2>Clients: {metrics.clientCount}</h2>
            <h2>Notes: {metrics.noteCount}</h2>
            <h2>Sessions: {metrics.sessionCount}</h2>
            <h2>Files: {metrics.fileCount}</h2>
            <h2>Tasks: {metrics.taskCount}</h2>
        </div>
    );
};

export default Dashboard;
