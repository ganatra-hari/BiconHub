import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // 1. Check if the user is logged in by looking for their data in LocalStorage
    const userInfo = localStorage.getItem('userInfo');

    // 2. If they are NOT logged in, kick them to the login page immediately
    if (!userInfo) {
        // 'replace' prevents them from clicking the back button to bypass this
        return <Navigate to="/login" replace />; 
    }

    // 3. If they ARE logged in, let them inside!
    return children;
};

export default ProtectedRoute;