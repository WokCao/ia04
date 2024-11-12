import axiosInstance from './axiosInstance';

// Login function
export const loginAccount = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Login failed');
    }
};

// Register function
export const registerAccount = async (email: string, username: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/register', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Registration failed');
    }
};

// Get user function
export const getUser = async () => {
    try {
        return await axiosInstance.get('/auth/profile');
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Token invalid');
    }
}

// Logout function
export const logoutAccount = async () => {
    try {
        return await axiosInstance.post('/auth/logout');
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error when logging out');
    }
}