import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo_white from '../../assets/logo_white.png';
import authImage from '../../assets/image.jpg';
import toast from 'react-hot-toast';
import authService from '../../store/auth/authService';

const CodeVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const verificationType = location.state?.type || 'email';

  const verificationMessage =
    verificationType === 'email'
      ? 'Enter the verification code we sent to your email'
      : 'Enter the verification code we sent to your phone number';

  const handleVerify = async () => {
    try {
      const response = await authService.codeVerify({ code: code.join('') });
      navigate('/success');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      const response = await authService.resend2FACode();
      toast.success(response.message || 'New code sent successfully');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to resend code. Please try again.'
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  return (
    <div className='flex h-screen'>
      <div
        className='md:w-2/5 w-full absolute md:relative pb-2 bg-[#1A1A1A] flex items-center justify-center p-8'
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='text-center'>
          <Link
            to='/'
            className='text-primary hover:text-[#0A5440] font-primary'
          >
            <img src={logo_white} alt='logo' className='w-32 h-32 mx-auto mb-6' />
          </Link>
          <h1 className='text-white text-[40px] font-primary'>Hevsuite Club</h1>
        </div>
      </div>
      <div className='flex-1 mt-10 flex flex-col justify-center md:px-[52px] px-6 bg-white'>
        <div className='w-full mt-4 md:max-w-[380px] mx-auto'>
          <h1 className='text-[32px] font-primary mb-3 text-center'>
            Two-Factor Authentication
          </h1>
          <p className='text-gray-500 text-sm font-primary text-center mb-8'>
            {verificationMessage}
          </p>

          <div className='space-y-4'>
            <div className='flex justify-between gap-2 mb-6'>
              {code.map((data, index) => (
                <input
                  key={index}
                  type='text'
                  maxLength='1'
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  className="w-12 h-12 border border-gray-200 rounded-[4px] text-center text-lg focus:outline-none focus:ring-0 font-['Lato']"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className='w-full py-3.5 text-white text-sm font-secondary border rounded-3xl'
              style={{
                background: 'linear-gradient(to right, #540A26, #0A5438)',
              }}
            >
              Verify
            </button>

            <div className='text-center mt-4'>
              <p className='text-gray-500 text-sm'>
                Didn't receive the code?{' '}
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className='text-[#540A26] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              </p>
            </div>
            <div className='text-center'>
              <Link
                to='/'
                className='text-primary hover:text-[#0A5440] font-primary'
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
