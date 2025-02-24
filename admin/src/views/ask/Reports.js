import React, { useState } from "react";
import userAvatar from "../../assets/event-image.png";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import { BsCalendar } from "react-icons/bs";

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(2);

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const reports = [
    {
      id: 1,
      title: "Request for Event Volunteers",
      type: "Harassment",
      user: {
        name: "Andrew Bojangles",
        avatar: userAvatar,
      },
    },
    // Add more items as needed
  ];

  const handleEdit = (report) => {
    setSelectedReport(report);
    setIsEditModalOpen(true);
    setOpenSettingsId(null);
    setOpenDetails(true);
  };

  const handleRemove = (report) => {
    setSelectedReport(report);
    setIsRemoveModalOpen(true);
    setOpenSettingsId(null);
  };

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
              <th className="text-left py-4 px-6">Title</th>
              <th className="text-left py-4 px-6">Type</th>
              <th className="text-left py-4 px-6">User</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="py-4 px-6">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-4 px-6">{report.title}</td>
                <td className="py-4 px-6 text-gray-600">{report.type}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={report.user.avatar}
                      alt={report.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{report.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      setOpenSettingsId(
                        openSettingsId === report.id ? null : report.id
                      );
                    }}
                  >
                    <FiSettings size={20} />
                  </button>
                  {openSettingsId === report.id && (
                    <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={() => handleEdit(report)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                        onClick={() => handleRemove(report)}
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
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Ask Details</h2>
            <button
              onClick={() => setOpenDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {selectedReport && (
            <div className="space-y-6">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedReport.user.avatar}
                  alt={selectedReport.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedReport.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    andrewbojangles@gmail.com
                  </p>
                </div>
              </div>

              {/* Ask Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Ask Title</label>
                  <div className="px-4 py-2 border rounded-lg bg-gray-50">
                    {selectedReport.title}
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Descriptions</label>
                  <div className="px-4 py-2 border rounded-lg bg-gray-50 min-h-[80px]">
                    Looking for volunteers to assist at the annual || charity
                    event this weekend.
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Deadline</label>
                  <div className="px-4 py-2 border rounded-lg bg-gray-50 flex justify-between items-center">
                    <span>23 January, 2025!</span>
                    <BsCalendar className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-4">
                <button
                  className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
                  onClick={() => setIsBanModalOpen(true)}
                >
                  Ban Ask
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={isBanModalOpen}
        onRequestClose={() => setIsBanModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl">⚠</span>
              <h2 className="text-xl font-semibold">Ban Ask</h2>
            </div>
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to ban this Ask? Removing this content will
              permanently erase it from the website when saved.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsBanModalOpen(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle ban confirmation
                  setIsBanModalOpen(false);
                  setOpenDetails(false);
                }}
                className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reports;
