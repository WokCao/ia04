import React from 'react';
import { useUser } from '../Contexts/UserContext';

const Profile: React.FC = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80 text-center">
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                <p className="text-gray-600 text-3xl">Welcome, {user?.username}</p>
            </div>
        </div>
    );
};

export default Profile;
