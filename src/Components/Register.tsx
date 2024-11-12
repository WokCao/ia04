import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerAccount } from '../API/auth';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<RegisterFormValues>();
    const [info, setInfo] = useState("");
    const [internalError, setInternalError] = useState("");
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const { username, email, password } = data;
        try {
            const response = await registerAccount(email, username, password);
            setInfo(response.message);
            setInternalError("");
            setTimeout(() => {
                navigate('/ia04/login')
            }, 1000);
        } catch (error: any) {
            setInfo("");
            const { message }: { message: string } = error;

            if (message.startsWith('(email)')) {
                setError("email", { type: "manual", message: message });
            } else if (message.startsWith('(username)')) {
                setError("username", { type: "manual", message: message });
            } else {
                setInternalError(message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
                <p className='text-center text-green-600'>{info}</p>
                <p className='text-center text-red-600'>{internalError}</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                                maxLength: { value: 30, message: 'Password must be at most 30 characters long' }
                            })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Confirm password</label>
                        <input
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                                maxLength: { value: 30, message: 'Password must be at most 30 characters long' },
                                validate: (value) => value === watch('password') || 'Passwords do not match'
                            })}
                            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Register
                    </button>
                </form>

                <Link to={'/ia04/welcome'}>
                    <p className='mt-16 rounded-lg border w-fit p-2 hover:bg-lime-400'>Back to <i>Welcome</i> page</p>
                </Link>
            </div>
        </div>
    );
};

export default Register;