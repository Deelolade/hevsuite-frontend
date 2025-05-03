import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingRegistrations, updateUserMembershipStatus } from "../../store/users/userSlice";
import toast from "react-hot-toast";

import Profile from "../../components/Profile";
import ViewPending from "./ViewPending";
import DefaultPending from "./DefaultPending";
import user from "../../assets/user.avif";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";

const Pending = () => {
  const dispatch = useDispatch();
  const { pendingRegistrations, isLoading, pagination } = useSelector((state) => state.user);
  const [showViewPending, setShowViewPending] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchPendingRegistrations({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const filteredUsers = pendingRegistrations?.filter((user) => {
    const fullName = `${user.forename} ${user.surname}`.toLowerCase();
    const email = user.primaryEmail.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();
    return fullName.includes(searchTerm) || email.includes(searchTerm);
  });

  const handleAcceptUser = async (user) => {
    try {
      if (!user || !user._id) {
        toast.error('Invalid user data. Cannot accept user.');
        return;
      }
      
      await dispatch(updateUserMembershipStatus({ userId: user._id, status: 'accepted' })).unwrap();
      // toast.success(`User ${user.forename || ''} ${user.surname || ''} has been accepted`);
      // Refresh the list after accepting a user
      dispatch(fetchPendingRegistrations({ page: currentPage, limit }));
    } catch (error) {
      console.error('Error accepting user:', error);
      toast.error(error || 'Failed to accept user. Please try again.');
    }
  };

  const handleRejectUser = async (user) => {
    try {
      if (!user || !user._id) {
        toast.error('Invalid user data. Cannot reject user.');
        return;
      }
      
      await dispatch(updateUserMembershipStatus({ userId: user._id, status: 'declined' })).unwrap();
      // toast.success(`User ${user.forename || ''} ${user.surname || ''} has been rejected`);
      // Refresh the list after rejecting a user
      dispatch(fetchPendingRegistrations({ page: currentPage, limit }));
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error(error || 'Failed to reject user. Please try again.');
    }
  };

  // Format the user data for the DefaultPending component
  const formattedUsers = filteredUsers?.map((user) => ({
    id: user._id,
    name: `${user.forename || ''} ${user.surname || ''}`.trim() || 'Unknown User',
    registrationId: `ID#${user._id ? user._id.slice(-8) : '00000000'}`,
    email: user.primaryEmail || 'No email provided',
    supportersStatus: "2/3", // This might need to be calculated based on actual data
    joinFeeStatus: user.joinFeeStatus || "Pending",
    avatar: user.profilePhoto || avatar,
    idCard: user.idCardPhoto || idcards,
    photo: user.profilePhoto || avatar,
    // Add all the original user data for the ViewPending component
    ...user
  }));

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const { currentPage, totalPages } = pagination;
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        Previous
      </button>
    );
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        Next
      </button>
    );
    
    return buttons;
  };

  return (
    <div className="space-y-6 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-32 md:w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <Profile />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : showViewPending ? (
        <ViewPending
          setShowViewPending={setShowViewPending}
          viewUser={viewUser}
          onAccept={handleAcceptUser}
          onReject={handleRejectUser}
        />
      ) : (
        <>
        <DefaultPending
            pendingUsers={formattedUsers || []}
          setShowViewPending={setShowViewPending}
          setViewUser={setViewUser}
            onAccept={handleAcceptUser}
            onReject={handleRejectUser}
          />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show:</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">per page</span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {renderPaginationButtons()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Pending;
