import React, { useState, useRef, useEffect } from 'react';
import { BsBell, BsChevronDown } from 'react-icons/bs';
import { useNavigate, Link } from 'react-router-dom';
import avatar from '../assets/user.avif';
import authService from '../store/auth/authService';

const Profile = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
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

    getProfile();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [

  ];

  const handleLogout = async () => {
    localStorage.clear();
    await authService.logout();
    navigate('/');
  };

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
          <span className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full p-2 text-center flex items-center justify-center text-white text-[10px]'>
            0
          </span>
        </button>

        {showNotifications && (
          <div className='absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100'>
            <div className='px-4 py-2 border-b border-gray-100'>
              <h3 className='font-semibold'>Notifications</h3>
            </div>
            <div className='max-h-[400px] overflow-y-auto'>
            <div className='p-4 text-center text-gray-500'>
                  No notifications
                </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className='flex justify-between items-start'>
                    <p
                      className={`${
                        !notification.isRead ? 'font-semibold' : ''
                      }`}
                    >
                      {notification.title}
                    </p>
                    <span className='text-xs text-gray-500'>
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='px-4 py-2 border-t flex w-full justify-end  border-gray-100'>
              {/* <button className='text-sm bg-primary rounded-lg w-fit text-white hover:underline px-6 py-2 text-center'>
                Clear
              </button> */}
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
            src={profileData.profilePhoto}
            alt={avatar}
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
