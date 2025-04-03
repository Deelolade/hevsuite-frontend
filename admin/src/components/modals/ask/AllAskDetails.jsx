import React from "react";
import { BsCalendar } from "react-icons/bs";

const AllAskDetails = ({ setOpenDetails, selectedAsk }) => {
  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold font-secondary">Ask Details</h2>
          <button
            onClick={() => setOpenDetails(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {selectedAsk && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={selectedAsk.user.avatar}
                alt={selectedAsk.user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-[#323C47]">
                  {selectedAsk.user.name}
                </h3>
                <p className="text-sm text-gray-500">
                  andrewbojangles@gmail.com
                </p>
              </div>
            </div>

            {/* Ask Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Ask Title</label>
                <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
                  {selectedAsk.title}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Descriptions</label>
                <div className="px-4 py-2 border rounded-lg bg-gray-50 min-h-[80px] text-quatr">
                  Looking for volunteers to assist at the annual || charity
                  event this weekend.
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Deadline</label>
                <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr flex justify-between items-center">
                  <span>23 January, 2025!</span>
                  <BsCalendar className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4">
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => setOpenDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAskDetails;
