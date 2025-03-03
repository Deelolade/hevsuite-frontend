import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import Footer from "../../../components/Footer";
import logo_white from "../../../assets/logo_white.png";
import bg_image from "../../../assets/party3.jpg";

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
    <div className="min-h-screen flex flex-col">
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[120px] object-cover brightness-50"
          />
        </div>
        <header className="relative z-10 py-4">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <img
              src={logo_white}
              alt="Hevsuite Club"
              className="h-12 md:h-16"
            />
            {/* <button className="md:hidden text-white text-2xl">
              <span>☰</span>
            </button> */}
          </div>
        </header>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6 mt-8">
        <div className="flex flex-wrap justify-center gap-4 pb-6 md:pb-0">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 3
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 2 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : index === 2 ? (
                    <span className="text-white">3</span>
                  ) : (
                    <span className="text-gray-500">{`0${index + 1}`}</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-12 md:w-32 h-[2px] ${
                    index < 2 ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl flex-grow">
        <h1 className="text-2xl md:text-3xl font-medium text-center mb-8 md:mb-12 flex items-center justify-center gap-2 md:gap-3 text-[#540A26]">
          <span className="w-6 h-6 md:w-8 md:h-8 bg-[#540A26] rounded-full flex items-center justify-center text-white text-sm md:text-base">
            📍
          </span>
          Contact Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#E3F8F959] p-4 md:p-8 rounded-lg space-y-4 md:space-y-6"
        >
          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Address Line 1<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Address Line 1"
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Town/City"
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
              value={formData.townCity}
              onChange={(e) =>
                setFormData({ ...formData, townCity: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Country<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base"
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
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Postcode/Zipcode<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Postcode/Zipcode"
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Primary Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
              value={formData.primaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, primaryEmail: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Secondary Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
              value={formData.secondaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, secondaryEmail: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              State<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base"
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
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Primary Phone<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <select
                className="px-2 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base"
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
                className="col-span-2 px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
                value={formData.primaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, primaryPhone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 md:mb-2 text-sm md:text-base">
              Secondary Phone
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <select
                className="px-2 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base"
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
                className="col-span-2 px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base"
                value={formData.secondaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryPhone: e.target.value })
                }
              />
            </div>
          </div>
        </form>

        <div className="flex justify-between mt-6 md:mt-8">
          <Link
            to="/register-2"
            className="text-gray-600 font-medium text-sm md:text-base"
          >
            BACK
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl text-sm md:text-base hover:bg-[#540A26] hover:text-white transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterStep3;
