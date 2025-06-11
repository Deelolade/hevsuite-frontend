import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import avatar from "../../assets/user.avif";
import Modal from "react-modal";
import { useSelector } from "react-redux";

import {
  BsThreeDotsVertical,
  BsXCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

const DefaultPending = ({ pendingUsers, setShowViewPending, setViewUser, onAccept, onReject, selectedFilter, setSelectedFilter, selectedSort, setSelectedSort, showFilterDropdown, setShowFilterDropdown, showSortDropdown, setShowSortDropdown, filterOptions, sortOptions }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedActionUser, setSelectedActionUser] = useState(null);
  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Get required referral number from settings
  const settings = useSelector((state) => state.settings);
  const requiredReferralNumber = settings?.settings?.general?.requiredReferralNumber ?? 3;

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

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowViewPending(true);
  };

  const handleAccept = (user) => {
    onAccept(user);
  };

  const handleReject = (user) => {
    onReject(user);
  };

  const handleActionClick = (action, user, e) => {
    e.stopPropagation();
    setSelectedAction(action);
    setSelectedActionUser(user);
    setIsActionModalOpen(true);
  };

  const getSupportersStatusColor = (user) => {
    const [current, required] = user.supportersStatus.split('/').map(Number);
    
    // If current equals required, it's complete (green)
    if (current === required) return "bg-green-500";
    
    // If current is 0, it's no supporters (red)
    if (current === 0) return "bg-red-500";
    
    // If current is less than required, it's in progress (yellow)
    if (current < required) return "bg-yellow-500";
    
    // If current is more than required (shouldn't happen but just in case)
    return "bg-green-500";
  };

  const getSupportersStatusText = (user) => {
    const [current, required] = user.supportersStatus.split('/').map(Number);
    
    // If current equals required, it's complete
    if (current === required) return "Complete";
    
    // If current is 0, it's no supporters
    if (current === 0) return "No Supporters";
    
    // If current is less than required, show progress
    if (current < required) return `${current}/${required} Supporters`;
    
    // If current is more than required (shouldn't happen but just in case)
    return "Complete";
  };

  return (
    <>
      {/* Filter and Sort dropdowns above the table, right-aligned */}
      <div className="flex justify-end gap-4 mb-2">
        <div className="relative inline-block">
          <button
            className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={e => { e.stopPropagation(); setShowFilterDropdown(prev => !prev); setShowSortDropdown(false); }}
            type="button"
          >
            {filterOptions.find(opt => opt.value === selectedFilter)?.label || 'Filter'}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
          </button>
          {showFilterDropdown && (
            <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {filterOptions.map(opt => (
                <button
                  key={opt.value}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 "
                  onClick={e => { e.stopPropagation(); setSelectedFilter(opt.value); setShowFilterDropdown(false); }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <button
            className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
            onClick={e => { e.stopPropagation(); setShowSortDropdown(prev => !prev); setShowFilterDropdown(false); }}
            type="button"
          >
            {sortOptions.find(opt => opt.value === selectedSort)?.label || 'Sort by'}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 3-3" /></svg>
          </button>
          {showSortDropdown && (
            <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={e => { e.stopPropagation(); setSelectedSort(opt.value); setShowSortDropdown(false); }}
                >
                  {opt.label}
                </button>
              ))}
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
                onClick={() => handleViewUser(user)}
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
                <td className="px-6 py-4 text-sm">
                  {/* <div className="flex flex-col gap-1"> */}
                    <span className={`px-2 py-1 rounded text-white ${getSupportersStatusColor(user)}`}>
                      {user.supportersStatus}
                    </span>
                    {/* <span className="text-xs text-gray-500">
                      {getSupportersStatusText(user)}
                    </span> */}
                  {/* </div> */}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    user.joinFeeStatus?.toLowerCase() === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.joinFeeStatus === "paid" ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className='p-1 text-green-600 hover:text-green-700' 
                      onClick={(e) => {
                        e.stopPropagation();

                          handleActionClick("accept", user, e);
                        
                      }}
                      // title={!user.canBeApproved ? 'Cannot approve: Requirements not met' : 'Approve user'}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:text-red-700"
                      onClick={(e) => handleActionClick("reject", user, e)}
                    >
                      <FaTimes />
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
                    handleAccept(selectedActionUser);
                  } else {
                    handleReject(selectedActionUser);
                  }
                  setIsActionModalOpen(false);
                }}
                className={`px-4 py-2 rounded-lg text-white ${selectedAction === "accept"
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