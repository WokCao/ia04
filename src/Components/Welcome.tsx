import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
            <p className="mb-6 text-gray-600">Please choose an option to continue</p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/ia04/login')}
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/ia04/register')}
                    className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Welcome;