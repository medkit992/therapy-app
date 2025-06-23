import React from "react";
import { useParams, Link } from "react-router-dom";

interface Session {
    id: number;
    title: string;
    date: string;
    time: string;
    duration: number;
    clientName: string;
    notes?: string;
}

const SessionsDetails: React.FC = () => {
    const { id } = useParams();
    const session: Session = {
        id: Number(id),
        title: "Example Session",
        date: "2025-06-22",
        time: "3:00 PM",
        duration: 60,
        clientName: "Jane Doe",
        notes: "Therapy focused on stress management.",
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{session.title}</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><strong>Date:</strong> {session.date}</div>
                <div><strong>Time:</strong> {session.time}</div>
                <div><strong>Duration:</strong> {session.duration} minutes</div>
                <div><strong>Client:</strong> {session.clientName}</div>
                <div className="col-span-2">
                    <strong>Notes:</strong>
                    <p>{session.notes}</p>
                </div>
            </div>
        </div>
    );
};

export default SessionsDetails;
