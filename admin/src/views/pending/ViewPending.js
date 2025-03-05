import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import Modal from "react-modal";

const ViewPending = ({ setShowViewPending, viewUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showContactDetails, setShowContactDetails] = useState(true);
  const [showOccupation, setShowOccupation] = useState(true);
  const [showReferrals, setShowReferrals] = useState(true);

  const handleAcceptUser = (user) => {
    console.log(`User accepted:`, user);
  };

  const handleRejectUser = (user) => {
    console.log(`User rejected:`, user);
  };

  const handleAction = (type) => {
    setActionType(type);
    setIsActionModalOpen(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setShowViewPending(false)}
          className="flex items-center gap-2 text-gray-600"
        >
          <BsArrowLeft />
          <span>{viewUser?.registrationId}</span>
        </button>
      </div>

      {/* User Profile Header */}
      <div className="md:flex justify-between">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={viewUser?.avatar}
            alt="Andrew Bojangles"
            className="w-[90px] h-[90px] rounded-full"
            onClick={() => console.log(viewUser)}
          />
          <div>
            <h2 className="text-2xl font-primary font-semibold">
              {viewUser?.name}
            </h2>
            <p className="text-gray-500 font-primary">{viewUser?.email}</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <h3 className="text-gray-600 text-[16px]  mb-4 font-secondary font-semibold">
            Documents
          </h3>
          <div className="flex gap-6">
            <div className="relative">
              <img
                src={viewUser?.idCard}
                alt="ID Card"
                className="w-full h-[100px] object-cover rounded-lg brightness-50 contrast-50"
              />
              <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-black/50 border-2 border-white rounded-3xl text-white font-secondary text-sm hover:bg-black/60"
                onClick={() => {
                  setShowModal(true);
                  setSelectedImage(viewUser?.idCard);
                }}
              >
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500  font-primary">
                ID Card
              </p>
            </div>
            <div className="relative">
              <img
                src={viewUser?.photo}
                alt="Photo"
                className="w-full h-[100px] object-cover rounded-lg brightness-50 contrast-50"
              />
              <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-black/50 border-2 border-white rounded-3xl text-white font-secondary text-sm hover:bg-black/60"
                onClick={() => {
                  setShowModal(true);
                  setSelectedImage(viewUser?.photo);
                }}
              >
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500  font-primary">Photo</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[80%] max-h-[80%] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Personal Information */}
      <div className="bg-white rounded-lg md:p-6 mb-6 font-primary">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold font-primary text-[#323C47]">
            Personal Information
          </h3>
          <button onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {showPersonalInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-1 font-primary">
                Title<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Mrs"
                // value={viewUser?.title}
                disabled
                className="w-full p-2.5 border rounded-lg text-[#444444] bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                Forename<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.forename}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Surname<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.surname}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Gender<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Female"
                // value={viewUser?.gender}
                disabled
                className="w-full p-2.5 text-[#444444] border rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Date of birth
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="23 Jan, 2025"
                // value={viewUser?.dob}
                disabled
                className="w-full p-2.5 text-[#444444] border rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Relationship Status
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Married"
                // value={viewUser?.relationship_status}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Nationality<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Ethiopian"
                // value={viewUser?.nationality}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Additional Nationality
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="British"
                // value={viewUser?.additional_nationality}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg md:p-6 mb-6 font-primary">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#323C47]">
            Contact Details
          </h3>
          <button onClick={() => setShowContactDetails(!showContactDetails)}>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {showContactDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm  mb-1">
                Address Line1
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.address_line1}
                disabled
                className="w-full p-2.5 border rounded-lg text-[#444444] bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Town/City<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.town_city}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Country<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.country}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Postcode/Zipcode
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.postcode_zipcode}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Primary Email
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.primary_email}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Secondary Email
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.secondary_email}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Primary Phone
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.primary_phone}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                Secondary Phone
                <span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.secondary_phone}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">
                State<span className="text-red-600 font-primary">*</span>
              </label>
              <input
                type="text"
                value="Andrew"
                // value={viewUser?.state}
                disabled
                className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Occupation & Interest */}
      <div className="bg-white rounded-lg md:p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#323C47]">
            Occupation & Interest
          </h3>
          <button onClick={() => setShowOccupation(!showOccupation)}>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {showOccupation && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm  mb-1">
                  Employment Status
                  <span className="text-red-600 font-primary">*</span>
                </label>
                <input
                  type="text"
                  value="Employed"
                  // value={viewUser?.employment_status}
                  disabled
                  className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm  mb-1">
                  member of a club?
                  <span className="text-red-600 font-primary">*</span>
                </label>
                <input
                  type="text"
                  value="No"
                  // value={viewUser?.member_of_a_club}
                  disabled
                  className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm  mb-1">
                  Prefered Social Media
                  <span className="text-red-600 font-primary">*</span>
                </label>
                <input
                  type="text"
                  value="LinkedIn"
                  // value={viewUser?.preferred_social_media}
                  disabled
                  className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm  mb-1">
                  Secondary Phone
                  <span className="text-red-600 font-primary">*</span>
                </label>
                <input
                  type="text"
                  value="Andrew"
                  // value={viewUser?.secondary_phone}
                  disabled
                  className="w-full p-2.5 border text-[#444444] rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <h4 className="text-xl font-semibold text-[#323C47] mb-4">
              User Interests
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p>Art & Design</p>
                <p>Dance</p>
                <p>Film</p>
                <p>Music/Dj</p>
              </div>
              <div>
                <p>Cigars</p>
                <p>Family Entertainment</p>
                <p>Food</p>
                <p>Politics</p>
              </div>
              <div>
                <p>Country Pursuits</p>
                <p>Fashion</p>
                <p>Literature</p>
                <p>Sport</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Referrals */}
      <div className="bg-white rounded-lg md:p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#323C47]">
            Referrals (2/3)
          </h3>
          <button onClick={() => setShowReferrals(!showReferrals)}>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {showReferrals && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewUser?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <span>{viewUser?.name}</span>
              </div>
              <span className="text-green-500">Approved</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewUser?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <span>{viewUser?.name}</span>
              </div>
              <span className="text-gray-500">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={viewUser?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <span>{viewUser?.name}</span>
              </div>
              <span className="text-gray-500">Pending</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end overflow-hidden md:gap-4">
        <button
          className="px-6 py-2.5 bg-[#079D64] text-white rounded-lg flex items-center gap-2 font-primary"
          onClick={() => handleAction("accept")}
        >
          Accept
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button
          className="px-6 py-2.5 bg-[#FF0707] text-white rounded-lg flex items-center gap-2 font-primary"
          onClick={() => handleAction("reject")}
        >
          Decline
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <Modal
        isOpen={isActionModalOpen}
        onRequestClose={() => setIsActionModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[93vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {actionType === "accept" ? "Accept User" : "Reject User"}
            </h2>
            <button
              onClick={() => setIsActionModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={viewUser?.avatar}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{viewUser?.name}</h3>
                <p className="text-sm text-gray-500">{viewUser?.email}</p>
              </div>
            </div>
            <p className="text-gray-600">
              Are you sure you want to{" "}
              {actionType === "accept" ? "accept" : "reject"} this user?
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsActionModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (actionType === "accept") {
                  handleAcceptUser(viewUser);
                } else {
                  handleRejectUser(viewUser);
                }
                setIsActionModalOpen(false);
              }}
              className={`px-4 py-2 rounded-lg text-white ${
                actionType === "accept"
                  ? "bg-[#079D64] hover:bg-[#068756]"
                  : "bg-[#FF0707] hover:bg-[#E60606]"
              }`}
            >
              {actionType === "accept" ? "Accept" : "Reject"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewPending;
