'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import urlApi from '@/app/service/urlApi';
import { useAuthStore } from '@/store/authStore';

import { Url } from '@/types/types';
import UrlList from "@/components/UrlList";



export default function Dashboard() {
    const router = useRouter();
    const [urls, setUrls] = useState<Url[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            return;
        }
        fetchUrls();
    }, [user, router]);

    const fetchUrls = async () => {
        try {
            const response = await urlApi.getUrls();
            if (response.status) {
                setUrls(response.urls || []);
                setLoading(false);
            }
        } catch (error) {
            console.log("error while fetching urls", error)
            setError('Failed to fetch URLs');
        }
    };

    const handleCreateUrl = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const response = await urlApi.createURL(newUrl);
            if (response.status) {
                setUrls([response.url, ...urls]);
                setNewUrl('');
            } else {
                setError(response.message || 'Failed to create short URL');
            }
        } catch (error) {
            console.log("error while creating new url", error)
            setError('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await urlApi.deleteURL(id);
            if (response?.status) {
                setUrls(urls.filter(url => url.id !== id));
            } else {
                setError('An error occurred while deleteing URL');
            }
        } catch (error) {
            console.log("error while deleting url", error)
            setError('Failed to delete URL');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl text-black font-bold mb-8">Dashboard</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl text-black font-semibold mb-4">Create Short URL</h2>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleCreateUrl} className="flex gap-4">
                    <input type="url" required value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Enter your long URL here..."
                        className="flex-1 text-black px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                        {submitting ? 'Creating...' : 'Shorten'}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl text-black font-semibold mb-4">Your URLs</h2>
                <UrlList urls={urls} onDelete={handleDelete} />
            </div>
        </div>
    );
}