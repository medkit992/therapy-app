import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Session } from '../../types/session';

interface SessionCardProps {
    session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
    return (
        <div className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="text-lg font-semibold">{session.sessionType}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span><Calendar size={16} /> {session.date}</span>
                <span><Clock size={16} /> {session.time}</span>
                <span className="flex items-center">
                    <User size={16} /> {session.client?.name}
                </span>
                {session.isTelehealth && (
                    <span className="text-blue-500">Telehealth</span>
                )}
            </div>
        </div>
    );
};

export default SessionCard;