import React, { useState } from "react";
import userAvatar from "../../assets/event-image.png";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";

const TopAsks = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Add modal content
  const handlePromote = (asker) => {
    setSelectedUser(asker);
    setIsPromoteModalOpen(true);
  };

  const topAskers = [
    {
      id: 1,
      rank: "1",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    // Add more items with incrementing ranks
  ];

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-12 py-4 px-6 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-left py-4 px-6">User</th>
              <th className="text-left py-4 px-6">Ask Claimed</th>
              <th className="text-left py-4 px-6">Ask Delivered</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topAskers.map((asker) => (
              <tr key={asker.id} className="border-b">
                <td className="py-4 px-6">{asker.rank}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={asker.user.avatar}
                      alt={asker.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{asker.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{asker.asksClaimed}</td>
                <td className="py-4 px-6 text-gray-600">
                  {asker.asksDelivered}
                </td>
                <td className="py-4 px-6">
                  <button
                    className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
                    onClick={() => handlePromote(asker)}
                  >
                    Promote
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
      <Modal
        isOpen={isPromoteModalOpen}
        onRequestClose={() => setIsPromoteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Promote User</h2>
            <button
              onClick={() => setIsPromoteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {selectedUser && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.user.avatar}
                  alt={selectedUser.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedUser.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    andrewbojangles@gmail.com
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Askes Claimed</label>
                  <div className="px-4 py-2 border rounded-lg bg-gray-50">
                    {selectedUser.asksClaimed}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Asks Delivered</label>
                  <div className="px-4 py-2 border rounded-lg bg-gray-50">
                    {selectedUser.asksDelivered}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Promote</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>VIP Member</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsPromoteModalOpen(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
                  onClick={() => {
                    // Handle promotion
                    setIsPromoteModalOpen(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TopAsks;
