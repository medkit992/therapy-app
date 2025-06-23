// src/services/apiClient.ts
import axios, { AxiosInstance } from 'axios';

class ApiClient
{
    private http: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL = 'http://localhost:4000/')
    {
        this.http = axios.create({ baseURL });
    }

    // ─── Authentication ─────────────────────────────────────────────────

    async register(email: string, password: string)
    {
        return this.http.post('/auth/register', { email, password });
    }

    async login(email: string, password: string)
    {
        const resp = await this.http.post('/auth/login', { email, password });
        this.token = resp.data.token;
        this.http.defaults.headers.common['Authorization'] = `Bearer ${ this.token}`;
        return resp.data;
    }

    // ─── Clients ─────────────────────────────────────────────────────────

    async getClients() {
        const resp = await this.http.get('/clients');
        return resp.data as { id: string; firstName: string; lastName: string; email: string; phone: string; dateOfBirth: string }[];
    }

    async createClient(payload: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
    }) {
        const resp = await this.http.post('/clients', payload);
        return resp.data;
    }

// ─── Sessions ────────────────────────────────────────────────────────

async getSessions()
{
    const resp = await this.http.get('/sessions');
    return resp.data;
}

async createSession(session: { client: { id: string }; date: string; durationMinutes: number; notes: string; }) {
    const resp = await this.http.post('/sessions', session);
    return resp.data;
}

  // ─── Add more methods for notes, tasks, voicenotes, etc. ──────────────
}

export const api = new ApiClient();
export default api;
