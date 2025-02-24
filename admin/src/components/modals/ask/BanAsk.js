import React from "react";

const BanAsk = ({ setIsBanModalOpen, setOpenDetails }) => {
  return (
    <div>
      {" "}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">⚠</span>
            <h2 className="text-xl font-semibold">Ban Ask</h2>
          </div>
          <button
            onClick={() => setIsBanModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            Are you sure you want to ban this Ask? Removing this content will
            permanently erase it from the website when saved.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsBanModalOpen(false)}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle ban confirmation
                setIsBanModalOpen(false);
                setOpenDetails(false);
              }}
              className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanAsk;
