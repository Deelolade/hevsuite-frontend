import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-success");
    // Add your reset password logic here
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* Left Side - Background Image */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="relative z-10 p-16 flex flex-col h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32  rounded-2xl mb-4">
              <img
                src={logo}
                alt="Hevsuite Club"
                className="w-full h-full p-4"
              />
            </div>
            <h1 className="text-5xl text-white font-medium">Hevsuite Club</h1>
          </div>
          <div className="mt-auto text-center flex justify-center gap-8 p-8">
            <p className="text-white text-xl pt-4">Don't have membership?</p>
            <Link
              to="/register"
              className="p-4 px-8  bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-3xl font-medium">Reset Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-12"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
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
              <label className="block mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password again"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-12"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
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

            <p className="text-gray-500 text-sm">
              (One uppercase, lowercase and a minimum of 7 characters)
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8 font-bold">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            ,{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookies" className="hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
