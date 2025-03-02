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

  // Sample data for different request types
  const requestData = {
    all: [
      {
        id: 1,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Approved",
      },
      {
        id: 2,
        type: "Evidence Review",
        date: "Jan 16, 2025",
        status: "Declined",
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

  // Get the current data based on active tab
  const getCurrentData = () => {
    return requestData[activeTab] || requestData.all;
  };

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle file upload
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

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting request:", {
      type: requestType,
      description: requestDescription,
      image: uploadedImage,
    });

    // Reset form and close modal
    setRequestType("");
    setRequestDescription("");
    setUploadedImage(null);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-lg w-full p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-[#540A26]"
        >
          <BsArrowLeft /> Back
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "all"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("all")}
          >
            All Requests
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "approved"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("approved")}
          >
            Approved Requests
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "pending"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("pending")}
          >
            Pending Requests
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "declined"
                ? "bg-[#540A26] text-white"
                : "bg-white border border-gray-300"
            }`}
            onClick={() => handleTabClick("declined")}
          >
            Declined Requests
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Support Request
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left">
              <th className="pb-2">No</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Submission Date</th>
              <th className="pb-2">Status</th>
              {activeTab === "declined" && <th className="pb-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {getCurrentData().map((request, index) => (
              <tr key={request.id} className="border-t">
                <td className="py-4">{request.id}</td>
                <td>{request.type}</td>
                <td>{request.date}</td>
                <td
                  className={`${
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
                      <button className="text-blue-500">
                        <BsPencil />
                      </button>
                      <button className="text-green-500">
                        <FaCheck />
                      </button>
                      <button className="text-red-500">
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

      {/* Support Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Submit Support Request</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <BsX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="relative">
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 appearance-none"
                  >
                    <option value="" disabled>
                      Type of Request
                    </option>
                    <option value="Evidence Review">Evidence Review</option>
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

              <div className="flex justify-center">
                <div
                  className="flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-32 h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="text-[#540A26] mb-2">
                      <FaCloudUploadAlt size={32} />
                    </div>
                  )}
                  <span className="text-[#540A26] text-sm">
                    Click to Add icon
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <textarea
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  placeholder="Message/Request Description"
                  className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 min-h-[120px]"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportRequestsView;
