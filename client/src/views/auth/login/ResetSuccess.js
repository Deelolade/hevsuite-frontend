import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";
import { BsCheckCircle } from "react-icons/bs";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-2">
      {/* Left Side - Background Image */}
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

      {/* Right Side - Success Message */}
      <div className="flex items-center justify-center p-16">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 text-[#0A5440]">
              <BsCheckCircle className="w-full h-full" />
            </div>
          </div>
          <h2 className="text-3xl font-medium mb-4">Password Changed</h2>
          <p className="text-gray-600 text-lg mb-8">
            Your password have been Successfully changed!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
