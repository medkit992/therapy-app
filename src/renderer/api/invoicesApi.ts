import axios from 'axios';

export interface Invoice {
    id: string;
    clientName: string;
    amount: number;
    date: string;
    status: 'paid' | 'unpaid' | 'overdue';
}

export const fetchInvoices = async (): Promise<Invoice[]> => {
    const response = await axios.get('http://localhost:4000/api/invoices');
    return response.data;
};
