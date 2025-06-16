import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { BiCheck, BiSearch } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import Profile from '../../components/Profile';
import InviteUsers from '../../components/modals/users/InviteUsers';
import avatar from '../../assets/defualtuser.webp';
import idcards from '../../assets/Id.jpg';
import edit_icon from '../../assets/icons/edit3.png';
import Pagination from '../../components/Pagination';
import { memberUsers, inviteUser, editUser, resetUserPassword, requestNewVerification, updateUserStatus, getUserEvents, getUserActivity } from '../../store/users/userSlice';
import toast from 'react-hot-toast';
import { FaSearch, FaFilter, FaEdit, FaSave, FaBan, FaUserLock, FaKey, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { format } from 'date-fns';

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 10;

const UserManagement = () => {
  const dispatch = useDispatch();
  const {
    member_users,
    isLoading,
    isError,
    message,
    userEvents,
    userActivity,
    eventsPagination,
    activityPagination
  } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showRequestVerificationModal, setShowRequestVerificationModal] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [editingUser, setEditingUser] = useState(null);
  const [eventsPage, setEventsPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  // Fetch all users when component mounts or when search/role changes
  useEffect(() => {
    dispatch(memberUsers({ 
      page: currentPage, 
      search, 
      role
    }));
  }, [dispatch, search, role, currentPage]);

  // Filter users based on status
  const filteredUsers = member_users?.filter(user => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Active') return !user.isBanned && !user.isRestricted && !user.isDeactivated && !user.isClosed;
    if (selectedFilter === 'Restricted') return user.isRestricted;
    if (selectedFilter === 'Banned') return user.isBanned;
    if (selectedFilter === 'Deactivated') return user.isDeactivated;
    if (selectedFilter === 'Closed Account') return user.isClosed;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, endIndex);

  useEffect(() => {
    if (expandedUser) {
      dispatch(getUserEvents({ userId: expandedUser, page: eventsPage }));
      dispatch(getUserActivity({ userId: expandedUser, page: activityPage }));
    }
  }, [expandedUser, eventsPage, activityPage, dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRoleFilter = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
    if (userId) {
      const user = member_users.find(u => u._id === userId);
      setEditingUser(user);
    } else {
      setEditingUser(null);
    }
  };

  const handleCancelClick = () => {
    setExpandedUser(null);
    setEditingUser(null);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      // If status has changed, update it first
      if (editingUser.isRestricted !== member_users.find(u => u._id === editingUser._id)?.isRestricted) {
        await handleUpdateStatus(editingUser._id, editingUser.isRestricted ? 'restrict' : 'unrestrict');
      }
      if (editingUser.isBanned !== member_users.find(u => u._id === editingUser._id)?.isBanned) {
        await handleUpdateStatus(editingUser._id, editingUser.isBanned ? 'ban' : 'unban');
      }

      // Update the local state immediately
      const updatedUsers = member_users.map(user =>
        user._id === editingUser._id ? editingUser : user
      );
      dispatch({ type: 'user/setUsers', payload: updatedUsers });

      setExpandedUser(null);
      setEditingUser(null);
      // toast.success('User updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleInviteUser = async () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    await dispatch(inviteUser(inviteEmail));
    setInviteEmail("");
    setIsInviteModalOpen(false);
  };

  const handleResetPassword = async (userId) => {
    await dispatch(resetUserPassword(userId));
  };

  const handleRequestVerification = async (userId) => {
    await dispatch(requestNewVerification(userId));
  };

  const handleUpdateStatus = async (userId, action) => {
    try {
      let status;
      switch (action) {
        case 'restrict':
          status = 'restrict';
          break;
        case 'unrestrict':
          status = 'unrestrict';
          break;
        case 'ban':
          status = 'ban';
          break;
        case 'unban':
          status = 'unban';
          break;
        default:
          toast.error('Invalid action');
          return;
      }

      const result = await dispatch(updateUserStatus({ userId, status })).unwrap();

      // Get the updated user status from the result
      if (result && result.user) {
        let statusMessage;
        if (result.user.isBanned && result.user.isRestricted) {
          statusMessage = 'User is now banned and restricted';
        } else if (result.user.isBanned) {
          statusMessage = 'User is now banned';
        } else if (result.user.isRestricted) {
          statusMessage = 'User is now restricted';
        } else {
          statusMessage = 'User is now active';
        }

        // Show only one toast message
        toast.success(statusMessage);
      }

      // Refresh the user list without showing additional notifications
      dispatch(memberUsers({ page: currentPage, search, role }));
    } catch (error) {
      toast.error(error.message || `Failed to ${action} user`);
    }
  };

  // Add a function to determine the user's status display
  const getUserStatusDisplay = (user) => {
    if (user.isBanned) return 'Banned';
    if (user.isRestricted) return 'Restricted';
    if (user.isDeactivated) return 'Deactivated';
    if (user.isClosed) return 'Closed Account';
    return 'Active';
  };

  // Add a function to get the status badge color
  const getStatusBadgeColor = (user) => {
    if (user.isBanned) return 'bg-red-100 text-red-800';
    if (user.isRestricted) return 'bg-yellow-100 text-yellow-800';
    if (user.isDeactivated) return 'bg-orange-100 text-orange-800';
    if (user.isClosed) return 'bg-gray-100 text-gray-800';
    return 'bg-green-100 text-green-800';
  };

  // Add confirmation modal component
  const ConfirmModal = ({ isOpen, onClose, action, userId }) => {
    const user = member_users?.find(u => u._id === userId);
    const isRestricted = user?.isRestricted;
    const isBanned = user?.isBanned;

    const getModalContent = () => {
      switch (action) {
        case 'restrict':
          return {
            title: isRestricted ? 'Enable User' : 'Restrict User',
            message: isRestricted 
              ? 'Are you sure you want to enable this user? This will remove their restrictions and restore full access.'
              : 'Are you sure you want to restrict this user? This will limit their access to certain features.',
            confirmText: isRestricted ? 'Enable User' : 'Restrict User'
          };
        case 'ban':
          return {
            title: isBanned ? 'Unban User' : 'Ban User',
            message: isBanned
              ? 'Are you sure you want to unban this user? This will restore their access to the platform.'
              : 'Are you sure you want to ban this user? This will completely block their access to the platform.',
            confirmText: isBanned ? 'Unban User' : 'Ban User'
          };
        case 'resetPassword':
          return {
            title: 'Reset Password',
            message: 'Are you sure you want to send password reset link to this user\'s? They will receive an email with instructions to set a new password.',
            confirmText: 'Reset Password'
          };
        case 'requestVerification':
          return {
            title: 'Request New Verification',
            message: 'Are you sure you want to send a new verification request to this user?',
            confirmText: 'Send Request'
          };
        default:
          return {
            title: 'Confirm Action',
            message: 'Are you sure you want to proceed with this action?',
            confirmText: 'Confirm'
          };
      }
    };

    const content = getModalContent();

    const handleConfirm = async () => {
      try {
        switch (action) {
          case 'restrict':
            await handleUpdateStatus(userId, isRestricted ? 'unrestrict' : 'restrict');
            // Update local state
            setEditingUser(prev => ({
              ...prev,
              isRestricted: !isRestricted
            }));
            break;
          case 'ban':
            await handleUpdateStatus(userId, isBanned ? 'unban' : 'ban');
            // Update local state
            setEditingUser(prev => ({
              ...prev,
              isBanned: !isBanned
            }));
            break;
          case 'resetPassword':
            await handleResetPassword(userId);
            break;
          case 'requestVerification':
            await handleRequestVerification(userId);
            break;
        }
        onClose();
      } catch (error) {
        toast.error(error.message || 'Failed to perform action');
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{content.title}</h2>
            <button onClick={onClose} className="text-gray-400">✕</button>
          </div>
          <p className="text-gray-600 mb-6">{content.message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`px-4 py-2 rounded-lg text-sm ${
                action === 'ban' || action === 'restrict'
                  ? isBanned || isRestricted
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                  : 'bg-primary hover:bg-primary/90'
              } text-white`}
            >
              {content.confirmText}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  // Add UserDetailsModal component
  const UserDetailsModal = ({ isOpen, onClose, user }) => {
    if (!user) return null;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[600px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">User Registration Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex items-start gap-6">
              <img
                src={user.profilePhoto || avatar}
                alt="Profile"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{user.forename} {user.surname}</h3>
                <p className="text-gray-600">ID#{user.membershipNumber || '00000000'}</p>
                <p className="text-gray-600">{user.primaryEmail}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Title</p>
                  <p className="font-medium">{user.title || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">{user.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{user.dob ? format(new Date(user.dob), 'MMM dd, yyyy') : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium">{user.nationality || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship Status</p>
                  <p className="font-medium capitalize">{user.relationshipStatus || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employment Status</p>
                  <p className="font-medium capitalize">{user.employmentStatus || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.primaryPhone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.primaryEmail}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Address</h4>
              <div className="space-y-2">
                <p className="font-medium">{user.addressLine1 || 'N/A'}</p>
                <p className="text-gray-600">{user.city || 'N/A'}, {user.country || 'N/A'}</p>
                <p className="text-gray-600">{user.postcode || 'N/A'}</p>
              </div>
            </div>

            {/* Membership Information */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Membership Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Membership Status</p>
                  <p className="font-medium capitalize">{user.membershipStatus || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Fee Status</p>
                  <p className="font-medium capitalize">{user.joinFeeStatus || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loyalty Level</p>
                  <p className="font-medium capitalize">{user.roleName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="font-medium">{user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Club Member</p>
                  <p className="font-medium capitalize">{user.isClubMember || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Admin Approval</p>
                  <p className="font-medium capitalize">{user.approvedByAdmin ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Verification Status</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email Verification</p>
                  <p className="font-medium capitalize">{user.isEmailVerified ? 'Verified' : 'Not Verified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Verification</p>
                  <p className="font-medium capitalize">{user.isPhoneVerified ? 'Verified' : 'Not Verified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">2FA Status</p>
                  <p className="font-medium capitalize">{user.is2FAEnabled ? 'Enabled' : 'Disabled'}</p>
                </div>
                {user.is2FAEnabled && (
                  <div>
                    <p className="text-sm text-gray-500">2FA Method</p>
                    <p className="font-medium capitalize">{user.twoFAMethod || 'N/A'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preferences */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Preferences</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Preferred Social Media</p>
                  <div className="flex flex-wrap gap-2">
                    {user.preferredSocialMedia && user.preferredSocialMedia.length > 0 ? (
                      user.preferredSocialMedia.map((platform, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                          {platform}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600">None selected</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {user.userInterests && user.userInterests.length > 0 ? (
                      user.userInterests.map((interest, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600">None selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className='md:px-6 space-y-6'>
      {/* Header section - updated styles */}
      <div className='flex items-center justify-end'>
        <Profile />
      </div>
      <button
        onClick={() => setIsInviteModalOpen(true)}
        className='bg-primary text-white px-6 py-2.5 rounded-lg flex justify-center items-center gap-2 w-44'
      >
        <span className='text-sm font-medium font-montserrat '>Invite</span>
        <IoMdAdd size={20} />
      </button>
      <div className='flex justify-between gap-4'>
        <div className='flex-1 relative w-full'>
          <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl' />
          <input
            type='text'
            placeholder='Search...'
            className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none text-sm'
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className='relative'>
          <select
            value={role}
            onChange={handleRoleFilter}
            className='appearance-none px-6 py-2.5 pr-10 border rounded-lg text-gray-600 bg-white min-w-32 text-sm focus:outline-none cursor-pointer'
          >
            <option value=''>All Members</option>
            <option value='Standard Member'>Standard Member</option>
            <option value='vip'>VIP Member</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3'>
            <svg
              className='w-4 h-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        <div className='relative'>
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className='px-6 py-2.5 border rounded-lg text-gray-600 bg-white flex items-center gap-2 text-sm focus:outline-none'
          >
            <FaFilter className='text-gray-400' />
            {selectedFilter}
            {showFilterDropdown ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showFilterDropdown && (
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10'>
              {['All', 'Active', 'Restricted', 'Banned', 'Deactivated', 'Closed Account'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedFilter(status);
                    setShowFilterDropdown(false);
                    setCurrentPage(1); // Reset to first page when changing filters
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedFilter === status
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Table section - updated styles */}
      <div className='bg-white w-[90vw] md:w-full overflow-auto  rounded-lg shadow-sm'>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-40 text-red-500">
            {message || 'An error occurred while fetching users'}
          </div>
        ) : (
        <table className='w-full'>
          <thead>
            <tr className='border-b'>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                No
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                User
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Registration ID
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Email
              </th>
                <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                  Status
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Loyalty Level
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
              {currentUsers && currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
              <React.Fragment key={user._id}>
                <tr
                      className={`border-b ${expandedUser === user._id ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {startIndex + index + 1}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <img
                            src={user.profilePhoto || avatar}
                        alt=''
                        className='w-10 h-10 rounded-full object-cover'
                        onClick={() => {
                          setSelectedUserDetails(user);
                          setShowUserDetailsModal(true);
                        }}
                      />
                      <button
                        onClick={() => {
                          setSelectedUserDetails(user);
                          setShowUserDetailsModal(true);
                        }}
                        className='text-sm font-medium hover:text-primary transition-colors'
                      >
                        {user.forename} {user.surname}
                      </button>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    ID#{user.membershipNumber || '00000000'}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {user.primaryEmail}
                  </td>
                      <td className='px-6 py-4'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user)}`}>
                          {getUserStatusDisplay(user)}
                        </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600 capitalize'>
                  {user.membershipType}
                  </td>
                  <td className='px-6 py-4'>
                        {expandedUser === user._id ? (
                          <div className='flex gap-2'>
                        <button
                              className='px-5 py-1.5 bg-[#A40A26] text-white rounded-lg text-sm font-medium'
                              onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                            <button
                              className='px-5 py-1.5 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-lg text-sm font-medium'
                              onClick={handleSaveUser}
                            >
                          Save
                        </button>
                          </div>
                    ) : (
                      <button
                            onClick={() => handleEditClick(user._id)}
                        className='text-primary hover:text-primary/80'
                      >
                            <FaEdit />
                      </button>
                    )}
                  </td>

                </tr>

                    {expandedUser === user._id && (
                  <tr>
                        <td colSpan='7' className='px-6 py-6 bg-white border-b'>
                      <div className='space-y-8'>
                            {/* User Status Section */}
                            <div className='mb-4'>
                              <h3 className='text-sm font-medium text-gray-700 mb-2'>User Status</h3>
                              <div className='flex gap-4'>
                                <div className={`px-3 py-2 rounded-lg ${editingUser?.isRestricted ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                  <span className='font-medium'>Restricted:</span> {editingUser?.isRestricted ? 'Yes' : 'No'}
                                </div>
                                <div className={`px-3 py-2 rounded-lg ${editingUser?.isBanned ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                  <span className='font-medium'>Banned:</span> {editingUser?.isBanned ? 'Yes' : 'No'}
                                </div>
                              </div>
                            </div>

                            {/* Checkboxes and Action Buttons */}
                            <div className='flex gap-12 mb-8'>
                          <label className='flex items-center gap-3 cursor-pointer'>
                            <input
                              type='checkbox'
                              className='w-5 h-5 rounded border-gray-300 text-primary'
                                  checked={editingUser?.isRestricted || false}
                                  onChange={(e) => {
                                    setConfirmAction('restrict');
                                    setSelectedUserId(editingUser._id);
                                    setShowConfirmModal(true);
                                  }}
                            />
                            <span className='text-sm text-gray-500'>
                              Restrict User
                            </span>
                          </label>
                          <label className='flex items-center gap-3 cursor-pointer'>
                            <input
                              type='checkbox'
                              className='w-5 h-5 rounded border-gray-300 text-primary'
                                  checked={editingUser?.isBanned || false}
                                  onChange={(e) => {
                                    setConfirmAction('ban');
                                    setSelectedUserId(editingUser._id);
                                    setShowConfirmModal(true);
                                  }}
                            />
                            <span className='text-sm text-gray-500'>
                              Ban User
                            </span>
                          </label>

                          <button
                                onClick={() => {
                                  setConfirmAction('resetPassword');
                                  setSelectedUserId(editingUser._id);
                                  setShowConfirmModal(true);
                                }}
                            className='flex items-center gap-3 py-2 px-4 rounded-lg bg-white hover:bg-gray-100 text-sm text-gray-500 border border-gray-200'
                          >
                                <FaKey className="text-primary" />
                            Reset Password
                          </button>

                          <button
                                onClick={() => {
                                  setConfirmAction('requestVerification');
                                  setSelectedUserId(editingUser._id);
                                  setShowConfirmModal(true);
                                }}
                            className='flex items-center gap-3 py-2 px-4 rounded-lg bg-white hover:bg-gray-100 text-sm text-gray-500 border border-gray-200'
                          >
                                <FaEnvelope className="text-primary" />
                            Request New Verification
                                </button>
                              </div>

                            {/* Events Attended Section */}
                            <div className='mb-8'>
                              <h3 className='text-sm font-medium text-gray-700 mb-4'>Events Attended</h3>
                              <div className='bg-white rounded-lg border border-gray-200'>
                            <table className='w-full'>
                              <thead>
                                    <tr className='border-b'>
                                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500'>No</th>
                                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500'>Event Name</th>
                                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500'>Date</th>
                                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                    {userEvents && userEvents.length > 0 ? (
                                      userEvents.map((registration, index) => (
                                        <tr key={registration._id} className='border-b last:border-b-0'>
                                          <td className='px-4 py-3 text-sm text-gray-600'>
                                            {(eventsPagination?.currentPage - 1) * (eventsPagination?.limit || 10) + index + 1}
                                    </td>
                                          <td className='px-4 py-3 text-sm text-gray-600'>
                                            {registration.eventId?.name || 'N/A'}
                                    </td>
                                          <td className='px-4 py-3 text-sm text-gray-600'>
                                            {registration.eventId?.time ? format(new Date(registration.eventId.time), 'MMM dd, yyyy') : 'N/A'}
                                          </td>
                                          <td className='px-4 py-3'>
                                      <button
                                        onClick={() => {
                                                setSelectedEvent(registration.eventId);
                                          setShowEventModal(true);
                                        }}
                                              className='text-primary hover:text-primary/80 text-sm'
                                      >
                                        View more
                                      </button>
                                    </td>
                                  </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                          No events attended
                                        </td>
                                      </tr>
                                    )}
                              </tbody>
                            </table>
                                {eventsPagination && eventsPagination.totalPages > 1 && (
                                  <div className='p-4 border-t'>
                                    <div className='flex items-center justify-center gap-2'>
                                      {Array.from({ length: eventsPagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                          key={page}
                                          onClick={() => setEventsPage(page)}
                                          className={`w-8 h-8 flex items-center justify-center rounded-lg ${page === eventsPagination.currentPage
                                              ? 'bg-primary text-white'
                                              : 'border border-gray-200'
                                            }`}
                                        >
                                          {page}
                              </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>

                            {/* Activity Section */}
                            <div className='mb-8'>
                              <h3 className='text-sm font-medium text-gray-700 mb-4'>Activity</h3>
                            <div className='space-y-4'>
                                {userActivity && userActivity.length > 0 ? (
                                  userActivity.map((activity) => (
                                    <div key={activity._id} className='flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200'>
                                      <div className='flex items-center gap-4'>
                                        <div className='w-2 h-2 rounded-full bg-primary'></div>
                                        <span className='text-sm text-gray-600'>
                                          {activity.action} - {format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                                  </span>
                                </div>
                            </div>
                                  ))
                                ) : (
                                  <div className='text-center py-4 text-gray-500 bg-white p-4 rounded-lg border border-gray-200'>
                                    No activity recorded
                                  </div>
                                )}
                              </div>
                              {activityPagination && activityPagination.totalPages > 1 && (
                                <div className='mt-4 flex justify-center gap-2'>
                                  {Array.from({ length: activityPagination.totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                      key={page}
                                      onClick={() => setActivityPage(page)}
                                      className={`w-8 h-8 flex items-center justify-center rounded-lg ${page === activityPagination.currentPage
                                          ? 'bg-primary text-white'
                                          : 'border border-gray-200'
                                        }`}
                                    >
                                      {page}
                              </button>
                                  ))}
                            </div>
                              )}
                          </div>

                            {/* User Documents Section */}
                            <div className='mb-8'>
                              <h3 className='text-sm font-medium text-gray-700 mb-4'>User Documents</h3>
                              <div className='grid grid-cols-2 gap-6'>
                              <div>
                                  <h4 className='text-sm text-gray-600 mb-2'>ID Card</h4>
                                  <div className='relative group'>
                                  <img
                                      src={user.idCardPhoto || idcards}
                                    alt='ID Card'
                                      className='w-full h-48 object-cover rounded-lg'
                                  />
                                  <button
                                    onClick={() => {
                                        setSelectedImage(user.idCardPhoto || idcards);
                                      setShowModal(true);
                                    }}
                                      className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'
                                  >
                                      <span className='text-white text-sm font-medium'>Preview</span>
                                  </button>
                                </div>
                              </div>
                              <div>
                                  <h4 className='text-sm text-gray-600 mb-2'>Photo</h4>
                                  <div className='relative group'>
                                    <img
                                      src={user.profilePhoto || avatar}
                                      alt='Profile Photo'
                                      className='w-full h-48 object-cover rounded-lg'
                                  />
                                  <button
                                    onClick={() => {
                                        setSelectedImage(user.profilePhoto || avatar);
                                      setShowModal(true);
                                    }}
                                      className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg'
                                  >
                                      <span className='text-white text-sm font-medium'>Preview</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        )}
      </div>

        {/* Pagination */}
      {!isLoading && !isError && filteredUsers && filteredUsers.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      )}

      {/* Invite User Modal */}
      <InviteUsers
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      {/* Add the confirmation modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setConfirmAction(null);
          setSelectedUserId(null);
        }}
        action={confirmAction}
        userId={selectedUserId}
      />

      {/* Image Preview Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[600px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Image Preview</h2>
            <button 
              onClick={() => setShowModal(false)} 
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="relative w-full h-[400px]">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </Modal>

      {/* Add UserDetailsModal */}
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={() => {
          setShowUserDetailsModal(false);
          setSelectedUserDetails(null);
        }}
        user={selectedUserDetails}
      />

    </div>
  );
};

export default UserManagement;
