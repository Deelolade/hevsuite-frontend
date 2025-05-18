import React from "react";
import { BsCalendar } from "react-icons/bs";
import { format } from "date-fns";

const AllAskDetails = ({ setOpenDetails, selectedAsk }) => {
  if (!selectedAsk) return null;

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

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={selectedAsk.createdBy?.profilePhoto || "/placeholder-avatar.png"}
              alt={`${selectedAsk.createdBy?.forename || ""} ${selectedAsk.createdBy?.surname || ""}`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-[#323C47]">
              {`${selectedAsk.createdBy?.forename || ""} ${selectedAsk.createdBy?.surname || ""}`}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedAsk.createdBy?.primaryEmail  || "No email provided"}
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
                {selectedAsk.description || "No description provided"}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr">
                {selectedAsk.status || "current"}
              </div>
            </div>

            {selectedAsk.deadline && (
              <div>
                <label className="block text-sm mb-1">Deadline</label>
                <div className="px-4 py-2 border rounded-lg bg-gray-50 text-quatr flex justify-between items-center">
                  <span>
                    {format(new Date(selectedAsk.deadline), "dd MMMM, yyyy")}
                  </span>
                  <BsCalendar className="text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              onClick={() => setOpenDetails(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAskDetails;