import React from "react";

const PromoteAsk = ({ setIsPromoteModalOpen, selectedUser }) => {
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

      {selectedUser && (
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={selectedUser.user.avatar}
              alt={selectedUser.user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium text-[#323C47]">
                {selectedUser.user.name}
              </h3>
              <p className="text-sm text-gray-500">andrewbojangles@gmail.com</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-primary text-[#1A1A1A]">
                Askes Claimed
              </label>
              <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
                {selectedUser.asksClaimed}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Asks Delivered</label>
              <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
                {selectedUser.asksDelivered}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Promote</label>
              <select className="w-full px-4 py-2 border rounded-lg text-quatr">
                <option>VIP Member</option>
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
              onClick={() => {
                // Handle promotion
                setIsPromoteModalOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoteAsk;
