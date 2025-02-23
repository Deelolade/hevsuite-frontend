import React, { useState } from "react";
import {
  BsThreeDotsVertical,
  BsXCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

const Pending = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const pendingUsers = [
    {
      id: 1,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 7,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(pendingUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end gap-4 mb-6">
        {/* Filter Button */}
        <div className="relative">
          <button
            className="px-6 py-2.5 border rounded-lg text-gray-600 bg-white flex items-center gap-2 min-w-[140px]"
            onClick={() => {
              setShowFilterDropdown(!showFilterDropdown);
              setShowSortDropdown(false);
            }}
          >
            <span className="text-gray-800">Filter</span>
            <svg
              className="w-5 h-5 ml-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
              <div className="py-2">
                <button className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Fee completed
                </button>
                <button className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Complete supporter status
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort By Button */}
        <div className="relative">
          <button
            className="px-6 py-2.5 border rounded-lg text-gray-600 bg-white flex items-center gap-2 min-w-[140px]"
            onClick={() => {
              setShowSortDropdown(!showSortDropdown);
              setShowFilterDropdown(false);
            }}
          >
            <span className="text-gray-800">Sort by</span>
            <svg
              className="w-5 h-5 ml-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
              <div className="py-2">
                <button className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Date
                </button>
                <button className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Alphabet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Registration ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Supporters Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Join Fee Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {user.registrationId}
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4 text-gray-500">
                  {user.supportersStatus}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {user.joinFeeStatus}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-green-600 hover:text-green-700">
                      <BsCheckCircleFill size={24} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-700">
                      <BsXCircleFill size={24} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                      <BsThreeDotsVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Show result:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>6</option>
              <option>12</option>
              <option>24</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="px-3 py-1 text-sm">1</button>
            <button className="px-3 py-1 text-sm bg-[#0A5438] text-white rounded">
              2
            </button>
            <button className="px-3 py-1 text-sm">3</button>
            <button className="px-3 py-1 text-sm">4</button>
            <span className="text-sm">...</span>
            <button className="px-3 py-1 text-sm">20</button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
