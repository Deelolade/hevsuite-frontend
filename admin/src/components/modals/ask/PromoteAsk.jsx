import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { promoteAsks } from "../../../store/ask/askSlice";
import toast from "react-hot-toast";

const PromoteAsk = ({ setIsPromoteModalOpen, selectedUser }) => {
  const dispatch = useDispatch();
  const [memberStatus, setMemberStatus] = useState(selectedUser?.membershipType || "Standard Member");

  const handlePromote = async () => {
    try {
      await dispatch(promoteAsks({
        id: selectedUser._id,
        memberStatus
      })).unwrap();
      
      setIsPromoteModalOpen(false);
    } catch (error) {
      toast.error(error || "Failed to promote user");
    }
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium font-secondary">Promote User</h2>
        <button
          onClick={() => setIsPromoteModalOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePhoto || "/placeholder-avatar.png"}
            alt={`${selectedUser.forename} ${selectedUser.surname}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-[#323C47]">
              {`${selectedUser.forename} ${selectedUser.surname}`}
            </h3>
            <p className="text-sm text-gray-500">{selectedUser.primaryEmail}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-primary text-[#1A1A1A]">
              Asks Claimed
            </label>
            <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
              {selectedUser.asksClaimed || 0}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Asks Delivered</label>
            <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
              {selectedUser.asksDelivered || 0}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Current Membership Type
            </label>
            <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
              {selectedUser.membershipType || "Standard Member"}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Promote to</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg text-quatr"
              value={memberStatus}
              onChange={(e) => setMemberStatus(e.target.value)}
            >
              <option value="Standard Member">Standard Member</option>
              <option value="VIP Member">VIP Member</option>
              <option value="Premium Member">Premium Member</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsPromoteModalOpen(false)}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg"
            onClick={handlePromote}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteAsk;
