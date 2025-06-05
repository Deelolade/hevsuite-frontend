import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingRegistrations, updateUserMembershipStatus } from "../../store/users/userSlice";
import toast from "react-hot-toast";
import { getSettings } from "../../store/setting/settingSlice";

import Profile from "../../components/Profile";
import ViewPending from "./ViewPending";
import DefaultPending from "./DefaultPending";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";

const filterOptions = [
  { label: "New Applications", value: "new" },
  { label: "Declined Applications", value: "declined" },
];
const sortOptions = [
  { label: "Date (Newest)", value: "date-newest" },
  { label: "Date (Oldest)", value: "date-oldest" },
  { label: "Name (A-Z)", value: "name-az" },
  { label: "Name (Z-A)", value: "name-za" },
];

const Pending = () => {
  const dispatch = useDispatch();
  const { pendingRegistrations, isLoading, pagination } = useSelector((state) => state.user);
  const [showViewPending, setShowViewPending] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Access settings from Redux store with proper null checking
  const settings = useSelector((state) => state.settings);
  console.log('Settings from Redux:', settings); // Debug log
  const requiredReferralNumber = settings?.settings?.general?.requiredReferralNumber ?? 3; // Use nullish coalescing
  console.log('Required Referral Number:', requiredReferralNumber); // Debug log

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
      }
    }
    if (showFilterDropdown || showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown, showSortDropdown]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting fetchData...'); // Debug log
        // Fetch both pending registrations and settings
        const response = await dispatch(fetchPendingRegistrations({
          page: currentPage,
          limit,
          filter: selectedFilter,
          sortBy: selectedSort,
        })).unwrap();
        
        console.log('Fetched pending registrations:', response); // Debug log
        
        const settingsResponse = await dispatch(getSettings());
        console.log('Settings fetch response:', settingsResponse); // Debug log
        console.log('Required referral number:', requiredReferralNumber); // Debug log

        // Check for auto-approval candidates
        if (response && response.data && response.data.length > 0) {
          console.log('Processing users for auto-approval...'); // Debug log
          
          const autoApproveCandidates = response.data.filter(user => {
            console.log('Checking user:', user.forename, user.surname); // Debug log
            console.log('User joinFeeStatus:', user.joinFeeStatus); // Debug log
            console.log('User referredBy:', user.referredBy); // Debug log
            
            const approvedSupporters = user.referredBy?.filter(ref => ref.status === 'approved').length || 0;
            console.log('Approved supporters count:', approvedSupporters); // Debug log
            
            // If requiredReferralNumber is 0, only check for paid joining fee
            if (requiredReferralNumber === 0) {
              const shouldApprove = user.joinFeeStatus?.toLowerCase() === 'paid';
              console.log('Should approve (fee only):', shouldApprove); // Debug log
              return shouldApprove;
            }
            
            // Otherwise check both criteria
            const shouldApprove = approvedSupporters === requiredReferralNumber && user.joinFeeStatus?.toLowerCase() === 'paid';
            console.log('Should approve (both criteria):', shouldApprove); // Debug log
            return shouldApprove;
          });

          console.log('Auto-approve candidates:', autoApproveCandidates); // Debug log

          // Auto-approve eligible users
          for (const user of autoApproveCandidates) {
            try {
              console.log('Attempting to auto-approve user:', user.forename, user.surname); // Debug log
              await dispatch(updateUserMembershipStatus({ userId: user._id, status: 'accepted' })).unwrap();
              toast.success(`User ${user.forename} ${user.surname} has been automatically approved`);
              console.log('Successfully auto-approved user:', user.forename, user.surname); // Debug log
            } catch (error) {
              console.error('Error auto-approving user:', error);
              toast.error(`Failed to auto-approve user ${user.forename} ${user.surname}`);
            }
          }

          // Refresh the list after auto-approvals
          if (autoApproveCandidates.length > 0) {
            console.log('Refreshing list after auto-approvals...'); // Debug log
            dispatch(fetchPendingRegistrations({
              page: currentPage,
              limit,
              filter: selectedFilter,
              sortBy: selectedSort,
            }));
          }
        } else {
          console.log('No users to process for auto-approval'); // Debug log
        }
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, [dispatch, currentPage, limit, selectedFilter, selectedSort, requiredReferralNumber]);

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

  // Debug: Log the order of users as received from the backend
  console.log('pendingRegistrations order:', pendingRegistrations?.map(u => `${u.forename} ${u.surname} <${u.primaryEmail}>`));

  const handleAcceptUser = async (user) => {
    try {
      if (!user || !user._id) {
        toast.error('Invalid user data. Cannot accept user.');
        return;
      }

      // Check supporters status
      const approvedSupporters = user.referredBy?.filter(ref => ref.status === 'approved').length || 0;
      if (approvedSupporters < requiredReferralNumber) {
        toast.error(`User needs exactly ${requiredReferralNumber} approved supporters. Current: ${approvedSupporters}`);
        return;
      }

      // Check joining fee status
      if (user.joinFeeStatus?.toLowerCase() !== 'paid') {
        toast.error('User must have paid the joining fee before approval.');
        return;
      }

      await dispatch(updateUserMembershipStatus({ userId: user._id, status: 'accepted' })).unwrap();
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
  const formattedUsers = filteredUsers?.map((user) => {
    const approvedSupporters = user.referredBy?.filter(ref => ref.status === 'approved').length || 0;
    const canBeApproved = approvedSupporters === requiredReferralNumber && user.joinFeeStatus?.toLowerCase() === 'paid';

    return {
      id: user._id,
      name: `${user.forename || ''} ${user.surname || ''}`.trim() || 'Unknown User',
      registrationId: `ID#${user.membershipNumber || '00000000'}`,
      email: user.primaryEmail || 'No email provided',
      supportersStatus: `${approvedSupporters}/${requiredReferralNumber}`,
      avatar: user.profilePhoto || avatar,
      idCard: user.idCardPhoto || idcards,
      photo: user.profilePhoto || avatar,
      canBeApproved, // Add this flag to control approval button state
      // Add all the original user data for the ViewPending component
      ...user
    };
  });

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
        className={`px-3 py-1 rounded ${currentPage === 1
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
          className={`px-3 py-1 rounded ${currentPage === i
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
        className={`px-3 py-1 rounded ${currentPage === totalPages
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
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            showFilterDropdown={showFilterDropdown}
            setShowFilterDropdown={setShowFilterDropdown}
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
            filterOptions={filterOptions}
            sortOptions={sortOptions}
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
