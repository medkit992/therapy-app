// src/renderer/components/SessionsListHighFi.jsx
import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SessionsListHighFi({ sessions, onDelete }) {
    return (
        <div className="space-y-4">
            {sessions.map((s) => (
                <div
                    key={s.id}
                    className="bg-white p-4 rounded shadow flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 text-sm">
                            <span>
                                <Calendar size={16} /> {s.date}
                            </span>
                            <span>
                                <Clock size={16} /> {s.time} ({s.duration} min)
                            </span>
                            {s.isTelehealth && (
                                <span className="flex items-center">
                                    <Video size={16} /> Telehealth
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="space-x-2">
                        <Link
                            to={`/sessions/${s.id}`}
                            className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                        >
                            View
                        </Link>
                        <Link
                            to={`/sessions/${s.id}/edit`}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => onDelete(s.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                        {s.isTelehealth && (
                            <a
                                href={s.telehealthUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Join
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
