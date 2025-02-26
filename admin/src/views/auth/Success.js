import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { BsCheck2Circle } from "react-icons/bs";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verificationType = location.state?.type || "email";
  const value = location.state?.value || "goodluck@gmail.com";

  const messages = {
    email: {
      first: `Your email is sent to ${value}`,
      second:
        "Authentication number will be sent to this email when logging in",
    },
    phone: {
      first: `Your Phone number is set to ${value}`,
      second:
        "Authentication number will be sent to this number when logging in",
    },
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
        <div className="w-full max-w-[380px] mx-auto text-center">
          <BsCheck2Circle className="text-[#0A5438] text-8xl mx-auto mb-4" />
          <h1 className="text-[32px] font-primary mb-3">
            Successfully Enabled
          </h1>
          <div className="space-y-2 mb-8">
            <p className="text-gray-500 text-sm font-primary">
              {messages[verificationType].first}
            </p>
            <p className="text-gray-500 text-sm font-primary">
              {messages[verificationType].second}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="w-64 py-3.5 rounded-3xl text-white text-sm font-secondary"
            style={{
              background: "linear-gradient(to right, #540A26, #0A5438)",
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
