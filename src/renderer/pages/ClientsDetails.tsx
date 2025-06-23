import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface NoteSummary {
    dateTime: string;
    type: string;
    title: string;
    mood?: number;
}

const ClientsDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [notes, setNotes] = useState<NoteSummary[]>([]);
    const [client, setClient] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/clients/${id}`).then(res => setClient(res.data));
        // fetch notes for this client
        axios.get('/api/notes').then(res => {
            const all = (res.data as any[])
                .filter(n => n.clientId === Number(id) || n.session?.clientId === Number(id))
                .map(n => ({
                    dateTime: n.dateTime,
                    type: n.type,
                    title: n.title,
                    mood: n.mood,
                }));
            setNotes(all);
        });
    }, [id]);

    if (!client) return <MainLayout><p>Loading...</p></MainLayout>;

    // prepare graph data: only notes with mood
    const moodData = notes
        .filter(n => typeof n.mood === 'number')
        .map(n => ({ name: new Date(n.dateTime).toLocaleDateString(), mood: n.mood }));

    return (
        <MainLayout>
            <h1 className="text-2xl font-semibold mb-4">{client.name}</h1>
            {/* Mood graph */}
            <div className="mb-8">
                <h2 className="text-lg font-medium">Mood Over Time</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={moodData}>
                        <XAxis dataKey="name" />
                        <YAxis domain={[1, 10]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="mood" stroke="#5FB0B7" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* Notes list */}
            <div>
                <h2 className="text-lg font-medium mb-2">All Notes</h2>
                <div className="space-y-4">
                    {notes.map((n, i) => (
                        <div key={i} className="border rounded p-4">
                            <div className="text-sm text-gray-500">{new Date(n.dateTime).toLocaleString()}</div>
                            <div className="font-semibold">{n.title}</div>
                            <div className="text-gray-700">{n.type} note</div>
                            {n.mood != null && <div>Mood: {n.mood}/10</div>}
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default ClientsDetails;
