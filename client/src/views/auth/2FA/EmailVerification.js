import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../../assets/logo_white.png";

import { MdEmail } from "react-icons/md";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/code-verification", { state: { type: "email" } });
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="relative bg-[#540A26]">
        <div className="absolute inset-0">
          <img
            src={logo_white}
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 p-16 flex flex-col h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-[#540A26] rounded-2xl mb-4">
              <img
                src={logo_white}
                alt="Hevsuite Club"
                className="w-full h-full p-4"
              />
            </div>
            <h1 className="text-5xl text-white font-medium">Hevsuite Club</h1>
          </div>
          <div className="mt-auto text-center">
            <p className="text-white text-xl mb-4">Don't have membership?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-lg font-medium">
              Become a Member
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-['Playfair_Display'] mb-3 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-500 text-sm font-['Lato'] text-center mb-8">
            We'll text a verification code to this email whenever you sign-in to
            your account
          </p>

          <div className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato']"
              />
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-2.5 rounded-[4px] text-white text-sm font-['Lato']"
              style={{
                background: "linear-gradient(to right, #540A26, #0A5438)",
              }}
            >
              Verify
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full text-center text-gray-500 text-sm font-['Lato']"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
