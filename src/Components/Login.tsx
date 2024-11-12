import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from '../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginAccount } from '../API/auth';
import { useLocation } from 'react-router-dom';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormValues>();
    const { login } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const info = location.state?.info || '';

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const response = await loginAccount(data.email, data.password);
            login({ username: response.username, email: response.email, token: response.access_token });
            navigate('/ia04/');
        } catch (error: any) {
            const { message }: { message: string } = error;
            if (message.startsWith('Email')) {
                setError('email', { type: 'manual', message: message });
            } else {
                setError('password', { type: 'manual', message: message });
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
                <p className='text-center text-red-600'>{info}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <Link to={'/ia04/welcome'}>
                    <p className='mt-16 rounded-lg border w-fit p-2 hover:bg-lime-400'>Back to <i>Welcome</i> page</p>
                </Link>
            </div>
        </div>
    );
};

export default Login;
