import React, { useState, useRef } from "react";
import { BsArrowLeft, BsPencil, BsX } from "react-icons/bs";
import { FaCheck, FaTimes, FaCloudUploadAlt } from "react-icons/fa";

const SupportRequestsView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("approved");
  const [showModal, setShowModal] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const requestData = {
    all: [
      {
        id: 1,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Pending",
      },
      {
        id: 2,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Pending",
      },
      { id: 3, type: "Card Request", date: "Jan 10, 2025", status: "Pending" },
    ],
    approved: [
      {
        id: 1,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Approved",
      },
      {
        id: 4,
        type: "Membership Upgrade",
        date: "Dec 20, 2024",
        status: "Approved",
      },
    ],
    pending: [
      { id: 3, type: "Card Request", date: "Jan 10, 2025", status: "Pending" },
    ],
    declined: [
      {
        id: 2,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Declined",
      },
      {
        id: 5,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Declined",
      },
    ],
  };

  const getCurrentData = () => {
    return requestData[activeTab] || requestData.all;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting request:", {
      type: requestType,
      description: requestDescription,
      image: uploadedImage,
    });

    setRequestType("");
    setRequestDescription("");
    setUploadedImage(null);
    setShowModal(false);
  };

  const renderCardView = () => {
    return getCurrentData().map((request) => (
      <div
        key={request.id}
        className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-sm text-gray-500">Request #{request.id}</span>
            <h3 className="font-medium">{request.type}</h3>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              request.status === "Approved"
                ? "bg-green-100 text-green-800"
                : request.status === "Declined"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {request.status}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-3">
          Submitted on: {request.date}
        </div>
        {request.status === "Declined" && (
          <div className="flex gap-2 mt-3 border-t pt-3">
            <button className="flex items-center gap-1 text-blue-600 text-sm">
              <BsPencil /> Edit
            </button>
            <button className="flex items-center gap-1 text-green-600 text-sm">
              <FaCheck /> Approve
            </button>
            <button className="flex items-center gap-1 text-red-600 text-sm">
              <FaTimes /> Delete
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg w-full p-3 sm:p-4 md:p-6">
      <div className="flex items-center mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-[#540A26] text-sm sm:text-base"
        >
          <BsArrowLeft /> Back
        </button>
      </div>

      <div className="mb-4 sm:mb-6">
        {/* Responsive Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("all")}
          >
            All Requests
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
              activeTab === "approved"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("approved")}
          >
            Approved
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
              activeTab === "pending"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("pending")}
          >
            Pending
          </button>
          <button
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base whitespace-nowrap ${
              activeTab === "declined"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("declined")}
          >
            Declined
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold hidden sm:block">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Requests
          </h2>
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#540A26] text-white rounded-lg text-sm sm:text-base ml-auto"
            onClick={() => setShowModal(true)}
          >
            Add Request
          </button>
        </div>

        {/* Table for larger screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left">
                <th className="pb-2 pr-4">No</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Submission Date</th>
                <th className="pb-2 pr-4">Status</th>
                {activeTab === "declined" && <th className="pb-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {getCurrentData().map((request, index) => (
                <tr key={request.id} className="border-t">
                  <td className="py-4 pr-4">{request.id}</td>
                  <td className="pr-4">{request.type}</td>
                  <td className="pr-4">{request.date}</td>
                  <td
                    className={`pr-4 ${
                      request.status === "Approved"
                        ? "text-green-500"
                        : request.status === "Declined"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {request.status}
                  </td>
                  {request.status === "Declined" && (
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          title="Edit"
                        >
                          <BsPencil />
                        </button>
                        <button
                          className="text-green-500 hover:text-green-700 transition-colors"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Delete"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden">
          {getCurrentData().length > 0 ? (
            renderCardView()
          ) : (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} requests found.
            </div>
          )}
        </div>
      </div>

      {/* Support Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">
                Submit Support Request
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <BsX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="requestType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Request Type
                </label>
                <div className="relative">
                  <select
                    id="requestType"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white text-gray-700 rounded-lg border border-gray-300 appearance-none text-sm sm:text-base"
                  >
                    <option value="" disabled>
                      Type of Request
                    </option>
                    <option value="Evidence Review">Evidence Review</option>
                    <option value="Card Request">Card Request</option>
                    <option value="Membership Upgrade">
                      Membership Upgrade
                    </option>
                    <option value="Other Support">Other Support</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting Image (Optional)
                </label>
                <div className="flex justify-center">
                  <div
                    className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 w-full hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {uploadedImage ? (
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-32 h-32 object-cover rounded-md mb-2"
                        />
                        <button
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedImage(null);
                          }}
                        >
                          <BsX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="text-[#540A26] mb-2">
                        <FaCloudUploadAlt size={32} />
                      </div>
                    )}
                    <span className="text-[#540A26] text-sm">
                      {uploadedImage ? "Change image" : "Click to upload image"}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="requestDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="requestDescription"
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  placeholder="Provide details about your request..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white text-gray-700 rounded-lg border border-gray-300 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm sm:text-base hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#540A26] text-white rounded-lg text-sm sm:text-base hover:bg-[#6b0d31] transition-colors"
                  disabled={!requestType || !requestDescription}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when no requests */}
      {getCurrentData().length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-md mx-auto">
            You don't have any {activeTab !== "all" ? activeTab : ""} support
            requests yet. Create a new request for assistance.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#540A26] text-white rounded-lg text-sm sm:text-base inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create Support Request
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportRequestsView;
