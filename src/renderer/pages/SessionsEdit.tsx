import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Session, SessionPayload } from '../../types/session';

const SessionsEdit: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<SessionPayload>({});

    useEffect(() => {
        async function fetchSession() {
            const res = await fetch(`http://localhost:3001/sessions/${id}`);
            const data: Session = await res.json();
            setForm({ ...data });
        }
        fetchSession();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:3001/sessions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        if (res.ok) navigate('/sessions');
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Edit Session</h1>
            <input name="date" value={form.date || ''} onChange={handleChange} className="border p-2 w-full" />
            <input name="time" value={form.time || ''} onChange={handleChange} className="border p-2 w-full" />
            <input name="duration" type="number" value={form.duration || 0} onChange={handleChange} className="border p-2 w-full" />
            <select name="sessionType" value={form.sessionType || 'individual'} onChange={handleChange} className="border p-2 w-full">
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="assessment">Assessment</option>
            </select>
            <textarea name="notes" value={form.notes || ''} onChange={handleChange} className="border p-2 w-full" />
            <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Update</button>
        </div>
    );
};

export default SessionsEdit;
