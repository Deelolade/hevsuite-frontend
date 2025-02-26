import React, { useState } from "react";
import userAvatar from "../../assets/user.avif";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import PromoteAsk from "../../components/modals/ask/PromoteAsk";

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
    {
      id: 2,
      rank: "2",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    {
      id: 3,
      rank: "3",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    {
      id: 4,
      rank: "4",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    {
      id: 5,
      rank: "5",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    {
      id: 6,
      rank: "6",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
    {
      id: 7,
      rank: "7",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
      asksClaimed: 120,
      asksDelivered: 100,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b text-[#7D7D7D]">
              <th className="w-12 py-4 px-6 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="text-center py-4 px-6">User</th>
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
                  <div className="flex items-center gap-2 ">
                    <img
                      src={asker.user.avatar}
                      alt={asker.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-primary">{asker.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{asker.asksClaimed}</td>
                <td className="py-4 px-6 text-gray-600">
                  {asker.asksDelivered}
                </td>
                <td className="py-4 px-6">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg"
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
        <PromoteAsk
          setIsPromoteModalOpen={setIsPromoteModalOpen}
          selectedUser={selectedUser}
        />
      </Modal>
    </div>
  );
};

export default TopAsks;
