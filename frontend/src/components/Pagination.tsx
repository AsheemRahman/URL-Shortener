"use client";

interface Props {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, setCurrentPage }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-6 gap-2">
            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
                <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`px-3 py-1 border rounded  ${idx + 1 === currentPage ? "bg-blue-600 text-white" : ""}`}>
                    {idx + 1}
                </button>
            ))}

            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                Next
            </button>
        </div>
    );
}
