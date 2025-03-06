import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";
import { MdEmail } from "react-icons/md";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/code-verification", { state: { type: "email" } });
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
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-2xl mb-4">
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
              className="p-4 px-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Email Verification Form - Centered on mobile, right side on desktop */}
      <div className="flex items-center justify-center relative z-10 p-4 md:p-16">
        <div className="w-full max-w-md rounded-lg md:bg-transparent md:p-0">
          {/* Logo for mobile only */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
          </div>
          <div className="bg-white max-w-md p-8 rounded-xl">
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-2 font-primary text-[#333333]">
                Two-Factor Authentication
              </h2>
              <p className="text-gray-500 text-sm font-primary">
                We'll text a verification code to this email whenever you
                sign-in to your account
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pl-12 text-sm focus:outline-none focus:ring-0 font-primary"
                />
              </div>

              <button
                onClick={handleVerify}
                className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium mt-4"
              >
                Verify
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full text-center text-gray-500 text-base font-primary hover:text-gray-700"
              >
                Cancel
              </button>
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

export default EmailVerification;
