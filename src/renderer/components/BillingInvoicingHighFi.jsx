import React from 'react';
import { Card } from 'lucide-react'; // stub your Card import if you have a UI library
import { Button } from 'lucide-react';
import { PlusCircle, Send, CreditCard } from 'lucide-react';

// Simple stubs (remove these if you have shared UI primitives)
const StubCard = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-6`}>{children}</div>
);
const StubButton = ({ children, className = '', ...props }) => (
  <button className={`${className} px-4 py-2 rounded hover:shadow transition`} {...props}>
    {children}
  </button>
);

const invoices = [
  { id: 1, client: 'Jane Doe', due: 'Jul 15, 2025', amount: '$150.00', status: 'Unpaid' },
  { id: 2, client: 'John Smith', due: 'Jul 10, 2025', amount: '$200.00', status: 'Paid' },
  { id: 3, client: 'Alice Lee', due: 'Aug 1, 2025', amount: '$175.00', status: 'Unpaid' },
];

export default function BillingInvoicingHighFi() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-teal-600 mb-8">Billing</h2>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
          <StubButton className="bg-teal-600 text-white flex items-center space-x-2">
            <PlusCircle size={18} /> <span>New Invoice</span>
          </StubButton>
        </div>
        <StubCard className="overflow-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Client</th>
                <th className="px-4 py-2 text-left">Due Date</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{inv.client}</td>
                  <td className="px-4 py-2">{inv.due}</td>
                  <td className="px-4 py-2">{inv.amount}</td>
                  <td className={`px-4 py-2 ${inv.status === 'Unpaid' ? 'text-red-600' : 'text-green-600'}`}>
                    {inv.status}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <StubButton className="bg-blue-500 text-white p-1">
                      <Send size={16} />
                    </StubButton>
                    <StubButton className="bg-green-500 text-white p-1">
                      <CreditCard size={16} />
                    </StubButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StubCard>
      </main>
    </div>
  );
}
