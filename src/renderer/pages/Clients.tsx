// src/renderer/pages/Clients.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from './MainLayout';
import { Client, getClients, deleteClient } from '../api/clientsApi';

export default function Clients() {
    const [clients, setClients] = useState<Client[]>([]);

    // Load all clients on mount
    useEffect(() => {
        async function load() {
            try {
                const all = await getClients();
                setClients(all);
            } catch (err) {
                console.error('Failed to fetch clients', err);
            }
        }
        load();
    }, []);

    // Delete a client and refresh list
    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this client?')) return;
        try {
            await deleteClient(id);
            setClients(clients.filter(c => c.id !== id));
        } catch (err) {
            console.error('Failed to delete client', err);
            alert('Error deleting client');
        }
    };

    return (
        <MainLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Clients</h1>
                    <Link
                        to="/clients/new"
                        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                    >
                        New Client
                    </Link>
                </div>

                {clients.length === 0 ? (
                    <p className="text-gray-500">No clients found.</p>
                ) : (
                    <div className="space-y-4">
                        {clients.map(c => (
                            <div
                                key={c.id}
                                className="bg-white p-4 rounded shadow flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="text-lg font-medium">{c.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        {c.email && <span>Email: {c.email} </span>}
                                        {c.phone && <span>Phone: {c.phone}</span>}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Link
                                        to={`/clients/${c.id}`}
                                        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/clients/${c.id}/edit`}
                                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
