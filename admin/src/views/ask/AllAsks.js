import React, { useState } from "react";

const AllAsks = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const asks = [
    {
      id: 1,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: "/avatars/user1.jpg",
      },
    },
    // ... repeat similar objects for other rows
  ];
  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]">
          <option>Current Ask</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-12 py-4 px-6 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-4 px-6">Title</th>
              <th className="text-left py-4 px-6">User</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {asks.map((ask) => (
              <tr key={ask.id} className="border-b">
                <td className="py-4 px-6">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-4 px-6">{ask.title}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={ask.user.avatar}
                      alt={ask.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{ask.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div>
          Show result:
          <select className="ml-2 px-2 py-1 border rounded">
            <option>6</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {[1, 2, 3, 4, "...", 20].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                currentPage === page
                  ? "bg-green-800 text-white"
                  : "text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllAsks;
