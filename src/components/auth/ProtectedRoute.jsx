import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const ProtectedRoute = ({children}) => {
    // get user data from context provider
    const { user } = useAuth();

    // only allow access to app if the user is authenticated, otherwise direct to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children; 
}

export default ProtectedRoute; 