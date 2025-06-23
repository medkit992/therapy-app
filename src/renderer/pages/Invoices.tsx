import React, { useEffect, useState } from 'react';
import BillingInvoicingHighFi from '../components/BillingInvoicingHighFi';
import { fetchInvoices, Invoice } from '../api/invoicesApi';

const Invoices: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        fetchInvoices().then(setInvoices).catch(console.error);
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Invoices</h1>

            <div className="space-y-4 mb-6">
                {invoices.length > 0 ? (
                    invoices.map(invoice => (
                        <div key={invoice.id} className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{invoice.clientName}</h2>
                            <p className="text-gray-600 text-sm">
                                Date: {new Date(invoice.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-800 font-medium mt-1">
                                Amount: ${invoice.amount.toFixed(2)}
                            </p>
                            <p className={`font-bold mt-1 ${invoice.status === 'paid'
                                    ? 'text-green-600'
                                    : invoice.status === 'overdue'
                                        ? 'text-red-600'
                                        : 'text-yellow-600'
                                }`}>
                                Status: {invoice.status}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No invoices found.</p>
                )}
            </div>

            <BillingInvoicingHighFi />
        </div>
    );
};

export default Invoices;

