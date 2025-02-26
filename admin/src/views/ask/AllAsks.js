import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import AllAskDetails from "../../components/modals/ask/AllAskDetails";
import AllAskRemove from "../../components/modals/ask/AllAskRemove";
import avatar from "../../assets/user.avif";

const AllAsks = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedAsk, setSelectedAsk] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleEdit = (ask) => {
    setSelectedAsk(ask);
    setOpenDetails(true);
    setOpenSettingsId(null);
  };

  const handleRemove = (ask) => {
    setSelectedAsk(ask);
    setIsRemoveModalOpen(true);
    setOpenSettingsId(null);
  };

  const asks = [
    {
      id: 1,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 2,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 3,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 4,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 5,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 6,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 7,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
    {
      id: 8,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]">
          <option>Current Ask</option>
          <option>Claimed Ask</option>
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
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      setOpenSettingsId(
                        openSettingsId === ask.id ? null : ask.id
                      );
                    }}
                  >
                    <FiSettings size={20} />
                  </button>
                  {openSettingsId === ask.id && (
                    <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                      <button
                        className="w-full px-4 py-2 text-left font-primary font-medium text-sm hover:bg-gray-50"
                        onClick={() => handleEdit(ask)}
                      >
                        Detail
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                        onClick={() => handleRemove(ask)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
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
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <AllAskDetails
          setOpenDetails={setOpenDetails}
          selectedAsk={selectedAsk}
        />
      </Modal>
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <AllAskRemove setIsRemoveModalOpen={setIsRemoveModalOpen} />
      </Modal>
    </div>
  );
};

export default AllAsks;
