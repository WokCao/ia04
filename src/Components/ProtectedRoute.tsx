import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../API/auth';
import { useUser } from '../Contexts/UserContext';


const ProtectedRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { login } = useUser();
    const [info, setInfo] = useState("");
    const location = useLocation();

    const checkUserAuthentication = async () => {
        try {
            const response = await getUser();
            const token = localStorage.getItem('accessToken');
            if (token) {
                login({ email: response.data.email, username: response.data.username, token: token });
                setIsAuthenticated(true);
            } else {
                setInfo('Invalid token');
                setIsAuthenticated(false);
            }
        } catch (error: any) {
            setInfo(error.message);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkUserAuthentication();
    }, [location]);


    if (isAuthenticated === null) {
        return <div className='text-center text-4xl'>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return location.pathname === "/ia04/" ? (
            <Navigate to="/ia04/welcome" replace />
        ) : (
            <Navigate to="/ia04/login" state={{info}} replace />
        );
    }

    // If the user is authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
