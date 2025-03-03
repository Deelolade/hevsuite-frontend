import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";

const ReferralItem = ({ referral, activeTab }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-2 sm:px-0 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={referral.image}
            alt={referral.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-black font-primary text-sm sm:text-base">
              {referral.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-primary">
              {referral.date}
            </p>
          </div>
        </div>
        {activeTab === "Successful Referrals" ? (
          <div className="bg-white text-black shadow-lg font-primary rounded-lg px-4 sm:px-12 py-1.5 sm:py-2 text-sm sm:text-base text-center">
            {referral.relationship}
          </div>
        ) : activeTab === "Pending Referrals" ? (
          <button
            className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
            onClick={() => setIsCancelModalOpen(true)}
          >
            Cancel Referral <IoClose />
          </button>
        ) : (
          <div className="text-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
            Cancelled Referral <IoClose />
          </div>
        )}
      </div>
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="relative">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Cancel Referral
            </h2>
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Are you sure you want to cancel this referral?
          </p>

          <div className="flex justify-end gap-2 sm:gap-3">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
            >
              No, Keep it
            </button>
            <button
              onClick={() => {
                // Add cancel logic here
                setIsCancelModalOpen(false);
              }}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm"
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReferralItem;
