import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";

import { BsTelephone } from "react-icons/bs";

const PhoneVerification = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/code-verification", { state: { type: "phone" } });
  };

  return (
    <div className="min-h-screen grid grid-cols-2">
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

      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-['Playfair_Display'] mb-3 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-500 text-sm font-primary text-center mb-8">
            We'll text a verification code to this phone number whenever you
            sign-in to your account
          </p>

          <div className="space-y-4">
            <div className="relative flex items-center">
              <BsTelephone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <span className="absolute left-10 text-sm font-primary text-gray-600">
                +251
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2.5 pl-20 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-primary"
              />
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-2.5 rounded-3xl text-white text-sm font-primary"
              style={{
                background: "linear-gradient(to right, #540A26, #0A5438)",
              }}
            >
              Verify
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full text-center text-gray-500 text-sm font-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
