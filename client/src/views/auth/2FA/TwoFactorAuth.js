import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";

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
          <h1 className="text-[32px] font-['Playfair_Display'] mb-4 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600 text-sm font-primary text-center mb-8">
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
                <p className="text-sm font-primary">Phone Number</p>
                <p className="text-xs text-gray-500 font-primary">
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
                <p className="text-sm font-primary">Email</p>
                <p className="text-xs text-gray-500 font-primary">
                  Receive verification code via email
                </p>
              </div>
            </label>

            <button
              onClick={handleMethodSelection}
              className="w-full py-2.5 rounded-3xl text-white text-sm font-primary"
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
