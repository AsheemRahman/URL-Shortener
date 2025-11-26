"use client"

import { Url } from "@/types/types";
import { ExternalLink, Trash2, LinkIcon } from "lucide-react";
import Pagination from "./Pagination";
import { useState } from "react";

interface Props {
    urls: Url[];
    onDelete: (id: string) => void;
}

export default function UrlList({ urls, onDelete }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(urls.length / perPage);
    const start = (currentPage - 1) * perPage;
    const paginatedData = urls.slice(start, start + perPage);

    // const copyToClipboard = (text: string) => {
    //     navigator.clipboard.writeText(text);
    // };

    if (urls.length === 0)
        return (
            <p className="text-gray-500 text-center py-8">
                No URLs yet. Create your first one!
            </p>
        );

    return (
        <div className="space-y-4">
            {paginatedData.map((url) => (
                <div key={url.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <LinkIcon className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-600">
                                    {typeof window !== "undefined" ? `${window.location.origin}/${url.shortId}` : url.shortId}
                                </span>

                                {/* <button onClick={() => copyToClipboard(`${window.location.origin}/${url.shortId}`)} className="p-1 hover:bg-gray-200 rounded" title="Copy">
                                    <Copy className="w-4 h-4 text-gray-600" />
                                </button> */}
                            </div>

                            <p className="text-sm text-gray-600 truncate">
                                {url.originalUrl}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Created: {new Date(url.createdAt!).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <a href={url.originalUrl} target="_blank" className="p-2 hover:bg-blue-50 rounded">
                                <ExternalLink className="w-5 h-5 text-blue-600" />
                            </a>

                            <button onClick={() => onDelete(url.id)} className="p-2 hover:bg-red-50 rounded" title="Delete">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Pagination Component */}
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
