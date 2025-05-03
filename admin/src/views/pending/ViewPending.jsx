import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";

const ViewPending = ({ setShowViewPending, viewUser, onAccept, onReject }) => {
  const [activeTab, setActiveTab] = useState("personal");

  if (!viewUser) return null;

  const handleAccept = () => {
    onAccept(viewUser);
  };

  const handleReject = () => {
    onReject(viewUser);
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with back button and user info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowViewPending(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
        >
            <IoArrowBack className="text-2xl" />
        </button>
          <h2 className="text-2xl font-semibold">View Pending Registration</h2>
      </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src={viewUser.profilePhoto || avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
          />
          <div>
              <h3 className="font-medium">{`${viewUser.forename} ${viewUser.surname}`}</h3>
              <p className="text-sm text-gray-500">{viewUser.primaryEmail}</p>
          </div>
        </div>

          <div className="flex items-center gap-2">
              <button
              onClick={handleReject}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <FaTimes size={18} />
              </button>
              <button
              onClick={handleAccept}
              className="p-2 text-green-500 hover:bg-green-50 rounded-full"
            >
              <FaCheck size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <BsThreeDotsVertical size={18} />
              </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "personal"
              ? "border-[#0A5438] text-[#0A5438]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "address"
              ? "border-[#0A5438] text-[#0A5438]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("address")}
          >
            Address Detail
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "documents"
              ? "border-[#0A5438] text-[#0A5438]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "status"
              ? "border-[#0A5438] text-[#0A5438]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("status")}
          >
            Registration Status
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Title</label>
                    <p className="font-medium">{viewUser.title || "Not provided"}</p>
        </div>
                  <div className="grid grid-cols-2 gap-4">

            <div>
                      <label className="text-sm text-gray-500">Forename</label>
                      <p className="font-medium">{viewUser.forename || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Surname</label>
                      <p className="font-medium">{viewUser.surname || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{viewUser.primaryEmail || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{viewUser.primaryPhone || "Not provided"}</p>
                    </div>
            </div>
            <div>
                    <label className="text-sm text-gray-500">Relationship Status</label>
                    <p className="font-medium">{viewUser.relationshipStatus || "Not provided"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Nationality</label>
                      <p className="font-medium">{viewUser.nationality || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Additional Nationality</label>
                      <p className="font-medium">{viewUser.additionalNationality || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium">{formatDate(viewUser.dateOfBirth)}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <p className="font-medium">{viewUser.gender || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Occupation & Interests</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Occupation</label>
                    <p className="font-medium">{viewUser.occupation || "Not provided"}</p>
            </div>
            <div>
                    <label className="text-sm text-gray-500">Interests</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {viewUser.interests && viewUser.interests.length > 0 ? (
                        viewUser.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No interests specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === "address" && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
            <div>
                      <label className="text-sm text-gray-500">Address Line 1</label>
                      <p className="font-medium">{viewUser.addressLine1 || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Town/City</label>
                      <p className="font-medium">{viewUser.city || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Country</label>
                      <p className="font-medium">{viewUser.country || "Not provided"}</p>
            </div>
            <div>
                      <label className="text-sm text-gray-500">Postcode/Zipcode</label>
                      <p className="font-medium">{viewUser.postcode || "Not provided"}</p>
            </div>
            </div>
            <div>
                    <label className="text-sm text-gray-500">State</label>
                    <p className="font-medium">{viewUser.state || "Not provided"}</p>
            </div>
            </div>
            </div>
            </div>
          </div>
        )}


        {activeTab === "documents" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-2">Profile Photo</label>
                  <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <img
                      src={viewUser.profilePhoto || avatar}
                      alt="Profile"
                      className="w-40 h-40 object-cover rounded-lg mb-2"
                    />
                    <button className="text-sm text-[#0A5438] hover:underline">
                      View Full Size
          </button>
        </div>
              </div>
              <div>
                  <label className="text-sm text-gray-500 block mb-2">ID Card</label>
                  <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <img
                      src={viewUser.idCardPhoto || idcards}
                      alt="ID Card"
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <button className="text-sm text-[#0A5438] hover:underline">
                      View Full Size
                    </button>
              </div>
              </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Registration Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
              <div>
                    <label className="text-sm text-gray-500">Join Fee Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${viewUser.joinFeeStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {viewUser.joinFeeStatus === "Paid" ? "Paid" : "Pending"}
                      </span>
                    </div>
              </div>
              <div>
                    <label className="text-sm text-gray-500">Supporters Status</label>
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#0A5438] h-2.5 rounded-full"
                          style={{ width: '66%' }}
                        ></div>
              </div>
                      <p className="text-sm text-gray-500 mt-1">2 out of 3 supporters</p>
              </div>
            </div>
      </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Registration Date</label>
                    <p className="font-medium">{formatDate(viewUser.createdAt)}</p>
        </div>
                  <div>
                    <label className="text-sm text-gray-500">Registration ID</label>
                    <p className="font-medium">ID#{viewUser._id ? viewUser._id.slice(-8) : "00000000"}</p>
              </div>
                  <div>
                    <label className="text-sm text-gray-500">Current Status</label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Pending Review
                      </span>
            </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleReject}
          className="px-6 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600"
        >
          <FaTimes />
          <span>Reject</span>
        </button>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-[#0A5438] text-white rounded-lg flex items-center space-x-2 hover:bg-[#084433]"
        >
          <FaCheck />
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
};

export default ViewPending;
