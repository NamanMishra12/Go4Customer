import { useState } from "react";

const redirectData = [
    {
        id: 1,
        fromUrl: "https://go4customer.com/.lf",
        toUrl: "https://www.go4customer.com/",
        type: 301,
        date: "2016-01-11 15:10:39",
    },
    {
        id: 2,
        fromUrl: "https://go4customer.com/blog",
        toUrl: "https://www.go4customer.com/blog",
        type: 301,
        date: "2015-03-31 16:56:45",
    },
    {
        id: 3,
        fromUrl: "https://go4customer.com/contact",
        toUrl: "https://www.go4customer.com/contact",
        type: 301,
        date: "2015-03-31 16:52:41",
    },
];

function RedirectTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;
    const totalRecords = redirectData.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentRows = redirectData.slice(startIndex, endIndex);
    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 bg-gray-100 border-b">
                <h2 className="font-semibold text-gray-700">
                    Site Configuration
                </h2>
            </div>

            {/* Top controls */}
            <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                    <select className="border rounded px-2 py-1">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>

                    <span className="text-sm text-gray-600">
                        records per page
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Search:</span>

                    <input
                        type="text"
                        className="border rounded px-3 py-1"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 border">
                                From URL
                            </th>

                            <th className="text-left px-4 py-3 border">
                                To URL
                            </th>

                            <th className="text-left px-4 py-3 border">
                                Redirection Type
                            </th>

                            <th className="text-left px-4 py-3 border">
                                Add Date
                            </th>

                            <th className="text-left px-4 py-3 border">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRows.map((row) => (
                            <tr key={row.id}>
                                <td className="border px-4 py-4 text-blue-600">
                                    {row.fromUrl}
                                </td>

                                <td className="border px-4 py-4">
                                    {row.toUrl}
                                </td>

                                <td className="border px-4 py-4">
                                    {row.type}
                                </td>

                                <td className="border px-4 py-4">
                                    {row.date}
                                </td>

                                <td className="border px-4 py-4">
                                    <div className="flex gap-2">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                            Visit
                                        </button>

                                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm">
                                            Edit
                                        </button>

                                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-5">
                <p className="text-sm text-gray-500">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} entries
                </p>

                <div className="flex gap-1">

                    {currentPage > 1 && (
                        <button
                            className="border px-3 py-1 rounded"
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    )}

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`border px-3 py-1 rounded ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : ""
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {currentPage < totalPages && (
                        <button
                            className="border px-3 py-1 rounded"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}

export default RedirectTable;