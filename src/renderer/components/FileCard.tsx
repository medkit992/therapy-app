import React from 'react';

interface FileMeta {
    id: string;
    name: string;
    path: string;
    size: number;
}

const FileCard: React.FC<{ file: FileMeta }> = ({ file }) => {
    return (
        <div className="bg-white rounded-lg border p-4 shadow">
            <h3 className="font-semibold">{file.name}</h3>
            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
            >
                Download
            </a>
        </div>
    );
};

export default FileCard;
