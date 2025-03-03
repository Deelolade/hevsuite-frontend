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
    <div className="min-h-screen md:grid md:grid-cols-2 relative">
      {/* Background Image - Visible on all screens */}
      <div className="absolute inset-0 md:relative md:block">
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for mobile */}
          <div className="absolute inset-0 bg-black/60 md:bg-transparent"></div>
        </div>

        {/* Desktop Left Side Content */}
        <div className="hidden md:flex relative z-10 p-16 flex-col h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-2xl mb-4">
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
              className="p-4 px-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Code Verification Form - Centered on mobile, right side on desktop */}
      <div className="flex items-center justify-center relative z-10 p-4 md:p-16">
        <div className="w-full max-w-md p-8 rounded-lg md:bg-transparent md:p-0">
          {/* Logo for mobile only */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-16 h-16" />
            </div>
          </div>
          <div className="bg-white max-w-md p-8 rounded-xl">
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-2 font-primary text-[#333333]">
                Two Factor Authentication
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Enter the verification code sent to your email
              </p>
            </div>

            <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="flex justify-center gap-2 md:gap-4">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`code-${index}`}
                    maxLength={1}
                    className="w-10 h-10 md:w-12 md:h-12 text-center text-xl md:text-2xl border border-gray-300 rounded-lg focus:border-[#540A26] focus:ring-1 focus:ring-[#540A26] outline-none"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  Didn't receive code?{" "}
                  <button type="button" className="text-[#540A26] font-medium">
                    Resend
                  </button>
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>

          {/* Mobile-only bottom section */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-white mb-4">Don't have an Account?</p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-base font-medium"
            >
              Become a member now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;
