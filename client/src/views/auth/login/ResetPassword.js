
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import authService from "../../../services/authService";
import toast from 'react-hot-toast';
import logo from '../../../assets/logo_white.png';
import image from '../../../assets/image.jpg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Get email from location state or session storage
  const emailOrPhone = sessionStorage.getItem('resetIdentifier');

  const handleCodeChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.querySelector(`input[name="code-${index + 1}"]`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.querySelector(`input[name="code-${index - 1}"]`)?.focus();
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0 || isResending) return;
    
    setIsResending(true);
    try {
      await authService.forgotPassword(emailOrPhone);
      toast.success('New verification code sent');
      setCountdown(30);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate code
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }
    const validatePassword = (pass) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
      return passwordRegex.test(pass);
    };
    // Validate passwords
    if (!validatePassword(passwordData.newPassword)) {
      toast.error('One uppercase, lowercase and a minimum of 7 characters)');
      return;
    }

 
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 7) {
      toast.error('Password must be at least 7 characters');
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(
        emailOrPhone,
        verificationCode,
        passwordData.newPassword
      );
      
      toast.success('Password reset successfully!');
      sessionStorage.removeItem('resetEmail');
      navigate("/reset-success");
    } catch (error) {
      toast.error(error.message);
      setCode(['', '', '', '', '', '']);
      document.querySelector('input[name="code-0"]')?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Countdown timer for resend
  React.useEffect(() => {
    const timer = countdown > 0 && setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className='min-h-screen md:grid md:grid-cols-2 relative'>
      {/* Background Image */}
      <div className='absolute inset-0 md:relative md:block'>
        <div className='absolute inset-0'>
          <img src={image} alt='Background' className='w-full h-full object-cover' />
          <div className='absolute inset-0 bg-black/60 md:bg-transparent'></div>
        </div>

        {/* Desktop Left Side Content */}
        <div className='hidden md:flex relative z-10 p-16 flex-col h-full'>
          <div className='flex flex-col items-center text-center mt-auto'>
            <div className='w-32 h-32 rounded-2xl mb-4'>
              <img src={logo} alt='Hevsuite Club' className='w-full h-full p-4' />
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

      {/* Reset Password Form */}
      <div className='flex items-center justify-center relative z-10 p-4 md:p-16'>
        <div className='w-full max-w-md rounded-lg md:bg-transparent md:p-0'>
          {/* Logo for mobile only */}
          <div className='flex justify-center mb-6 md:hidden'>
            <div className='w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center'>
              <img src={logo} alt='Logo' className='w-16 h-16' />
            </div>
          </div>

          <div className='bg-white max-w-md p-8 rounded-xl'>
            <div className='mb-6 md:mb-8 text-center'>
              <h2 className='text-2xl md:text-3xl font-medium mb-2'>Reset Password</h2>
              <p className='text-gray-600'>
                Enter the verification code sent to registered email or phone number
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Verification Code Input */}
              <div>
                <label className='block mb-2 text-gray-800'>Verification Code</label>
                <div className='flex justify-center gap-2 md:gap-4'>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      name={`code-${index}`}
                      maxLength={1}
                      className='w-10 h-10 md:w-12 md:h-12 text-center text-xl md:text-2xl border border-gray-300 rounded-lg focus:border-[#540A26] focus:ring-1 focus:ring-[#540A26] outline-none'
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <p className='text-right mt-2 text-sm text-gray-500'>
                  Didn't receive code?{' '}
                  <button
                    type='button'
                    onClick={handleResendCode}
                    disabled={countdown > 0 || isResending}
                    className={`text-[#540A26] font-medium ${
                      (countdown > 0 || isResending) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isResending ? 'Sending...' : `Resend ${countdown > 0 ? `(${countdown}s)` : ''}`}
                  </button>
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className='block mb-2 text-gray-800'>New Password</label>
                <div className='relative'>
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    placeholder='Enter new password'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg pl-12'
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value
                    })}
                    required
                    minLength={7}
                  />
                  <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </span>
                  <button
                    type='button'
                    onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
                  >
                    {showPassword.new ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className='block mb-2 text-gray-800'>Confirm Password</label>
                <div className='relative'>
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg pl-12'
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })}
                    required
                    minLength={7}
                  />
                  <span className='absolute left-4 top-1/2 -translate-y-1/2'>
                    <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </span>
                  <button
                    type='button'
                    onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
                  >
                    {showPassword.confirm ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xs italic">
                (One uppercase, lowercase and a minimum of 7 characters)
              </p>
              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-medium ${
                  isLoading ? 'opacity-50' : ''
                }`}
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
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

export default ResetPasswordPage;