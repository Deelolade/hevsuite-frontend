import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_white from '../../../assets/logo_white.png';
import authImage from '../../../assets/image.jpg';
import toast from 'react-hot-toast';
import authService from '../../../store/auth/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      const data = { email: email.toLowerCase() };
      const response = await authService.forgotPassword(data);
      
      if (response && response.message) {
        toast.success(response.message);
        // Store the email in sessionStorage for the reset password page
        sessionStorage.setItem('resetEmail', email);
        navigate('/reset-password');
      } else {
        toast.error(response.message || 'Failed to send reset code');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 404) {
        toast.error('No account found with this email address');
      } else if (error.response?.status === 400) {
        toast.error('Please provide a valid email address');
      } else {
        toast.error('Something went wrong. Please try again later');
      }
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen'>
      <div
        className='w-2/5 bg-[#1A1A1A] flex items-center justify-center p-8'
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='text-center'>
          <img src={logo_white} alt='logo' className='w-32 h-32 mx-auto mb-6' />
          <h1 className='text-white text-[40px] font-primary'>Hevsuite Club</h1>
        </div>
      </div>

      <div className='flex-1 flex flex-col justify-center px-[52px] bg-white'>
        <div className='w-full max-w-[380px] mx-auto'>
          <div className='mb-12'>
            <h2 className='text-3xl font-medium mb-2 font-primary'>
              Reset Password
            </h2>
            <p className='text-gray-600 font-primary'>
              Enter your email address and we'll send you a code to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block mb-2 text-gray-800 font-primary'>
                Email Address
              </label>
              <div className='relative'>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg pl-12 font-secondary'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
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

            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-3xl text-lg font-medium font-primary ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>

            <div className='text-center'>
              <Link
                to='/'
                className='text-primary hover:text-[#0A5440] font-primary'
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
