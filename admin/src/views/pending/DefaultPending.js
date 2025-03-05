import React, { useState } from "react";

import {
  BsThreeDotsVertical,
  BsXCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import Modal from "react-modal";

const DefaultPending = ({ pendingUsers, setShowViewPending, setViewUser }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [selectedSort, setSelectedSort] = useState("Sort by");

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedActionUser, setSelectedActionUser] = useState(null);

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

  const handleRowClick = (user) => {
    // console.log(user)
    setViewUser(user);
    setShowViewPending(true);
  };

  const handleActionClick = (action, user, e) => {
    e.stopPropagation();
    setSelectedAction(action);
    setSelectedActionUser(user);
    setIsActionModalOpen(true);
  };

  const handleAcceptUser = (user) => {
    console.log(`User accepted:`, user);
  };

  const handleRejectUser = (user) => {
    console.log(`User rejected:`, user);
  };

  return (
    <>
      <div className="flex justify-end md:gap-8 gap-4 mb-6">
        {/* Filter Button */}
        <div className="relative">
          <button
            className="px-6 py-2.5 border rounded-lg text-gray-600  bg-white flex items-center gap-2 min-w-32"
            onClick={() => {
              setShowFilterDropdown(!showFilterDropdown);
              setShowSortDropdown(false);
            }}
          >
            <span className="text-gray-500 font-montserrat">
              {selectedFilter}
            </span>
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
            <div className="absolute left-0 md:right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
              <div className="py-2">
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedFilter("Fee completed");
                    setShowFilterDropdown(false);
                  }}
                >
                  Fee completed
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedFilter("Complete supporter status");
                    setShowFilterDropdown(false);
                  }}
                >
                  Complete supporter status
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sort By Button */}
        <div className="relative">
          <button
            className="px-6 py-2.5 border rounded-lg text-gray-600 bg-white flex items-center gap-2 min-w-32"
            onClick={() => {
              setShowSortDropdown(!showSortDropdown);
              setShowFilterDropdown(false);
            }}
          >
            <span className="text-gray-500 font-montserrat">
              {selectedSort}
            </span>
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
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedSort("Date");
                    setShowSortDropdown(false);
                  }}
                >
                  Date
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedSort("Alphabet");
                    setShowSortDropdown(false);
                  }}
                >
                  Alphabet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white w-[90vw] md:w-full overflow-auto p-0 rounded-lg shadow-sm">
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
                onClick={() => handleRowClick(user)}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-6 py-4 w-60">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-sm">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {user.registrationId}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-gray-500 text-center text-sm">
                  {user.supportersStatus}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {user.joinFeeStatus}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-green-600 hover:text-green-700"
                      onClick={(e) => handleActionClick("accept", user, e)}
                    >
                      <BsCheckCircleFill size={24} />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-700"
                      onClick={(e) => handleActionClick("reject", user, e)}
                    >
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
        <Modal
          isOpen={isActionModalOpen}
          onRequestClose={() => setIsActionModalOpen(false)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[93vw]"
          overlayClassName="fixed inset-0 bg-black/50"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {selectedAction === "accept" ? "Accept User" : "Reject User"}
              </h2>
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {selectedActionUser && (
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedActionUser.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{selectedActionUser.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedActionUser.email}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Are you sure you want to{" "}
                  {selectedAction === "accept" ? "accept" : "reject"} this user?
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedAction === "accept") {
                    handleAcceptUser(selectedActionUser);
                  } else {
                    handleRejectUser(selectedActionUser);
                  }
                  setIsActionModalOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedAction === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {selectedAction === "accept" ? "Accept" : "Reject"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DefaultPending;
