import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileCard from '../components/FileCard';

interface FileMeta {
    id: string;
    name: string;
    path: string;
    size: number;
}

const Files: React.FC = () => {
    const [files, setFiles] = useState<FileMeta[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        axios.get('/api/files').then(res => setFiles(res.data));
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        const res = await axios.post('/api/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setFiles(prev => [...prev, res.data]);
        setSelectedFile(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="bg-white p-6 border rounded-xl shadow space-y-4">
                <h2 className="text-xl font-bold">Upload File</h2>
                <input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Upload
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {files.map(file => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
};

export default Files;
