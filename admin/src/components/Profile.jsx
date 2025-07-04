import React, { useState, useRef, useEffect } from 'react';
import { BsBell, BsChevronDown } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import avatar from '../assets/defualtuser.webp';
import authService from '../store/auth/authService';
import axios from 'axios';
import { base_url } from '../constants/axiosConfig';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [profileData, setProfileData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [clearedNotificationIds, setClearedNotificationIds] = useState(() => {
    const saved = localStorage.getItem('clearedNotifications');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // Save cleared notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('clearedNotifications', JSON.stringify([...clearedNotificationIds]));
  }, [clearedNotificationIds]);

  const clearAllNotifications = () => {
    // Add all current notification IDs to the cleared set
    const currentIds = notifications.map(n => n.id);
    setClearedNotificationIds(prev => new Set([...prev, ...currentIds]));
    setNotifications([]);
    setUnreadCount(0);
    toast.success('All notifications cleared');
  };

  const handleNotificationClick = (notification) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    // Add to cleared notifications
    setClearedNotificationIds(prev => new Set([...prev, notification.id]));

    // Navigate to the appropriate page
    if (notification.type === 'assignment' || notification.type === 'new_request') {
      navigate(`/admin/support?requestId=${notification.requestId}`);
    }
  };

  const handleLogout = async () => {
    // Clear notifications from localStorage on logout
    localStorage.removeItem('clearedNotifications');
    localStorage.clear();
    await authService.logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const getProfile = async () => {
      const response = await authService.getProfile();
      setProfileData(response.user);
    };

    const fetchNotifications = async () => {
      try {
        // Get assigned requests
        const assignedRequests = await axios.get(`${base_url}/api/support-requests?assignedTo=me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Get all requests for new notifications
        const allRequests = await axios.get(`${base_url}/api/support-requests`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Process notifications
        const newNotifications = [];

        // Add notifications for assigned requests
        assignedRequests.data.forEach(request => {
          const notificationId = `assigned-${request._id}`;
          if (!clearedNotificationIds.has(notificationId)) {
            newNotifications.push({
              id: notificationId,
              title: `New request assigned to you: ${request.type}`,
              message: `Request from ${request.user?.forename} ${request.user?.surname}`,
              time: new Date(request.updatedAt).toLocaleString(),
              timestamp: new Date(request.updatedAt).getTime(),
              isRead: false,
              type: 'assignment',
              requestId: request._id
            });
          }
        });

        // Add notifications for new requests
        allRequests.data.forEach(request => {
          const notificationId = `new-${request._id}`;
          if (!clearedNotificationIds.has(notificationId) && 
              new Date(request.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
            newNotifications.push({
              id: notificationId,
              title: `New support request: ${request.type}`,
              message: `Request from ${request.user?.forename} ${request.user?.surname}`,
              time: new Date(request.createdAt).toLocaleString(),
              timestamp: new Date(request.createdAt).getTime(),
              isRead: false,
              type: 'new_request',
              requestId: request._id
            });
          }
        });

        // Sort notifications by timestamp (newest first)
        newNotifications.sort((a, b) => b.timestamp - a.timestamp);

        setNotifications(newNotifications);
        setUnreadCount(newNotifications.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    getProfile();
    fetchNotifications();

    // Set up polling for new notifications
    const notificationInterval = setInterval(fetchNotifications, 300000); // Poll every 30 seconds

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(notificationInterval);
    };
  }, [clearedNotificationIds]);

  return (
    <div className='flex items-center gap-6'>
      <div className='relative' ref={notificationRef}>
        <button
          className='relative'
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowDropdown(false);
          }}
        >
          <BsBell className='text-2xl text-gray-600' />
          {unreadCount > 0 && (
            <span className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full p-2 text-center flex items-center justify-center text-white text-[10px]'>
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 z-50'>
            <div className='px-4 py-2 border-b border-gray-100 flex justify-between items-center'>
              <h3 className='font-semibold'>Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className='text-sm text-red-600 hover:text-red-700 font-medium'
                >
                  Clear All
                </button>
              )}
            </div>
            <div className='max-h-[400px] overflow-y-auto'>
              {notifications.length === 0 ? (
                <div className='p-4 text-center text-gray-500'>
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className={`${!notification.isRead ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </p>
                        <p className='text-sm text-gray-600 mt-1'>
                          {notification.message}
                        </p>
                      </div>
                      <span className='text-xs text-gray-500 whitespace-nowrap ml-2'>
                        {notification.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className='relative' ref={profileRef}>
        <button
          className='flex items-center gap-3'
          onClick={() => {
            setShowDropdown(!showDropdown);
            setShowNotifications(false);
          }}
        >
          <div className='text-right'>
            <h3 className='font-medium'>{profileData.forename}</h3>
            <p className='text-sm text-gray-500 capitalize'>
              {profileData.role}
            </p>
          </div>
          <img
            src={profileData.profilePhoto || avatar}
            alt="Profile"
            className='w-10 h-10 rounded-full object-cover'
          />
          <BsChevronDown className='text-gray-400' />
        </button>

        {showDropdown && (
          <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100'>
            <Link
              to='/admin/profile'
              className='block px-4 py-2 text-lg text-gray-700 hover:bg-gray-50'
            >
              Your Profile
            </Link>
            <button
              className='block px-4 py-2 text-lg text-red-600 hover:bg-gray-50'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
