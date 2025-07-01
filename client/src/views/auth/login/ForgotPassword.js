import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";
import toast from "react-hot-toast";
import authService from "../../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailOrPhone.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(emailOrPhone);

      toast.success(response.message || 'Password reset link sent to your email');
      // Clear the form after successful submission
      setEmailOrPhone("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 relative">
      {/* Background Image - Visible on all screens */}
      <div className="absolute inset-0 md:relative md:block">
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for mobile */}
          <div className="absolute inset-0 bg-black/60 md:bg-transparent"></div>
        </div>

        {/* Desktop Left Side Content */}
        <div className="hidden md:flex relative z-10 p-16 flex-col h-full">
          <div className="flex flex-col items-center text-center mt-auto">
            <div className="w-32 h-32 rounded-2xl mb-4">
              <Link to='/'>
                <img
                  src={logo}
                  alt='Hevsuite Club'
                  className='w-full h-full p-4'
                />
              </Link>
            </div>
            <h1 className="text-5xl text-white font-medium">Hevsuite Club</h1>
          </div>
          <div className="mt-auto text-center flex justify-center gap-8 p-8">
            <p className="text-white text-xl pt-4">Don't have membership?</p>
            <Link
              to="/register"
              className="p-4 px-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Form - Centered on mobile, right side on desktop */}
      <div className="flex items-center justify-center relative z-10 p-4 md:p-16">
        <div className="w-full max-w-md rounded-lg md:bg-transparent md:p-0">
          {/* Logo for mobile only */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
          </div>
          <div className="bg-white max-w-md p-8 rounded-xl">
            <div className="mb-6 md:mb-12 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-medium mb-1 font-primary text-[#333333]">
                Reset Password
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Enter your email address and we'll send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-gray-800">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-12"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  We'll send you a secure reset link that expires in 10 minutes
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-[#540A26] hover:text-[#0A5440] font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>

          {/* Mobile-only bottom section */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-white mb-4">Don't have an Account?</p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-base font-medium"
            >
              Become a member now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
