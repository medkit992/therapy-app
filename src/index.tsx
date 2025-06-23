import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './renderer/pages/App';
import { AuthProvider } from './renderer/context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
