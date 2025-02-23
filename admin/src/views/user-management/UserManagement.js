import React, { useState } from "react";
import Modal from "react-modal";
import { BiSearch } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

// Set the app element for accessibility
Modal.setAppElement("#root");

const UserManagement = () => {
  const [expandedUser, setExpandedUser] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleEditClick = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };
  const users = [
    {
      id: 1,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      loyaltyLevel: "Member",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      loyaltyLevel: "Member",
      avatar: "https://via.placeholder.com/40",
    },
    // Duplicate this object 7 more times with different IDs
  ];
  return (
    <div className="p-6 space-y-6">
      {/* Header section - updated styles */}
      <button
        onClick={() => setIsInviteModalOpen(true)}
        className="bg-[#540A26] text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
      >
        <span className="text-sm font-medium">Invite</span>
        <IoMdAdd size={20} />
      </button>
      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={() => setIsInviteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
        contentLabel="Invite New Users"
      >
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Invite New Users
          </h2>
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Enter Email Address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#540A26] text-sm"
            />
          </div>
          <button
            onClick={() => {
              // Handle invite logic here
              setIsInviteModalOpen(false);
              setInviteEmail("");
            }}
            className="w-full bg-[#540A26] text-white py-3 rounded-2xl mt-6 text-sm font-medium hover:bg-[#540A26]/90 transition-colors"
          >
            Invite
          </button>
        </div>
      </Modal>
      <div className="flex justify-between gap-4">
        <div className="flex-1 relative w-[300px]">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none text-sm"
          />
        </div>
        <div className="relative">
          <select className="appearance-none px-6 py-2.5 pr-10 border rounded-lg text-gray-600 bg-white min-w-[140px] text-sm focus:outline-none cursor-pointer">
            <option>Members</option>
            <option>VIP</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg
              className="w-4 h-4 text-gray-400"
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
          </div>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
      {/* Table section - updated styles */}
      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                No
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
                Loyalty Level
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <tr
                  className={`border-b ${
                    expandedUser === user.id ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.registrationId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.loyaltyLevel}
                  </td>
                  <td className="px-6 py-4">
                    {expandedUser === user.id ? (
                      <button className="px-5 py-1.5 bg-[#540A26] text-white rounded-lg text-sm font-medium">
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user.id)}
                        className="text-[#540A26] hover:text-[#540A26]/80"
                      >
                        <BsPencil size={18} />
                      </button>
                    )}
                  </td>
                </tr>

                {expandedUser === user.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-6 bg-white border-b">
                      <div className="space-y-8">
                        {/* Checkboxes */}
                        <div className="flex gap-12">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-[#540A26]"
                            />
                            <span className="text-sm text-gray-500">
                              Restrict User
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-[#540A26]"
                            />
                            <span className="text-sm text-gray-500">
                              Ban User
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-[#540A26]"
                            />
                            <span className="text-sm text-gray-500">
                              Reset Password
                            </span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-[#540A26]"
                            />
                            <span className="text-sm text-gray-500">
                              Request New Verification
                            </span>
                          </label>
                        </div>

                        {/* Three Column Layout */}
                        <div className="grid grid-cols-3 gap-6">
                          {/* Events Attended */}
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-base font-medium mb-4">
                              Events Attended
                            </h3>
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <th className="text-left text-sm text-gray-500 font-normal pb-3">
                                    No
                                  </th>
                                  <th className="text-left text-sm text-gray-500 font-normal pb-3">
                                    Event Name
                                  </th>
                                  <th className="text-left text-sm text-gray-500 font-normal pb-3">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[1, 2, 3, 4].map((num) => (
                                  <tr
                                    key={num}
                                    className="border-b border-gray-50 last:border-0"
                                  >
                                    <td className="py-3 text-sm">{num}</td>
                                    <td className="py-3 text-sm">
                                      The Bout Lions
                                    </td>
                                    <td className="py-3">
                                      <button className="text-[#540A26] text-sm hover:text-[#540A26]/80">
                                        View more
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="flex items-center justify-center gap-2 mt-4">
                              <button className="p-1 text-gray-400">
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
                              <button className="px-2 py-1 text-sm">1</button>
                              <button className="px-2 py-1 text-sm bg-[#0A5438] text-white rounded">
                                2
                              </button>
                              <button className="px-2 py-1 text-sm">3</button>
                              <span className="text-sm">...</span>
                              <button className="px-2 py-1 text-sm">20</button>
                              <button className="p-1 text-gray-400">
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

                          {/* Activity */}
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-base font-medium mb-4">
                              Activity
                            </h3>
                            <div className="space-y-4">
                              {[1, 2, 3, 4].map((num) => (
                                <div
                                  key={num}
                                  className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0"
                                >
                                  <span className="text-sm text-gray-500">
                                    Recently logged in Jan21, 2025
                                  </span>
                                  <button className="text-gray-400">...</button>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                              <button className="p-1 text-gray-400">
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
                              <button className="px-2 py-1 text-sm">1</button>
                              <button className="px-2 py-1 text-sm bg-[#0A5438] text-white rounded">
                                2
                              </button>
                              <button className="px-2 py-1 text-sm">3</button>
                              <span className="text-sm">...</span>
                              <button className="px-2 py-1 text-sm">20</button>
                              <button className="p-1 text-gray-400">
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

                          {/* User Documents */}
                          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-base font-medium mb-4">
                              User Documents
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <div className="relative">
                                  <img
                                    src="https://via.placeholder.com/300x150"
                                    alt="ID Card"
                                    className="w-full h-[100px] object-cover rounded-lg"
                                  />
                                  <button className="absolute top-3 right-3 px-4 py-1 bg-black/50 text-white rounded-md text-sm hover:bg-black/60">
                                    Preview
                                  </button>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  ID Card
                                </p>
                              </div>
                              <div>
                                <div className="relative">
                                  <img
                                    src="https://via.placeholder.com/300x150"
                                    alt="Photo"
                                    className="w-full h-[100px] object-cover rounded-lg"
                                  />
                                  <button className="absolute top-3 right-3 px-4 py-1 bg-black/50 text-white rounded-md text-sm hover:bg-black/60">
                                    Preview
                                  </button>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  Photo
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination - updated styles */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Show result:</span>
            <select className="border rounded-md px-2 py-1 text-sm min-w-[60px]">
              <option>6</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500">
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
            <button className="p-2 text-gray-500">
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

export default UserManagement;
