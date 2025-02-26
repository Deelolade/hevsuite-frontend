import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloudUpload } from "react-icons/ai";
import logo from "../../assets/logo_white.png";

const SiteLogos = () => {
  const [isWebsiteLogoModalOpen, setIsWebsiteLogoModalOpen] = useState(false);
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Site Logos</h2>

      {/* Website Logo Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Website logo</h3>
          <div className="w-16 h-16  rounded-lg flex items-center justify-center">
            {/* <span className="text-white text-2xl font-bold">h</span> */}
            <img src={logo} alt="web logo" />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
          onClick={() => setIsWebsiteLogoModalOpen(true)}
        >
          Upload New
        </button>
      </div>

      {/* Admin Logo Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Admin logo</h3>
          <div className="w-16 h-16  rounded-lg flex items-center justify-center">
            <img src={logo} alt="admin logo" />
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Upload New
        </button>
      </div>

      {/* Fav Icon Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Fav Icon</h3>
          <div className="w-16 h-16  rounded-lg flex items-center justify-center">
            <img src={logo} alt="fav logo" />
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Upload New
        </button>
      </div>

      {/* Footer Icon Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Footer Icon</h3>
          <div className="w-16 h-16  rounded-lg flex items-center justify-center">
            <img src={logo} alt="footer logo" />
          </div>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
          Upload New
        </button>
      </div>

      <Modal
        isOpen={isWebsiteLogoModalOpen}
        onRequestClose={() => setIsWebsiteLogoModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Change Website Logo</h2>
            <button
              onClick={() => setIsWebsiteLogoModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Logo Preview */}
            <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center">
              <img src={logo} alt="web logo" />
            </div>

            {/* Upload Button */}
            <div className="flex flex-col items-center gap-2">
              <button className="text-primary flex items-center gap-2">
                <AiOutlineCloudUpload size={20} />
                <span>Click to replace image</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsWebsiteLogoModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle save
                  setIsWebsiteLogoModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SiteLogos;
