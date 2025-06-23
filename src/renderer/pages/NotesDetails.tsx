// src/renderer/pages/NotesDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Eye, ArrowLeft, Edit2 } from 'lucide-react';
import MainLayout from './MainLayout';
import { fetchNote } from '../api/notesApi';
import { Note } from '../models/Note';

export default function NotesDetails() {
    const { id: idParam } = useParams<{ id: string }>();
    const id = idParam ? Number(idParam) : null;
    const navigate = useNavigate();

    const [note, setNote] = useState<Note | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'metadata' | 'recording'>('content');

    useEffect(() => {
        if (!id) {
            navigate('/notes');
            return;
        }
        fetchNote(id)
            .then(n => setNote(n))
            .catch(() => navigate('/notes'));
    }, [id, navigate]);

    if (!note) {
        return (
            <MainLayout>
                <p className="text-center py-10">Loading note…</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-teal-600"
                    >
                        <ArrowLeft size={20} /> <span>Back</span>
                    </button>
                    <h1 className="text-2xl font-semibold">{note.title}</h1>
                </div>
                <button
                    onClick={() => navigate(`/notes/${id}/edit`)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-teal-600"
                >
                    <Edit2 size={18} /> <span>Edit</span>
                </button>
            </div>

            {/* Tab selectors */}
            <div className="flex space-x-4 border-b mb-6">
                {['content', 'metadata', 'recording'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-2 ${activeTab === tab
                                ? 'border-b-2 border-teal-600 text-teal-600'
                                : 'text-gray-600 hover:text-teal-800'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Main content area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: content or recording */}
                <div className="lg:col-span-2">
                    {activeTab === 'content' && (
                        <section>
                            <h2 className="text-xl font-medium mb-2">Content</h2>
                            <p className="whitespace-pre-wrap">{note.content}</p>
                        </section>
                    )}
                    {activeTab === 'recording' && (
                        <section>
                            <h2 className="text-xl font-medium mb-2">Recording & Summary</h2>
                            {note.audioUrl ? (
                                <>
                                    <audio controls src={note.audioUrl} className="w-full mb-4" />
                                    <h3 className="font-semibold mb-1">AI Summary</h3>
                                    <p className="whitespace-pre-wrap">{note.summary}</p>
                                </>
                            ) : (
                                <p className="text-gray-500">No recording available.</p>
                            )}
                        </section>
                    )}
                </div>

                {/* Right: metadata */}
                {activeTab === 'metadata' && (
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-medium mb-2">Metadata</h2>
                            <ul className="space-y-1">
                                <li>
                                    <strong>Type:</strong> {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                                </li>
                                <li>
                                    <strong>Date & Time:</strong>{' '}
                                    {new Date(note.dateTime).toLocaleString()}
                                </li>
                                {note.clientId && note.clientName && (
                                    <li>
                                        <strong>Client:</strong>{' '}
                                        <Link
                                            to={`/clients/${note.clientId}`}
                                            className="text-teal-600 hover:underline"
                                        >
                                            {note.clientName}
                                        </Link>
                                    </li>
                                )}
                                {note.sessionId && (
                                    <li>
                                        <strong>Session:</strong>{' '}
                                        <Link
                                            to={`/sessions/${note.sessionId}`}
                                            className="text-teal-600 hover:underline"
                                        >
                                            View session
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <strong>Tags:</strong>{' '}
                                    {note.tags && note.tags.length > 0 ? (
                                        note.tags.map(t => (
                                            <span
                                                key={t}
                                                className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded mr-1 mb-1 text-xs"
                                            >
                                                {t}
                                            </span>
                                        ))
                                    ) : (
                                        'None'
                                    )}
                                </li>
                                <li>
                                    <strong>Mood:</strong>{' '}
                                    {note.mood != null ? (
                                        <span>{note.mood} / 10</span>
                                    ) : (
                                        'Not set'
                                    )}
                                </li>
                                {note.followUps && note.followUps.length > 0 && (
                                    <li>
                                        <strong>Follow-Ups:</strong>
                                        <ul className="list-disc list-inside mt-1">
                                            {note.followUps.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
