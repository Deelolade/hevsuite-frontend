import React, { useState } from "react";
import { BsCalendar, BsPencil } from "react-icons/bs";
import avatar from "../../../assets/user.avif";

const VIPProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Good Luck",
    gender: "Male",
    email: "goodlucks@gmail.com",
    dob: "23 January, 2025",
    phone: "+251-988-049229",
    country: "London",
  });

  const [cardRequest, setCardRequest] = useState({
    fullName: "Good Luck",
    cardType: "Standard",
    disableCurrent: "No",
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes logic would go here
      // For now, just toggle editing mode
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  return (
    <div className="text-black">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-8 text-black">
        <img
          src={avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Good luck</h2>
          <p className="text-gray-600 mb-1">VIP Membership/12345678</p>
          <p className="text-gray-500">goodlucks@gmail.com</p>
        </div>
        <button
          className={`px-6 py-2 ${
            isEditing ? "bg-green-600" : "bg-[#540A26]"
          } text-white rounded-lg`}
          onClick={handleEditToggle}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Fields */}
        <div>
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.fullName}
            disabled={!isEditing}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>
        <div>
          <label className="block mb-2">Gender</label>
          <div className="relative">
            <select
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 appearance-none ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
              value={profileData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              disabled={!isEditing}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            disabled={!isEditing}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>
        <div>
          <label className="block mb-2">Date of birth</label>
          <div className="relative">
            <input
              type="text"
              value={profileData.dob}
              disabled={!isEditing}
              onChange={(e) => handleInputChange("dob", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
            />
            <BsCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block mb-2">Phone Number</label>
          <input
            type="text"
            value={profileData.phone}
            disabled={!isEditing}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border border-gray-200 ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <div className="relative">
            <select
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 appearance-none ${
                isEditing ? "bg-white" : "bg-gray-50"
              }`}
              value={profileData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={!isEditing}
            >
              <option>London</option>
              <option>New York</option>
              <option>Paris</option>
              <option>Tokyo</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Two Factor Authentication */}
      <div className="mt-8">
        <h3 className="font-semibold mb-4">
          Enable/disable Two Factor authentication
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked
                className="w-4 h-4 accent-[#540A26]"
                readOnly={!isEditing}
                onChange={() => {}} // Add handler if needed
              />
              <span>goodlucks@gmail.com</span>
            </div>
            <span className="text-gray-500 text-sm">1 month ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#540A26]"
                readOnly={!isEditing}
                onChange={() => {}} // Add handler if needed
              />
              <span>+251988049229</span>
            </div>
            <span className="text-gray-500 text-sm">1 month ago</span>
          </div>
        </div>
      </div>

      {/* Request a New Club Card */}
      <div className="mt-8">
        <h3 className="font-semibold mb-4">Request a New Club Card</h3>
        <div className="border border-gray-400 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block mb-2">Full name</label>
              <div className="relative">
                <input
                  type="text"
                  value={cardRequest.fullName}
                  className="w-full px-4 py-3 bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <BsPencil className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="md:col-span-1 md:row-span-3 md:justify-self-end md:mt-0">
              <div className="p-4 rounded-lg">
                <h4 className="font-medium mb-2">Payment Summary:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Club Card Fee:</span>
                    <span className="font-medium">$10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="border-t border-gray-300 my-2 pt-2 flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">$15</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block mb-2">Card Type</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200 appearance-none"
                  value={cardRequest.cardType}
                  onChange={(e) =>
                    setCardRequest({ ...cardRequest, cardType: e.target.value })
                  }
                >
                  <option>Standard</option>
                  <option>VIP</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2">Disable Current Card</label>
              <div className="flex items-center">
                <div className="relative flex-1 ">
                  <select
                    className="w-full px-4 py-3  bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200 appearance-none"
                    value={cardRequest.disableCurrent}
                    onChange={(e) =>
                      setCardRequest({
                        ...cardRequest,
                        disableCurrent: e.target.value,
                      })
                    }
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="md:col-span-2 mt-6 flex-1">
                  <div className="flex justify-end gap-3">
                    <button className="px-6 py-1 border border-gradient_r text-[#444444] rounded-lg">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg">
                      Request New Club Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPProfile;
