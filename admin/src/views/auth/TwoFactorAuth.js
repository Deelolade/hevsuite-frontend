import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";

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
    <div className="flex h-screen ">
      <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-primary">Hevsuite Club</h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-primary font-bold mb-4 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600 text-sm font-primary  mb-8">
            Protect Your Password. How would you like to receive one-time
            password(OTP)?
          </p>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer">
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
              className="w-full py-3.5  text-white text-sm font-secondary border rounded-3xl "
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
