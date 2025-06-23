// src/renderer/components/DashboardHighFi.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Plus, Search } from 'lucide-react';

/** 
 * @typedef {Object} Metrics 
 * @property {number} clientCount
 * @property {number} noteCount
 * @property {number} sessionCount
 * @property {number} fileCount
 * @property {number} taskCount
 */

/**
 * @param {{ metrics: Metrics }} props
 */
export default function DashboardHighFi({ metrics }) {
    const { clientCount, noteCount, sessionCount, fileCount, taskCount } = metrics;

    const Card = ({ children, className = '' }) => (
        <div className={`${className} bg-white rounded-lg shadow p-6`}>{children}</div>
    );
    const Button = ({ children, className = '' }) => (
        <button className={`${className} px-4 py-2 rounded hover:shadow-md transition`}>
            {children}
        </button>
    );
    const Input = (props) => (
        <input
            className="pl-10 pr-4 py-2 w-80 rounded border border-gray-300 focus:ring-2 focus:ring-teal-200"
            {...props}
        />
    );

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

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between bg-white p-6 shadow-sm">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <Input placeholder="Search clients, notes..." />
                    </div>
                    <div className="flex items-center space-x-6">
                        <Bell className="text-gray-600 hover:text-teal-600 transition" size={24} />
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium">
                            JD
                        </div>
                    </div>
                </header>

                {/* Dashboard Cards */}
                <main className="p-6 grid grid-cols-2 gap-6 flex-grow overflow-auto">
                    {/* Today's Sessions */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-teal-600">Today's Sessions</h3>
                            <span className="bg-teal-200 text-teal-800 text-sm px-2 py-1 rounded-full">
                                {sessionCount}
                            </span>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex justify-between hover:bg-teal-50 rounded p-2">
                                <span className="font-medium">Jane Doe</span>
                                <span className="text-gray-500">10:00 AM</span>
                            </li>
                        </ul>
                    </Card>

                    {/* Pending Messages */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-teal-600">Pending Messages</h3>
                        </div>
                        <p className="text-gray-600">No new messages.</p>
                    </Card>

                    {/* Recent Client Notes */}
                    <Card className="col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-teal-600">Recent Client Notes</h3>
                            <span className="bg-teal-200 text-teal-800 text-sm px-2 py-1 rounded-full">
                                {noteCount}
                            </span>
                        </div>
                        <ul className="space-y-2">
                            <li className="text-gray-700 hover:underline">
                                Jane Doe: Reviewed coping skills progress...
                            </li>
                        </ul>
                    </Card>

                    {/* Current Tasks */}
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-teal-600">Current Tasks</h3>
                            <span className="bg-teal-200 text-teal-800 text-sm px-2 py-1 rounded-full">
                                {taskCount}
                            </span>
                        </div>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>Follow up with Client A</span>
                                <span className="text-gray-500">Due Jul 11</span>
                            </li>
                        </ul>
                    </Card>
                </main>

                {/* Floating Action Button */}
                <Button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition">
                    <Plus size={28} />
                </Button>
            </div>
        </div>
    );
}
