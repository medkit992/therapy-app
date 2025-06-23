// src/renderer/pages/ClientsEdit.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface ClientForm {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    notes: string;
}

const ClientsEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<ClientForm>({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        notes: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<ClientForm>(`/api/clients/${id}`)
            .then(res => {
                // ensure date formatted for <input type="date">
                const client = res.data;
                setForm({
                    name: client.name || '',
                    email: client.email || '',
                    phone: client.phone || '',
                    dateOfBirth: client.dateOfBirth || '',
                    address: client.address || '',
                    emergencyContactName: client.emergencyContactName || '',
                    emergencyContactPhone: client.emergencyContactPhone || '',
                    notes: client.notes || '',
                });
            })
            .catch(() => navigate('/clients'))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    const handleChange = (field: keyof ClientForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/api/clients/${id}`, form);
            navigate(`/clients/${id}`);
        } catch (err) {
            console.error('Failed updating client:', err);
            alert('Error updating client');
        }
    };

    if (loading) return <p className="p-6">Loading client...</p>;

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Edit Client</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => handleChange('email', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => handleChange('phone', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={e => handleChange('dateOfBirth', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 mb-1">Address</label>
                    <textarea
                        value={form.address}
                        onChange={e => handleChange('address', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                    />
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Emergency Contact Name</label>
                        <input
                            type="text"
                            value={form.emergencyContactName}
                            onChange={e => handleChange('emergencyContactName', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Emergency Contact Phone</label>
                        <input
                            type="tel"
                            value={form.emergencyContactPhone}
                            onChange={e => handleChange('emergencyContactPhone', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                        value={form.notes}
                        onChange={e => handleChange('notes', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                    />
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/clients/${id}`)}
                        className="px-4 py-2 rounded border"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientsEdit;
