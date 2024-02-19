import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

 function PrivateRoute() {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
