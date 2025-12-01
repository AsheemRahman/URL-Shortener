'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authApi from '@/app/service/authApi';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";


export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '', });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUserAuth, user, token: userToken } = useAuthStore();

    useEffect(() => {
        if (user && userToken) {
            window.location.href = "/dashboard";
        }
    }, [user, userToken]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await authApi.LoginPost(formData);
            console.log("response from login", response);
            if (response.status && response.accessToken && response.user) {
                const { user, accessToken } = response;
                setUserAuth(user, accessToken);
                Cookies.set("accessToken", response.accessToken, { expires: 1 });   // 1 day
                Cookies.set("refreshToken", response.refreshToken, { expires: 7 }); // 7 days
                toast.success("Login Successfully!");
                router.push("/dashboard");
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (error) {
            console.log("error while login", error)
            // setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl text-black font-bold text-center mb-6">Welcome Back</h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full text-black px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full text-black px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};