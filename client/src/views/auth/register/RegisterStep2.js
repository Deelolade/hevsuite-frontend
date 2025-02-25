import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    forename: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    additionalNationality: "",
    relationshipStatus: "",
  });

  const steps = [
    { number: "1", label: "Step 1", completed: true },
    { number: "2", label: "Step2", active: true },
    { number: "03", label: "Step 3" },
    { number: "04", label: "Step 4" },
    { number: "05", label: "Step 5" },
    { number: "06", label: "Step 6" },
    { number: "07", label: "Step 7" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    navigate("/register-3");
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
            👤
          </span>
          Personal Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F8FAFA] p-8 rounded-lg space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Title<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              >
                <option value="">Select title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Forename<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.forename}
                onChange={(e) =>
                  setFormData({ ...formData, forename: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block mb-2">
                Surname<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter surname"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border rounded-lg"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Nationality<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                required
              >
                <option value="">Select Nationality</option>
                {/* Add nationality options */}
              </select>
            </div>
            <div>
              <label className="block mb-2">
                Additional Nationality<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={formData.additionalNationality}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    additionalNationality: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Additional Nationality</option>
                {/* Add nationality options */}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Relationship Status<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
              value={formData.relationshipStatus}
              onChange={(e) =>
                setFormData({ ...formData, relationshipStatus: e.target.value })
              }
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
        </form>

        <div className="flex justify-between mt-8">
          <Link to="/register" className="text-gray-600 font-medium">
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

export default RegisterStep2;
