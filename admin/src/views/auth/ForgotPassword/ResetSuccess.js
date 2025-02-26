import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import logo_white from "../../../assets/logo_white.png";
import authImage from "../../../assets/image.jpg";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Side - Background Image */}
      <div
        className="w-2/5 bg-[#1A1A1A] flex items-center justify-center p-8"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-primary">Hevsuite Club</h1>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 text-[#0A5440]">
              <BsCheckCircle className="w-full h-full" />
            </div>
          </div>
          <h2 className="text-3xl text-center font-primary font-semibold mb-4">
            Password Changed
          </h2>
          <p className="text-gray-600 text-center font-primary text-lg mb-8">
            Your password have been Successfully changed!
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-3xl text-lg font-secondary font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
