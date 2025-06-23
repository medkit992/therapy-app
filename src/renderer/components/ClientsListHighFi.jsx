import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Plus, User, Eye, Edit2, Trash2 } from 'lucide-react';

/**
 * @typedef {{ id: number; name: string; next: string }} ClientWithNext
 */
/**
 * @param {{ clients: ClientWithNext[]; onDelete: (id: number) => void }} props
 */
export default function ClientsListHighFi({ clients, onDelete }) {
    // UI primitives
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

    // full nav
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analytics', path: '/analytics' },
        { name: 'Clients', path: '/clients' },
        { name: 'Client History', path: '/client-history' },
        { name: 'Cloud Sync', path: '/cloud-sync' },
        { name: 'Files', path: '/files' },
        { name: 'Invoices', path: '/invoices' },
        { name: 'Messages', path: '/messages' },
        { name: 'Notes', path: '/notes' },
        { name: 'Sessions', path: '/sessions' },
        { name: 'Tasks', path: '/tasks' },
        { name: 'Voice Notes', path: '/voice-notes' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-teal-600 mb-8">TherapyApp</h2>
                <nav className="flex-1 space-y-4">
                    {navItems.map(({ name, path }) => (
                        <NavLink
                            to={path}
                            key={name}
                            className={({ isActive }) =>
                                (isActive
                                    ? 'bg-teal-100 text-teal-600'
                                    : 'text-gray-700 hover:bg-teal-100 hover:text-teal-600') +
                                ' block'
                            }
                        >
                            <Button className="w-full text-left">{name}</Button>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col p-6">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                            />
                            <Input placeholder="Search clients..." />
                        </div>
                        <NavLink to="/clients/new">
                            <Button className="bg-teal-600 text-white flex items-center space-x-2">
                                <Plus size={18} /> <span>New Client</span>
                            </Button>
                        </NavLink>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-4 overflow-auto">
                    {clients.map(c => (
                        <Card key={c.id} className="hover:shadow transition flex items-center p-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium mr-4">
                                {c.name
                                    .split(' ')
                                    .map(part => part[0])
                                    .join('')}
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-medium text-gray-800">{c.name}</div>
                                <div className="text-sm text-gray-500">Next: {c.next}</div>
                            </div>
                            <div className="flex space-x-2">
                                <NavLink to={`/clients/${c.id}`}>
                                    <Button><Eye size={20} /></Button>
                                </NavLink>
                                <NavLink to={`/clients/${c.id}/edit`}>
                                    <Button><Edit2 size={20} /></Button>
                                </NavLink>
                                <Button onClick={() => onDelete(c.id)}><Trash2 size={20} /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
