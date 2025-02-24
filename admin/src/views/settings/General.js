import React, { useState } from "react";
import Modal from "react-modal";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const General = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [joiningAge, setJoiningAge] = useState("24");
  const [referralCount, setReferralCount] = useState("3");

  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({
    link: "",
    reason: "",
    password: "",
  });

  const handleMaintenanceToggle = () => {
    if (!maintenanceMode) {
      setIsMaintenanceModalOpen(true);
    } else {
      setMaintenanceMode(false);
    }
  };

  const handleConfirm = () => {
    setMaintenanceMode(true);
    setIsMaintenanceModalOpen(false);
  };

  return (
    <div>
      {/* General Settings Content */}
      <div className="space-y-8">
        {/* Favicon */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg mb-4">Favicon</h3>
            <div className="w-20 h-20 rounded-full bg-[#540A26] flex items-center justify-center">
              <img
                src="/path/to/favicon.png"
                alt="Favicon"
                className="w-12 h-12"
              />
            </div>
          </div>
          <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
            Edit
          </button>
        </div>

        {/* Site Title */}
        <div>
          <h3 className="text-lg mb-4">Site Title</h3>
          <input
            type="text"
            value="Hevsuite Club"
            className="w-full max-w-md px-4 py-2 border rounded-lg bg-gray-50"
            readOnly
          />
        </div>

        {/* Maintenance Mode */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Maintenance Mode</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={maintenanceMode}
                onChange={handleMaintenanceToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
            </label>
          </div>
        </div>

        {/* Required Joining Age */}
        <div>
          <h3 className="text-lg mb-4">Required Joining Age</h3>
          <div className="relative inline-block">
            <input
              type="text"
              value={joiningAge}
              onChange={(e) => setJoiningAge(e.target.value)}
              className="w-24 px-4 py-2 border rounded-lg pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              yrs
            </span>
          </div>
        </div>

        {/* Required Number of Referral */}
        <div>
          <h3 className="text-lg mb-4">Required Number of Referral</h3>
          <input
            type="text"
            value={referralCount}
            onChange={(e) => setReferralCount(e.target.value)}
            className="w-24 px-4 py-2 border rounded-lg"
          />
        </div>
      </div>
      <Modal
        isOpen={isMaintenanceModalOpen}
        onRequestClose={() => setIsMaintenanceModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-red-500">⚠</span>
              </div>
              <h2 className="text-xl">Close Website Temporarily</h2>
            </div>
            <button
              onClick={() => setIsMaintenanceModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to close the website temporarily? Users will
            no longer be able to access the website.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Link/if any</label>
              <input
                type="text"
                value={maintenanceForm.link}
                onChange={(e) =>
                  setMaintenanceForm({
                    ...maintenanceForm,
                    link: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Reason</label>
              <input
                type="text"
                value={maintenanceForm.reason}
                onChange={(e) =>
                  setMaintenanceForm({
                    ...maintenanceForm,
                    reason: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={maintenanceForm.password}
                  onChange={(e) =>
                    setMaintenanceForm({
                      ...maintenanceForm,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your Password"
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsMaintenanceModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default General;
