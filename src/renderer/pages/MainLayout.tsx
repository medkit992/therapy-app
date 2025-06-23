import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Clients', path: '/clients' },
        { label: 'Sessions', path: '/sessions' },
        { label: 'Session Notes', path: '/notes' },
        { label: 'Tasks', path: '/tasks' },
        { label: 'Voice Notes', path: '/voice-notes' },
        { label: 'Messages', path: '/messages' },
        { label: 'Files', path: '/files' },
        { label: 'Invoices', path: '/invoices' },
        { label: 'Cloud Sync', path: '/cloud-sync' },
        { label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-8 flex flex-col">
                <h2 className="text-2xl font-bold text-teal-600 mb-8">TherapyApp</h2>
                <nav className="flex-1 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2 rounded ${pathname === item.path
                                    ? 'bg-teal-100 text-teal-600 font-semibold'
                                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
}
