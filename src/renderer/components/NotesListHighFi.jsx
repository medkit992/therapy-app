import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, FileText, Eye, Edit2, Trash2 } from 'lucide-react';

const Card = ({ children, className = '' }) => (
    <div className={`${className} bg-white rounded-lg shadow p-4`}>{children}</div>
);
const Button = ({ children, className = '', ...props }) => (
    <button className={`${className} px-4 py-2 rounded hover:shadow transition`} {...props}>
        {children}
    </button>
);
const Input = props => (
    <input
        className="pl-10 pr-4 py-2 w-80 rounded border border-gray-300 focus:ring-2 focus:ring-teal-200"
        {...props}
    />
);

export default function NotesListHighFi({ notes, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col p-6">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Session Notes</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Input placeholder="Search notes..." />
                    </div>
                    <Button
                        className="bg-teal-600 text-white flex items-center space-x-2 px-4 py-2 rounded hover:bg-teal-700 transition"
                        onClick={() => navigate('/notes/new')}
                    >
                        <Plus size={18} /> <span>New Note</span>
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 overflow-auto">
                {notes.map(note => (
                    <Card key={note.id} className="hover:shadow transition flex items-center p-4">
                        <FileText size={24} className="text-teal-600 mr-4" />
                        <div className="flex-1">
                            <div className="text-lg font-medium text-gray-800">{note.title}</div>
                            <div className="text-sm text-gray-500">{note.clientName}</div>
                            <div className="text-sm text-gray-700 mt-1 truncate">{note.content}</div>
                        </div>
                        <div className="flex space-x-2">
                            <Button onClick={() => navigate(`/notes/${note.id}`)}>
                                <Eye size={20} />
                            </Button>
                            <Button onClick={() => navigate(`/notes/${note.id}/edit`)}>
                                <Edit2 size={20} />
                            </Button>
                            <Button onClick={() => onDelete(note.id)}>
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
