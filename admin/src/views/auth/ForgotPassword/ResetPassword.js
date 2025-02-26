import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import logo_white from "../../../assets/logo_white.png";
import authImage from "../../../assets/image.jpg";

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
    <div className="flex h-screen">
      {/* Left Side - Background Image */}
      <div
        className="w-2/5 bg-[#1A1A1A] flex items-center justify-center p-8"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-primary">Hevsuite Club</h1>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-medium font-primary">
              Reset Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-primary">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border font-secondary border-gray-300 rounded-lg pl-12"
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
              (One uppercase, lowercase and a minimum of 7 characters)
            </p>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
