import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import logo_white from "../../../assets/logo_white.png";
import authImage from "../../../assets/image.jpg";
import toast from 'react-hot-toast';
import authService from '../../../store/auth/authService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check if we have the email from the forgot password page
    const resetEmail = sessionStorage.getItem('resetEmail');
    if (!resetEmail) {
      toast.error('Please request a password reset first');
      navigate('/forgot-password');
    }
  }, [navigate]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.code || !formData.newPassword || !formData.confirmPassword) {
      toast.error('All fields are required');
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      toast.error('Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const resetEmail = sessionStorage.getItem('resetEmail');
      const response = await authService.resetPassword({
        email: resetEmail,
        code: formData.code,
        newPassword: formData.newPassword
      });

      if (response && response.message) {
        toast.success(response.message);
        // Clear the stored email
        sessionStorage.removeItem('resetEmail');
        navigate('/reset-success');
      } else {
        toast.error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-2/5 bg-[#1A1A1A] flex items-center justify-center p-8"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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

      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-medium font-primary">
              Reset Password
            </h2>
            <p className="text-gray-600 font-primary mt-2">
              Enter the code sent to your email and your new password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-primary">Reset Code</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter the 6-digit code"
                  className="w-full px-4 py-3 border font-secondary border-gray-300 rounded-lg pl-12"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  disabled={loading}
                  maxLength={6}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-primary">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border font-secondary border-gray-300 rounded-lg pl-12"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  disabled={loading}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-primary">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password again"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-secondary pl-12"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  disabled={loading}
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <p className="text-gray-500 text-sm font-primary">
              Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, and one number
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
