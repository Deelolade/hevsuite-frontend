import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../../assets/logo_white.png";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("email");

  const handleMethodSelection = () => {
    if (input === "email") {
      navigate("/email-verification");
    } else {
      navigate("/phone-verification");
    }
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
          <h1 className="text-[32px] font-['Playfair_Display'] mb-4 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600 text-sm font-['Lato'] text-center mb-8">
            Protect Your Password. How would you like to receive one-time
            password(OTP)?
          </p>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-[4px] cursor-pointer">
              <input
                type="radio"
                name="auth-method"
                className="text-[#540A26]"
                onChange={() => setInput("phone")}
              />
              <div>
                <p className="text-sm font-['Lato']">Phone Number</p>
                <p className="text-xs text-gray-500 font-['Lato']">
                  Use phone number to receive verification codes
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-[4px] cursor-pointer">
              <input
                type="radio"
                name="auth-method"
                className="text-[#540A26]"
                defaultChecked
                onChange={() => setInput("email")}
              />
              <div>
                <p className="text-sm font-['Lato']">Email</p>
                <p className="text-xs text-gray-500 font-['Lato']">
                  Receive verification code via email
                </p>
              </div>
            </label>

            <button
              onClick={handleMethodSelection}
              className="w-full py-2.5 rounded-[4px] text-white text-sm font-['Lato']"
              style={{
                background: "linear-gradient(to right, #540A26, #0A5438)",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
