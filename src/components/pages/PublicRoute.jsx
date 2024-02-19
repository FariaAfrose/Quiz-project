import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute() {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" /> : <Outlet />;
}
