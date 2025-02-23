import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";

const CodeVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const verificationType = location.state?.type || 'email';

  const verificationMessage = verificationType === 'email' 
    ? "Enter the verification code we sent to your email"
    : "Enter the verification code we sent to your phone number";

  const handleVerify = () => {
    const value = location.state?.type === 'email' 
      ? 'goodluck@gmail.com'
      : '+251-9-99999999';
      
    navigate("/success", { 
      state: { 
        type: verificationType,
        value: value
      } 
    });
  };
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-['Playfair_Display']">
            Hevsuite Club
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-['Playfair_Display'] mb-3 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-500 text-sm font-['Lato'] text-center mb-8">
            {verificationMessage}
          </p>

          <div className="space-y-4">
            <div className="flex justify-between gap-2 mb-6">
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  className="w-12 h-12 border border-gray-200 rounded-[4px] text-center text-lg focus:outline-none focus:ring-0 font-['Lato']"
                />
              ))}
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

export default CodeVerification;
