'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import authApi from '@/app/service/authApi';
import { useAuthStore } from '@/store/authStore';


export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuthStore();
    const authStore = useAuthStore();

    const handleLogout = async () => {
        const response = await authApi.logoutApi();
        if (response?.status) {
            authStore.logout()
            router.replace('/login');
        }
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        URL Shortener
                    </Link>

                    <div className="flex gap-4">
                        {user ? (
                            <>
                                <Link href="/dashboard" className={`px-4 py-2 rounded-md  ${pathname === '/dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                    Dashboard
                                </Link>
                                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                    Login
                                </Link>
                                <Link href="/register" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
