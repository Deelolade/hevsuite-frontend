import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  BsCheckCircleFill,
  BsThreeDotsVertical,
  BsXCircleFill,
} from "react-icons/bs";
import Modal from "react-modal";
import avatar from "../../assets/user.avif";

const Evidence = () => {
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [adminList] = useState([
    { id: 1, name: "Admin 1" },
    { id: 2, name: "Admin 2" },
    { id: 3, name: "Admin 3" },
  ]);
  const requests = [
    {
      id: 1,
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
      type: "Evidence Review",
      submissionDate: "Jan 16, 2025",
      status: "Pending",
    },
    {
      id: 2,
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
      type: "Evidence Review",
      submissionDate: "Jan 16, 2025",
      status: "Declined",
    },
  ];

  const handleDetail = (ask) => {
    setSelectedRequest(ask);
    setOpenDetails(true);
    setOpenOptionsId(null);
  };

  const handleAssign = (ask) => {
    setSelectedRequest(ask);
    setIsAssignModalOpen(true);
    setOpenOptionsId(null);
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-primary text-[1A1A1A]">User Requests</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border w-96 rounded-lg"
              />
            </div>
            <select
              className="px-4 py-2 border w-44 rounded-lg font-primary text-[#343434] bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Declined</option>
            </select>
            <button className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
              + Export ↑
            </button>
          </div>
        </div>

        {/* Requests Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b text-quatr font-semibold">
              <th className="text-left py-4">No</th>
              <th className="text-center py-4">User</th>
              <th className="text-left py-4">Type</th>
              <th className="text-left py-4">Submission Date</th>
              <th className="text-left py-4">Status</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b text-quatr">
                <td className="py-4">{request.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={request.user.avatar}
                      alt={request.user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-primary text-[#323C47]">
                      {request.user.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 ">{request.type}</td>
                <td className="py-4">{request.submissionDate}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1  rounded-full text-sm ${
                      request?.status === "Declined" ? "text-red-500" : ""
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-green-600 hover:text-green-700">
                      <BsCheckCircleFill size={24} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-700">
                      <BsXCircleFill size={24} />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        setOpenOptionsId(
                          openOptionsId === request.id ? null : request.id
                        );
                      }}
                    >
                      <BsThreeDotsVertical size={20} />
                    </button>
                    {openOptionsId === request.id && (
                      <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                          onClick={() => handleDetail(request)}
                        >
                          Detail
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 "
                          onClick={() => handleAssign(request)}
                        >
                          Assign Admin
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isAssignModalOpen}
        onRequestClose={() => setIsAssignModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Assign Admin</h2>
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Select Admin</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option value="">Start Typing Admin Name</option>
                {adminList.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={() => {
                  // Handle admin assignment here
                  setIsAssignModalOpen(false);
                }}
              >
                Assign Admin
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-primary font-semibold">
              Request Details
            </h2>
            <button
              onClick={() => setOpenDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRequest?.user?.avatar}
                  alt={selectedRequest?.user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-[#323C47]">
                  {selectedRequest?.user?.name}
                </span>
              </div>
              <span className="text-gray-600">
                {selectedRequest?.user?.email || "Andrew@gmail.com"}
              </span>
            </div>

            {/* Request Type */}
            <div>
              <select
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                disabled
              >
                <option>Evidence Review</option>
              </select>
            </div>

            {/* Preview Images */}
            <div className="flex gap-4">
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <button className="absolute inset-0 text-white hover:bg-black/20 rounded-lg">
                  Preview
                </button>
                <img
                  src="/path/to/evidence1.jpg"
                  alt="Evidence 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <button className="absolute inset-0 text-white hover:bg-black/20 rounded-lg">
                  Preview
                </button>
                <img
                  src="/path/to/evidence2.jpg"
                  alt="Evidence 2"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Request Message */}
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">
                I want You to review my document of residence I want You to
                review my document of residence I want You to review my document
                of residence...
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Evidence;
