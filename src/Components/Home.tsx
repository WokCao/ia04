// Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import { logoutAccount } from '../API/auth';

const Home: React.FC = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAccount();
        logout();
        localStorage.removeItem('accessToken');
        navigate('/ia04/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80 text-center">
                <h2 className="text-2xl font-semibold mb-4">Home</h2>
                <div className='flex items-center justify-around'>
                    <button
                        onClick={() => navigate('/ia04/profile')}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        View Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;