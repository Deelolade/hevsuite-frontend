import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { BsTelephone } from "react-icons/bs";

const PhoneVerification = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/code-verification", { state: { type: "phone" } });
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-primary">Hevsuite Club</h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-primary mb-3 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-500 text-sm font-['Lato'] text-center mb-8">
            We'll text a verification code to this phone number whenever you
            sign-in to your account
          </p>

          <div className="space-y-4">
            <div className="relative flex items-center">
              <BsTelephone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <span className="absolute left-10 text-sm font-['Lato'] text-gray-600">
                +251
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-2.5 pl-20 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato']"
                required
              />
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3.5 rounded-3xl text-white text-sm font-secondary"
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

export default PhoneVerification;
