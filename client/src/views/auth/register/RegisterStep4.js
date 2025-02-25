import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

const RegisterStep4 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employmentStatus: "",
    interests: [],
    otherClubMembership: "",
    preferredSocialMedia: "",
    marketingConsent: false,
  });

  const interests = [
    ["Art & Design", "Cigars", "Country Pursuits"],
    ["Dance", "Family Entertainment", "Fashion"],
    ["Film", "Food", "Literature"],
    ["Music/Dj", "Politics", "Sport"],
    ["Technology", "Theatre", "Travel"],
    ["Wellness & Beauty", "Wine & Spirits", "Yoga"],
  ];

  const handleInterestToggle = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register-5");
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
                    index < 4
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 3 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : index === 3 ? (
                    <span className="text-white">4</span>
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
                    index < 3 ? "bg-[#0A5440]" : "bg-gray-300"
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
          Occupation & Interest
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#F8FAFA] p-8 rounded-lg space-y-8"
        >
          <div>
            <label className="block mb-2">
              Employment Status<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
              value={formData.employmentStatus}
              onChange={(e) =>
                setFormData({ ...formData, employmentStatus: e.target.value })
              }
              required
            >
              <option value="">Select Option</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-employed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <h3 className="text-xl font-medium text-center mb-4">
              Your Interest
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Please select all/any interests from the following:
            </p>
            <div className="grid grid-cols-3 gap-4">
              {interests.flat().map((interest, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Are you a member of any other club?
            </label>
            <input
              type="text"
              placeholder="Enter club name"
              className="w-full px-4 py-3 border rounded-lg"
              value={formData.otherClubMembership}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherClubMembership: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Preferred Social Media Platform
              <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
              value={formData.preferredSocialMedia}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredSocialMedia: e.target.value,
                })
              }
              required
            >
              <option value="">Select an Option</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) =>
                setFormData({ ...formData, marketingConsent: e.target.checked })
              }
              className="mt-1 w-4 h-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              By ticking this box, you are confirming that you are happy to
              receive marketing communications from us. You can choose to
              unsubscribe at any time by clicking unsubscribe in the footer of
              the email.
            </span>
          </label>
        </form>

        <div className="flex justify-between mt-8">
          <Link to="/register-3" className="text-gray-600 font-medium">
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

export default RegisterStep4;
