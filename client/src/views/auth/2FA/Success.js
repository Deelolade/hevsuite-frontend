import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo_white.png';
import image from '../../../assets/image.jpg';
import { BsCheck2Circle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../features/auth/authSlice';

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(
    (state) => state.auth
  );
  return (
    <div className='min-h-screen md:grid md:grid-cols-2 relative'>
      {/* Background Image - Visible on all screens */}
      <div className='absolute inset-0 md:relative md:block'>
        <div className='absolute inset-0'>
          <img
            src={image}
            alt='Background'
            className='w-full h-full object-cover'
          />
          {/* Dark overlay for mobile */}
          <div className='absolute inset-0 bg-black/60 md:bg-transparent'></div>
        </div>

        {/* Desktop Left Side Content */}
        <div className='hidden md:flex relative z-10 p-16 flex-col h-full'>
          <div className='flex flex-col items-center text-center'>
            <div className='w-32 h-32 rounded-2xl mb-4'>
              <img
                src={logo}
                alt='Hevsuite Club'
                className='w-full h-full p-4'
              />
            </div>
            <h1 className='text-5xl text-white font-medium'>Hevsuite Club</h1>
          </div>
          <div className='mt-auto text-center flex justify-center gap-8 p-8'>
            <p className='text-white text-xl pt-4'>Don't have membership?</p>
            <Link
              to='/register'
              className='p-4 px-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium'
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Success Message - Centered on mobile, right side on desktop */}
      <div className='flex items-center justify-center relative z-10 p-4 md:p-16'>
        <div className='w-full max-w-md rounded-lg md:bg-transparent md:p-0'>
          {/* Logo for mobile only */}
          <div className='flex justify-center mb-6 md:hidden'>
            <div className='w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center'>
              <img src={logo} alt='Logo' className='w-16 h-16' />
            </div>
          </div>
          <div className='bg-white max-w-md p-8 rounded-xl'>
            <div className='text-center'>
              <BsCheck2Circle className='text-[#0A5438] text-6xl md:text-8xl mx-auto mb-4' />
              <h2 className='text-2xl md:text-3xl font-medium mb-3 font-primary text-[#333333]'>
                Successfully Enabled
              </h2>

              <button
                // onClick={() => navigate('/homepage')}
                onClick={async() => {
                  await dispatch(fetchProfile()).unwrap();
                  if (!user) {
                    navigate('/login');
                  } else if (user.membershipStatus === 'accepted'&& user.joinFeeStatus === 'paid') {
                    navigate('/homepage');
                  }else if(user.membershipStatus === 'accepted'&& user.joinFeeStatus === 'pending'){
                    navigate('/register-7');
                  }
                   else {
                    navigate('/register-6'); // Or your membership registration page
                  }
                }}
              
                className='w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium'
              >
                Continue
              </button>
            </div>
          </div>

          {/* Mobile-only bottom section */}
          <div className='md:hidden mt-8 text-center'>
            <p className='text-white mb-4'>Don't have an Account?</p>
            <Link
              to='/register'
              className='inline-block px-6 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-base font-medium'
            >
              Become a member now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
