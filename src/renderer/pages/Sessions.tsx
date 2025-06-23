import React, { useEffect, useState } from 'react';
import { fetchPastSessions } from '../api/fetchPastSessions';
import { Session } from '../../types/session';
import SessionCard from '../components/SessionCard';

const Sessions: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        const loadSessions = async () => {
            try {
                const data = await fetchPastSessions();
                setSessions(data);
            } catch (error) {
                console.error('Failed to load sessions:', error);
            }
        };
        loadSessions();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Past Sessions</h1>
            {sessions.map(session => (
                <SessionCard key={session.id} session={session} />
            ))}
        </div>
    );
};

export default Sessions;