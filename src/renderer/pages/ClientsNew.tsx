// src/renderer/pages/ClientsNew.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClientsNew: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/clients', {
                name,
                email,
                phone,
                dateOfBirth,
                address,
                emergencyContactName,
                emergencyContactPhone,
                notes,
            });
            navigate('/clients');
        } catch (err) {
            console.error('Failed creating client:', err);
            alert('Error creating client');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-6">New Client</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text" required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Jane Doe"
                    />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="jane@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 mb-1">Address</label>
                    <textarea
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="123 Main St, Anytown, USA"
                    />
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Emergency Contact Name</label>
                        <input
                            type="text"
                            value={emergencyContactName}
                            onChange={e => setEmergencyContactName(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Emergency Contact Phone</label>
                        <input
                            type="tel"
                            value={emergencyContactPhone}
                            onChange={e => setEmergencyContactPhone(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="(555) 987-6543"
                        />
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Any extra info"
                    />
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/clients')}
                        className="px-4 py-2 rounded border"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientsNew;
