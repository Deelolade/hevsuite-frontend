import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const BulkCancelModal = ({ onClose, selectedCount, onConfirm, selectedCards }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Bulk Cancel Cards</h2>
        <button onClick={() => onClose(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Are you sure you want to cancel {selectedCount} selected cards? This
          action cannot be undone.
        </p>

        <div>
          <label className="block text-sm mb-2">Your Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border rounded-lg text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>
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
              // Handle bulk cancel logic here
              console.log("Bulk cancelling with password:", password);
              // Ensure API call is made here
              fetch('http://localhost:5000/admin/bulk-cancel', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, selectedCount, cardIds: selectedCards }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                  onConfirm(password);
                  onClose(false);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkCancelModal;
