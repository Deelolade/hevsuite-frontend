import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";

const CodeVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name="code-${index + 1}"]`
        );
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="code-${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

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

      {/* Right Side - 2FA Form */}
      <div className="flex items-center justify-center p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">
              Two Factor Authentication
            </h2>
            <p className="text-gray-600">
              Enter the verification code sent to your email
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex justify-center gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  maxLength={1}
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:border-[#540A26] focus:ring-1 focus:ring-[#540A26] outline-none"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Didn't receive code?{" "}
                <button type="button" className="text-[#540A26] font-medium">
                  Resend
                </button>
              </p>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
              >
                Verify
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 font-bold mt-8">
            <Link to="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            ,{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookies" className="hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
