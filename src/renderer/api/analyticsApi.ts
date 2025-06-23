// src/renderer/api/analyticsApi.ts
import axios from 'axios';

export interface AnalyticsData {
    totalClients: number;
    totalSessions: number;
    revenue: number;
    averageSessionLengthMinutes: number;
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
    const response = await axios.get<AnalyticsData>('/api/analytics');
    return response.data;
}
