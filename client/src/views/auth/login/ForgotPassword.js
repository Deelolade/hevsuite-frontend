import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/reset-password");
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
            <h2 className="text-3xl font-medium mb-2">Reset Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-800">
                Email/Membership ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <p className="text-gray-500 text-sm mt-2">
                Receive link to reset password via email
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 font-bold mt-8">
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

export default ForgotPassword;
