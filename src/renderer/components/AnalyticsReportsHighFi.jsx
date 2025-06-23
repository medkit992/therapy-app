// src/renderer/components/AnalyticsReportsHighFi.jsx
import React from 'react';
import {
    BarChart, Bar,
    LineChart, Line,
    ResponsiveContainer,
    XAxis, YAxis, Tooltip
} from 'recharts';

// UI primitive for cards
const Card = ({ children, className = '' }) => (
    <div className={`${className} bg-white rounded-lg shadow p-6`}>
        {children}
    </div>
);

export default function AnalyticsReportsHighFi({ data }) {
    const {
        totalClients,
        totalSessions,
        revenue,
        averageSessionLengthMinutes,
        // these two should come from your backend or be derived client-side
        sessionTrend = [],
        revenueTrend = [],
    } = data;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-lg font-semibold text-teal-600 mb-2">Total Clients</h3>
                <p className="text-4xl">{totalClients}</p>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold text-teal-600 mb-2">Total Sessions</h3>
                <p className="text-4xl">{totalSessions}</p>
            </Card>

            <Card className="col-span-2">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Average Session Length</h3>
                <p className="text-4xl">{averageSessionLengthMinutes} min</p>
            </Card>

            <Card className="col-span-2">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Session Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sessionTrend}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sessions" stroke="#5FB0B7" />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            <Card className="col-span-2">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueTrend}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#5FB0B7" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
