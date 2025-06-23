// src/renderer/pages/Notes.tsx
import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote } from '../api/notesApi';
import { Note } from '../models/Note';
import NotesListHighFi from '../components/NotesListHighFi';
import MainLayout from './MainLayout';

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes()
            .then(raw => {
                // flatten client relation into clientName
                const mapped = raw.map(n => ({
                    ...n,
                    clientName: (n as any).client?.name || '—',
                }));
                setNotes(mapped);
            })
            .catch(console.error);
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this note?')) return;
        await deleteNote(id);
        setNotes(ns => ns.filter(n => n.id !== id));
    };

    return (
        <MainLayout>
            <NotesListHighFi notes={notes} onDelete={handleDelete} />
        </MainLayout>
    );
};

export default Notes;
