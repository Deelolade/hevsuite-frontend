import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import avatar from '../../../assets/user.avif';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';
import { persistor } from '../../../store/store';

const RegisterApproval = ({ setApproval, referrals }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);

  const allApproved = user&& user.membershipStatus === 'accepted'
  const handleLogout = async () => {
    dispatch(logout()).then(() => {
      persistor.purge(); // safely purge after logout completes
    });
    navigate("/");
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Main Content */}
      <div className='container mx-auto px-4 py-8 md:py-12 max-w-3xl text-center flex-grow'>
        <div className='mb-8 md:mb-12'>
          <div className='w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full mx-auto mb-4 md:mb-8 flex items-center justify-center'>
            <svg
              className='w-8 h-8 md:w-12 md:h-12 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h2 className='text-xl md:text-3xl font-medium mb-2 md:mb-4 text-[#540A26]'>
            Your membership application is pending for approval.
          </h2>
        </div>

        <div className='bg-white rounded-lg p-4 md:p-8 shadow-sm'>
          <h3 className='text-lg md:text-2xl font-medium mb-4 md:mb-6'>
            Check your referrals
          </h3>
          <div className='space-y-3 md:space-y-4'>
            {referrals.length > 0 && referrals.map((referral) => (
              <div
                key={referral.id}
                className='flex flex-wrap md:flex-nowrap items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg'
              >
                <div className='flex items-center gap-2 md:gap-4 mb-2 md:mb-0 w-full md:w-auto'>
                  <img
                    src={referral.userId.profilePhoto || avatar}
                    alt={`${referral.userId.forename} ${referral.userId.surname}`}
                    className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
                  />
                  <span className='font-medium text-sm md:text-base'>
                    {`${referral.userId.forename} ${referral.userId.surname}`}
                  </span>
                </div>
                <div className='flex flex-wrap gap-2 w-full md:w-auto justify-end'>
                  {referral.status === 'approved' ? (
                    <span className='px-3 md:px-4 py-1 md:py-2 bg-[#0A5440] text-white rounded-lg text-xs md:text-base'>
                      Approved
                    </span>
                  ) : referral.status === 'declined' ? (
                    <>
                      <span
                        className='px-3 cursor-pointer md:px-4 py-1 md:py-2 bg-[#540A26] text-white rounded-lg text-xs md:text-base'
                      >
                        Declined
                      </span>
                    </>
                  ) : (
                    <>
                      <span className='px-3 md:px-4 py-1 md:py-2 bg-white text-gray-500 border border-gray-200 rounded-lg text-xs md:text-base'>
                        Pending
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 md:mt-8 flex justify-between items-center'>
            <button
              className='px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base  transition-colors'
              onClick={() => setApproval(false)}
            >
              <svg
                className='w-4 h-4 md:w-5 md:h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Add other referral
            </button>
            {allApproved ? (
              <Link
                to="/register-7"
                className="px-4 md:px-6 py-1 md:py-2 text-white bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base hover:bg-opacity-90 transition-colors"
              >
                Go to payment
                <span className="ml-1">→</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterApproval;
