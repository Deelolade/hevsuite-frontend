import React, { useState } from "react";
import { BsCamera } from "react-icons/bs";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import avatar from "../../assets/user.avif";

const AdminProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "Your Full Name",
    email: "raed@gmail.com",
    role: "Super Admin",
    password: "••••••••••••••••••••••••",
    twoFactorPreference: "Email",
    avatar: avatar,
  });

  const supportStats = [
    { title: "Total Requests", count: "1349" },
    { title: "Pending Requests", count: "32" },
    { title: "Completed Requests", count: "1280" },
    { title: "Assigned Requests", count: "1280" },
  ];

  const handleEditSave = () => {
    if (isEditMode) {
      setIsConfirmModalOpen(true);
    } else {
      setIsEditMode(true);
    }
  };

  const handleConfirmSave = () => {
    // Add your save logic here
    setIsConfirmModalOpen(false);
    setIsEditMode(false);
    setConfirmPassword("");
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };
  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label
              htmlFor="avatarInput"
              className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border cursor-pointer"
            >
              <BsCamera size={14} />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-medium">Raed Read</h2>
            <p className="text-gray-500">raed@gmail.com</p>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg"
          onClick={handleEditSave}
        >
          {isEditMode ? "Save" : "Edit"}
        </button>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${
                !isEditMode ? "bg-gray-50" : "bg-white"
              }`}
              readOnly={!isEditMode}
            />
          </div>
          <div>
            <label className="block mb-2">Role</label>
            <div className="relative">
              <select
                value="Super Admin"
                className={`w-full px-4 py-2 border rounded-lg appearance-none ${
                  !isEditMode ? "bg-[#f9f9f9]" : ""
                }`}
                disabled={true}
              >
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <label className="block mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={profileData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg ${
                  !isEditMode ? "bg-gray-50" : "bg-white"
                }`}
                readOnly={!isEditMode}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-2">Select 2FA Preference</label>
            <div className="relative">
              <select
                value={profileData.twoFactorPreference}
                onChange={(e) =>
                  handleInputChange("twoFactorPreference", e.target.value)
                }
                className={`w-full px-4 py-2 border rounded-lg appearance-none ${
                  !isEditMode ? "bg-gray-50" : "bg-white"
                }`}
                disabled={!isEditMode}
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Authenticator">Authenticator</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Support Request Section */}
        <div className="pt-6">
          <div
            className="flex items-center justify-between mb-4 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <span className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                🎧
              </span>
              <span>Support Request</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">32+</span>
              <svg
                className={`w-4 h-4 text-gray-400 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {isDropdownOpen && (
            <>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {supportStats.map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                        👤
                      </span>
                      <span className="text-gray-600 text-sm">
                        {stat.title}
                      </span>
                    </div>
                    <p className="text-xl font-semibold">{stat.count}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="mb-2">My email Address</h3>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mt-1">
              ✉️
            </div>
            <div>
              <p>raed@gmail.com</p>
              <p className="text-gray-500 text-sm">1 month ago</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Are you sure you want to make changes?</h2>
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to update your account? The change is
            permanent and cannot be restored.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProfile;
