import React, { useState } from "react";
import Modal from "react-modal";

const CancelCardModal = ({ onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cancel Card</h2>
        <button onClick={() => onClose(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Are you sure you want to cancel this card, request is not reversible
          and action is permanent?
        </p>

        <div>
          <label className="block text-sm mb-2">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="What the reason?"
            className="w-full px-3 py-2.5 border font-secondary italic rounded-lg text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => onClose(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(reason);
              setReason("");
            }}
            className="px-6 py-2 bg-secondary text-white rounded-lg text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    // </Modal>
  );
};

export default CancelCardModal;
