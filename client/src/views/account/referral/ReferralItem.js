import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";

const ReferralItem = ({ referral, activeTab }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <img
            src={referral.image}
            alt={referral.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-black font-primary">
              {referral.name}
            </h3>
            <p className="text-sm text-gray-600 font-primary">
              {referral.date}
            </p>
          </div>
        </div>
        {activeTab === "Successful Referrals" ? (
          <div className="bg-white text-black shadow-lg font-primary rounded-lg px-12 py-2">
            {referral.relationship}
          </div>
        ) : activeTab === "Pending Referrals" ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setIsCancelModalOpen(true)}
          >
            Cancel Referral <IoClose />
          </button>
        ) : (
          <div className="text-gray-400 px-4 py-2 rounded-lg flex items-center gap-2">
            Cancelled Referral <IoClose />
          </div>
        )}
      </div>
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[500px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
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

          <p className="text-gray-600 mb-6">
            Are you sure you want to cancel this referral?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
            >
              No, Keep it
            </button>
            <button
              onClick={() => {
                // Add cancel logic here
                setIsCancelModalOpen(false);
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
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
