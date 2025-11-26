import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useAuthStore, User } from '@/store/authStore';

const API_URI = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URI,
    withCredentials: true,
});

// Refresh user token
const refreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URI}/auth/refresh-token`, {}, { withCredentials: true });
        return response.data.status === true;
    } catch (error) {
        console.error('Error refreshing user token:', error);
        return false;
    }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
                const newToken = Cookies.get('accessToken');
                if (newToken && originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    const user = useAuthStore.getState().user;
                    useAuthStore.getState().setUserAuth(user as User, newToken);
                }
                return axiosInstance(originalRequest);
            }

            // Logout and redirect
            useAuthStore.getState().logout();
            toast.error('Your session has expired. Please login again.');
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return Promise.reject(new Error('Session expired.'));
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;