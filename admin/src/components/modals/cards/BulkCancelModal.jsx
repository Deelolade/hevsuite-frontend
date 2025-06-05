
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { bulkCancelCards } from "../../../store/cards/cardSlice";
import { toast } from "react-toastify";

const BulkCancelModal = ({ onClose, selectedCount, selectedCards, onBulkCancelSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const result = await dispatch(bulkCancelCards({
        cardIds: selectedCards,
        password,
        reason: "Bulk cancellation by admin"
      })).unwrap();

      toast.success(result.message || "Cards cancelled successfully");
      onBulkCancelSuccess?.();
      onClose(false);
    } catch (error) {
      // Handle specific error messages from the backend
      if (error.includes("Invalid password")) {
        setError("Invalid password. Please try again.");
      } else if (error.includes("Unauthorized")) {
        setError("You are not authorized to perform this action.");
      } else {
        setError(error || "Failed to cancel cards. Please try again.");
      }
      toast.error(error || "Failed to cancel cards");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error when user types
              }}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm pr-10 ${
                error ? "border-red-500" : ""
              }`}
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
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
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => onClose(false)}
            className="px-6 py-2 border rounded-lg text-sm"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? "Processing..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkCancelModal;
