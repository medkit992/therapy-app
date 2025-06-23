import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import {
    createNote, fetchClients,
    fetchUpcomingSessions, fetchPastSessions,
    uploadRecording,
} from '../api/notesApi';

type NoteForm = {
    type: 'client' | 'session';
    clientId?: number;
    sessionId?: number;
    dateTime: string;
    title: string;
    content: string;
    tags: string[];
    mood?: number;
    followUps: string[];
};

export default function NotesNew() {
    const [form, setForm] = useState<NoteForm>({
        type: 'client',
        dateTime: new Date().toISOString().slice(0, 16),
        title: '',
        content: '',
        tags: [],
        followUps: [],
    });
    const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
    const [upcoming, setUpcoming] = useState<any[]>([]);
    const [past, setPast] = useState<any[]>([]);
    const [newTag, setNewTag] = useState('');
    const [newFollow, setNewFollow] = useState('');
    const [recording, setRecording] = useState<Blob | null>(null);
    const mediaRef = useRef<MediaRecorder | null>(null);
    const navigate = useNavigate();

    // load helpers
    useEffect(() => {
        fetchClients().then(setClients);
        fetchUpcomingSessions().then(setUpcoming);
        fetchPastSessions().then(setPast);
    }, []);

    const handleChange = (k: keyof NoteForm, v: any) => {
        setForm(f => ({ ...f, [k]: v }));
    };

    const addTag = () => {
        setForm(f => ({ ...f, tags: [...f.tags, newTag] }));
        setNewTag('');
    };
    const addFollow = () => {
        setForm(f => ({ ...f, followUps: [...f.followUps, newFollow] }));
        setNewFollow('');
    };

    // audio recording
    const startRec = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mr = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        mr.ondataavailable = e => chunks.push(e.data);
        mr.onstop = () => setRecording(new Blob(chunks));
        mr.start();
        mediaRef.current = mr;
    };
    const stopRec = () => mediaRef.current?.stop();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const note = await createNote(form);
        if (recording) {
            await uploadRecording(note.id, new File([recording], `note-${note.id}.webm`));
        }
        navigate('/notes');
    };

    return (
        <MainLayout>
            <h1 className="text-2xl font-semibold mb-6">New Note</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                {/* Type selector */}
                <div className="flex space-x-4">
                    {['client', 'session'].map(t => (
                        <label key={t} className="flex items-center space-x-2">
                            <input
                                type="radio" name="type"
                                value={t}
                                checked={form.type === t as any}
                                onChange={() => handleChange('type', t)}
                            />
                            <span className="capitalize">{t} note</span>
                        </label>
                    ))}
                </div>

                {/* Client dropdown (always) */}
                <div>
                    <label>Client</label>
                    <select
                        required
                        value={form.clientId || ''}
                        onChange={e => handleChange('clientId', Number(e.target.value))}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="" disabled>Pick client…</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                {/* Session dropdown, if session note */}
                {form.type === 'session' && (
                    <div>
                        <label>Session</label>
                        <select
                            required
                            value={form.sessionId || ''}
                            onChange={e => {
                                const sid = Number(e.target.value);
                                handleChange('sessionId', sid);
                                // autofill dateTime from selected session
                                const s = [...upcoming, ...past].find(s => s.id === sid);
                                if (s) handleChange('dateTime', `${s.date}T${s.time}`);
                            }}
                            className="w-full border rounded px-3 py-2"
                        >
                            <optgroup label="Upcoming">
                                {upcoming.map(s => (
                                    <option key={s.id} value={s.id}>{`${s.date} ${s.time}`}</option>
                                ))}
                            </optgroup>
                            <optgroup label="History">
                                {past.map(s => (
                                    <option key={s.id} value={s.id}>{`${s.date} ${s.time}`}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                )}

                {/* Date/time override */}
                <div>
                    <label>Date & Time</label>
                    <input
                        type="datetime-local"
                        value={form.dateTime}
                        onChange={e => handleChange('dateTime', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Title & Content */}
                <div>
                    <label>Title</label>
                    <input
                        type="text" required
                        value={form.title}
                        onChange={e => handleChange('title', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        required value={form.content}
                        onChange={e => handleChange('content', e.target.value)}
                        className="w-full border rounded px-3 py-2" rows={4}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label>Tags</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text" value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                        <button type="button" onClick={addTag} className="px-2 bg-teal-600 text-white rounded">Add</button>
                    </div>
                    <div className="space-x-2">
                        {form.tags?.map((t, i) => (
                            <span key={i} className="inline-block bg-gray-200 px-2 py-1 rounded">{t}</span>
                        ))}
                    </div>
                </div>

                {/* Mood slider */}
                <div>
                    <label>Mood: {form.mood || 0}/10</label>
                    <input
                        type="range" min={1} max={10}
                        value={form.mood || 1}
                        onChange={e => handleChange('mood', Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Follow-ups */}
                <div>
                    <label>Follow-Up Items</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text" value={newFollow}
                            onChange={e => setNewFollow(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                        <button type="button" onClick={addFollow} className="px-2 bg-teal-600 text-white rounded">Add</button>
                    </div>
                    <ul className="list-disc list-inside">
                        {form.followUps.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>

                {/* Audio recording */}
                <div>
                    <label>Voice Recording</label>
                    <div className="space-x-2">
                        <button type="button" onClick={startRec} className="px-3 py-1 bg-teal-600 text-white rounded">Record</button>
                        <button type="button" onClick={stopRec} className="px-3 py-1 bg-gray-300 rounded">Stop</button>
                    </div>
                    {recording && (
                        <audio controls src={URL.createObjectURL(recording)} className="mt-2 block" />
                    )}
                </div>

                {/* Submit */}
                <div className="flex space-x-4">
                    <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>
                    <button type="button" onClick={() => navigate('/notes')} className="px-4 py-2 rounded border">Cancel</button>
                </div>
            </form>
        </MainLayout>
    );
}
