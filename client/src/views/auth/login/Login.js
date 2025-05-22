import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo_white.png';
import image from '../../../assets/image.jpg';
import authService from '../../../services/authService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, login } from '../../../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error('Please enter both email and password');
        return;
      }
      const response = await dispatch(login(formData)).unwrap();
      // const response = await authService.loginUser(formData);
      // console.log(response)
      if (response.message === '2FA required') {
        navigate('/code-verification');
      } else {
        navigate('/two-factor-auth');
      }
    } catch (error) {
      // toast.error(error.message);
      console.log(error.message);
    }
  };

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
          <div className='flex flex-col items-center text-center mt-auto'>
            <div className='w-32 h-32 rounded-2xl mb-4 bg-red'>
              <Link to='/'>
                <img
                  src={logo}
                  alt='Hevsuite Club'
                  className='w-full h-full p-4'
                />
              </Link>
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

      {/* Login Form - Centered on mobile, right side on desktop */}
      <div className='flex items-center justify-center relative z-10 p-4 md:p-16'>
        <div className='w-full max-w-md  rounded-lg md:bg-transparent md:p-0'>
          {/* Logo for mobile only */}
          <div className='flex justify-center mb-6 md:hidden'>
            <div className='w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center'>
              <img src={logo} alt='Logo' className='w-16 h-16' />
            </div>
          </div>
          <div className='bg-white max-w-md  p-8 rounded-xl'>
            <div className='mb-6 md:mb-12 text-center md:text-left'>
              <h2 className='justify-start text-2xl md:text-3xl font-medium mb-1 font-primary text-[#333333]'>
                Hello Member!
              </h2>
              <p className='text-lg md:text-xl text-gray-600'>Welcome Back</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
              <div>
                <label className='block mb-2 text-gray-800'>
                  Email/Membership ID
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Enter email address'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg pl-12'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label className='block mb-2 text-gray-800'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg pl-12'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </span>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
                  >
                    {showPassword ? (
                      <BsEyeSlash size={20} />
                    ) : (
                      <BsEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between w-full'>
                <label className='flex items-center gap-2 text-gray-600'>
                  <input
                    type='checkbox'
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      setFormData({ ...formData, rememberMe: e.target.checked })
                    }
                    className='w-4 h-4 rounded border-gray-300'
                  />
                  <span className='w-full text-sm lg:text-base'>
                    Remember password
                  </span>
                </label>
                <Link
                  to='/forgot-password'
                  className='text-[#540A26] font-primary text-sm lg:text-base '
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium ${isLoading
                    ? 'cursor-not-allowed'
                    : ''
                  }`}
              >
                Login
              </button>
            </form>

            <p className='text-center text-sm text-gray-600 mt-6 md:mt-8'>
              <Link to='/terms' className='hover:underline'>
                Terms & Conditions
              </Link>
              ,{' '}
              <Link to='/privacy' className='hover:underline'>
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to='/cookies' className='hover:underline'>
                Cookie Policy
              </Link>
            </p>
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

export default Login;
