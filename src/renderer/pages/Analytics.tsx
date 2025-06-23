// src/renderer/pages/Analytics.tsx
import React, { useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import AnalyticsReportsHighFi from '../components/AnalyticsReportsHighFi';
import { fetchAnalytics, AnalyticsData } from '../api/analyticsApi';

const Analytics: React.FC = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        fetchAnalytics()
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics &amp; Reports</h1>
            {data ? (
                <AnalyticsReportsHighFi data={data} />
                ) : (
                <p>Loading metrics…</p>
                )}
            </MainLayout>
        );
};

export default Analytics;
