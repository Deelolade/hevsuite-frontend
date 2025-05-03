import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import avatar from "../../assets/user.avif";
import Modal from "react-modal";

import {
  BsThreeDotsVertical,
  BsXCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

const DefaultPending = ({ pendingUsers, setShowViewPending, setViewUser, onAccept, onReject }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date (Newest)");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedActionUser, setSelectedActionUser] = useState(null);

  // Apply filters and sorting when pendingUsers, selectedFilter, or selectedSort changes
  useEffect(() => {
    // Apply filter
    let filtered = [...pendingUsers];
    
    if (selectedFilter === "Fee completed") {
      filtered = filtered.filter(user => user.joinFeeStatus === "Paid");
    } else if (selectedFilter === "Fee pending") {
      filtered = filtered.filter(user => user.joinFeeStatus === "Pending");
    } else if (selectedFilter === "Supporters complete") {
      filtered = filtered.filter(user => user.supportersStatus === "3/3");
    } else if (selectedFilter === "Supporters incomplete") {
      filtered = filtered.filter(user => user.supportersStatus !== "3/3");
    }
    
    // Apply sorting
    let sorted = [...filtered];
    
    if (selectedSort === "Date (Newest)") {
      // Assuming the most recent users are at the end of the array
      // If you have a createdAt field, you can sort by that
      sorted = sorted.sort((a, b) => {
        // If you have a createdAt field, use it for sorting
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        // Otherwise, just keep the original order
        return 0;
      });
    } else if (selectedSort === "Date (Oldest)") {
      sorted = sorted.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return 0;
      });
    } else if (selectedSort === "Name (A-Z)") {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "Name (Z-A)") {
      sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredUsers(sorted);
    setSortedUsers(sorted);
    
    // Calculate total pages
    setTotalPages(Math.ceil(sorted.length / itemsPerPage));
    
    // Reset to first page when filter or sort changes
    setCurrentPage(1);
  }, [pendingUsers, selectedFilter, selectedSort, itemsPerPage]);

  // Get current users for pagination
  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    return sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(getCurrentUsers().map((user) => user.id));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <button 
        key="prev" 
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
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
    );
    
    // Page buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // First page
    if (startPage > 1) {
      buttons.push(
        <button 
          key="first" 
          className="px-3 py-1 text-sm"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="text-sm">...</span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          className={`px-3 py-1 text-sm ${currentPage === i ? 'bg-[#0A5438] text-white rounded' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="text-sm">...</span>
        );
      }
      
      buttons.push(
        <button 
          key="last" 
          className="px-3 py-1 text-sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button 
        key="next" 
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
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
    );
    
    return buttons;
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
                    setSelectedFilter("All");
                    setShowFilterDropdown(false);
                  }}
                >
                  All
                </button>
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
                    setSelectedFilter("Fee pending");
                    setShowFilterDropdown(false);
                  }}
                >
                  Fee pending
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedFilter("Supporters complete");
                    setShowFilterDropdown(false);
                  }}
                >
                  Supporters complete
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedFilter("Supporters incomplete");
                    setShowFilterDropdown(false);
                  }}
                >
                  Supporters incomplete
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
                    setSelectedSort("Date (Newest)");
                    setShowSortDropdown(false);
                  }}
                >
                  Date (Newest)
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedSort("Date (Oldest)");
                    setShowSortDropdown(false);
                  }}
                >
                  Date (Oldest)
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedSort("Name (A-Z)");
                    setShowSortDropdown(false);
                  }}
                >
                  Name (A-Z)
                </button>
                <button
                  className="w-full px-6 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 font-primary"
                  onClick={() => {
                    setSelectedSort("Name (Z-A)");
                    setShowSortDropdown(false);
                  }}
                >
                  Name (Z-A)
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
            {getCurrentUsers().map((user) => (
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
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Show result:</span>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            {renderPaginationButtons()}
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
                    handleAccept(selectedActionUser);
                  } else {
                    handleReject(selectedActionUser);
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
