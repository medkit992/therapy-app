// src/renderer/components/NoteCard.tsx
import React from 'react';
import { Note } from '../models/Note';

interface NoteCardProps {
    note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
    return (
        <div className="p-4 border rounded shadow bg-white">
            <h2 className="text-lg font-bold mb-1">{note.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
                {note.clientName ?? 'No Client'}
            </p>
            <p className="mb-2">{note.content}</p>
            <div className="text-xs text-gray-500">
                Tags:{' '}
                {note.tags && note.tags.length > 0
                    ? note.tags.join(', ')
                    : 'None'}
            </div>
        </div>
    );
}
