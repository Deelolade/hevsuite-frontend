import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import logo_white from "../../../assets/logo_white.png";
import authImage from "../../../assets/image.jpg";

const ResetSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any remaining session storage
    sessionStorage.removeItem('resetEmail');
    
    // Redirect to login after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex h-screen">
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

      <div className="flex-1 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto text-center">
          <div className="mb-8">
            <BsCheckCircleFill className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-medium font-primary mb-4">
              Password Reset Successful
            </h2>
            <p className="text-gray-600 font-primary">
              Your password has been successfully reset. You will be redirected to the login page in a few seconds.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gradient-to-r from-primary to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
