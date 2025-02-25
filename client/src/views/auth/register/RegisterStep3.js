import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const RegisterStep3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    addressLine1: "",
    townCity: "",
    country: "",
    postcode: "",
    primaryEmail: "",
    secondaryEmail: "",
    state: "",
    primaryPhone: "",
    primaryPhoneCode: "",
    secondaryPhone: "",
    secondaryPhoneCode: "",
  });

  const steps = [
    { number: "1", label: "Step 1", completed: true },
    { number: "2", label: "Step2", completed: true },
    { number: "3", label: "Step 3", active: true },
    { number: "04", label: "Step 4" },
    { number: "05", label: "Step 5" },
    { number: "06", label: "Step 6" },
    { number: "07", label: "Step 7" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register-4");
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
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-[#0A5440]"
                      : step.active
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {step.completed ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : (
                    <span
                      className={step.active ? "text-white" : "text-gray-500"}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-32 h-[2px] ${
                    step.completed || step.active
                      ? "bg-[#0A5440]"
                      : "bg-gray-300"
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
            📍
          </span>
          Contact Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F8FAFA] p-8 rounded-lg space-y-6"
        >
          <div>
            <label className="block mb-2">
              Address Line 1<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Town/City"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.townCity}
              onChange={(e) =>
                setFormData({ ...formData, townCity: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Country<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
            >
              <option value="">Select Country</option>
              {/* Add country options */}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Postcode/Zipcode<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Postcode/Zipcode"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Primary Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.primaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, primaryEmail: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              Secondary Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.secondaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, secondaryEmail: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-2">
              State<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            >
              <option value="">Select State</option>
              {/* Add state options based on selected country */}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Primary Phone<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <select
                className="px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.primaryPhoneCode}
                onChange={(e) =>
                  setFormData({ ...formData, primaryPhoneCode: e.target.value })
                }
                required
              >
                <option value="">Code</option>
                {/* Add country codes */}
              </select>
              <input
                type="tel"
                placeholder="Telephone"
                className="col-span-2 px-4 py-3 border rounded-lg"
                value={formData.primaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, primaryPhone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Secondary Phone<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              <select
                className="px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.secondaryPhoneCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    secondaryPhoneCode: e.target.value,
                  })
                }
                required
              >
                <option value="">Code</option>
                {/* Add country codes */}
              </select>
              <input
                type="tel"
                placeholder="Mobile"
                className="col-span-2 px-4 py-3 border rounded-lg"
                value={formData.secondaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryPhone: e.target.value })
                }
                required
              />
            </div>
          </div>
        </form>

        <div className="flex justify-between mt-8">
          <Link to="/register-2" className="text-gray-600 font-medium">
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

export default RegisterStep3;
