import { useAuth } from '../context/AuthContext'; // <- Must be first
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email && password) {
            login();
            navigate('/dashboard');
        } else {
            alert('Missing email or password');
        }
        <div>Login works ✅</div>;
        return;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full mb-4 p-3 border rounded-md"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full mb-4 p-3 border rounded-md"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;

