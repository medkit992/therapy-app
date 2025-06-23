import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
