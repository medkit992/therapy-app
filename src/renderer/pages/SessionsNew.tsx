import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionType } from '../../types/session';
import { SessionPayload } from '../../types/session';
const [sessionType, setSessionType] = useState<SessionType>(SessionType.INDIVIDUAL);

const SessionsNew: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<SessionPayload>({
        date: '',
        time: '',
        duration: 0,
        isTelehealth: false,
        reminderOffset: 10,
        sessionType: SessionType.INDIVIDUAL,
        attachments: '',
        moodRating: 5,
        notes: '',
        recurrenceRule: '',
        clientId: 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const res = await fetch('http://localhost:3001/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        if (res.ok) navigate('/sessions');
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">New Session</h1>
            <input name="date" placeholder="Date" onChange={handleChange} className="border p-2 w-full" />
            <input name="time" placeholder="Time" onChange={handleChange} className="border p-2 w-full" />
            <input name="duration" type="number" placeholder="Duration" onChange={handleChange} className="border p-2 w-full" />
            <select name="sessionType" onChange={handleChange} className="border p-2 w-full">
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="assessment">Assessment</option>
            </select>
            <textarea name="notes" placeholder="Notes" onChange={handleChange} className="border p-2 w-full" />
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Create</button>
        </div>
    );
};

export default SessionsNew;