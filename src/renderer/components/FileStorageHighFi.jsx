// src/components/FileStorageHighFi.jsx
import React from 'react';
import { Folder, FileText, UploadCloud, Download, Trash2 } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-4`}>{children}</div>
);
const Button = ({ children, className = '', ...props }) => (
  <button className={`${className} px-3 py-2 rounded hover:shadow transition`} {...props}>
    {children}
  </button>
);
const Input = (props) => (
  <input
    className="pl-8 pr-4 py-2 w-full rounded border border-gray-300 focus:ring-2 focus:ring-teal-200"
    {...props}
  />
);

const files = [
  { id: 1, name: 'IntakeForm.pdf', type: 'file', date: 'Jul 10, 2025' },
  { id: 2, name: 'SessionNotes.docx', type: 'file', date: 'Jul 9, 2025' },
  { id: 3, name: 'LabResults', type: 'folder', date: 'Jul 8, 2025' },
];

export default function FileStorageHighFi() {
  return (
    <div className="flex h-screen bg-gray-50 p-6">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Files</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 p-2 hover:bg-teal-50 rounded cursor-pointer">
            <Folder size={16} className="text-teal-600" />
            <span>Root</span>
          </li>
          <li className="flex items-center space-x-2 p-2 hover:bg-teal-50 rounded cursor-pointer ml-4">
            <Folder size={16} className="text-teal-600" />
            <span>LabResults</span>
          </li>
        </ul>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">File Storage</h1>
          <Button className="bg-teal-600 text-white flex items-center space-x-2">
            <UploadCloud size={18} />
            <span>Upload</span>
          </Button>
        </header>
        <div className="relative mb-4">
          <FileText className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input placeholder="Search files..." />
        </div>
        <Card className="overflow-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center space-x-2">
                    {item.type === 'folder' ? <Folder size={16} /> : <FileText size={16} />}
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{item.date}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {item.type === 'file' && (
                      <Button className="bg-teal-200 text-gray-800 p-2">
                        <Download size={16} />
                      </Button>
                    )}
                    <Button className="bg-red-200 text-red-600 p-2">
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}
