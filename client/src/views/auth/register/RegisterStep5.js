import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill, BsEye, BsEyeSlash } from "react-icons/bs";

const RegisterStep5 = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    proofOfId: null,
    picture: null,
    password: "",
    confirmPassword: "",
  });

  const handleFileUpload = (type, file) => {
    setFormData({ ...formData, [type]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register-6");
  };

  return (
    <div className="min-h-screen">
      {/* Header with Logo */}
      <header className="bg-black py-4">
        <div className="container mx-auto px-4">
          <img src="/logo.png" alt="Hevsuite Club" className="h-16" />
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 5
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 4 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : index === 4 ? (
                    <span className="text-white">5</span>
                  ) : (
                    <span className="text-gray-500">{`0${index + 1}`}</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-32 h-[2px] ${
                    index < 4 ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-12 flex items-center justify-center gap-3">
          <span className="w-8 h-8 bg-[#540A26] rounded-full flex items-center justify-center text-white">
            📄
          </span>
          Supporting Documents
        </h1>

        <div className="space-y-8">
          {/* Upload Proof of ID */}
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Upload Proof of ID</h3>
            <p className="text-gray-600 mb-6">
              Please upload a clear photo of your proof of ID e.g. Driving
              license or passport
            </p>
            <button
              onClick={() => document.getElementById("proofOfId").click()}
              className="px-6 py-3 bg-[#540A26] text-white rounded-lg flex items-center justify-center gap-2 mx-auto"
            >
              Upload Files
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </button>
            <input
              type="file"
              id="proofOfId"
              className="hidden"
              onChange={(e) => handleFileUpload("proofOfId", e.target.files[0])}
              accept="image/*,.pdf"
            />
          </div>

          {/* Upload Picture */}
          <div className="bg-white rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Upload Picture</h3>
            <p className="text-gray-600 mb-6">
              Please upload a clear photo of a recent headshot of yourself.
            </p>
            <button
              onClick={() => document.getElementById("picture").click()}
              className="px-6 py-3 bg-[#540A26] text-white rounded-lg flex items-center justify-center gap-2 mx-auto"
            >
              Upload Files
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </button>
            <input
              type="file"
              id="picture"
              className="hidden"
              onChange={(e) => handleFileUpload("picture", e.target.files[0])}
              accept="image/*"
            />
          </div>

          {/* Password Fields */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password again"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/register-4" className="text-gray-600 font-medium">
            BACK
          </Link>
          <button
            onClick={handleSubmit}
            className="px-8 py-3  text-[#540A26] rounded-lg"
          >
            Continue →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span>Follow us</span>
              <Link to="#" className="text-gray-600">
                Facebook
              </Link>
              <Link to="#" className="text-gray-600">
                Twitter
              </Link>
              <Link to="#" className="text-gray-600">
                Instagram
              </Link>
              <Link to="#" className="text-gray-600">
                LinkedIn
              </Link>
            </div>
            <div className="flex gap-8">
              <Link to="/policies" className="text-gray-600">
                Policies
              </Link>
              <Link to="/about" className="text-gray-600">
                HH Club & Founder
              </Link>
            </div>
            <div className="text-gray-600">
              2024 Hazor Group (Trading as HH Club)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RegisterStep5;
