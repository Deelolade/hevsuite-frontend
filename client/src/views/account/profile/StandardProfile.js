import React, { useState } from "react";
import {
  BsCalendar,
  BsPencil,
  BsChevronUp,
  BsChevronDown,
  BsChatDots,
} from "react-icons/bs";
import avatar from "../../../assets/user.avif";
import SupportRequestsView from "./SupportRequestsView";

const StandardProfile = () => {
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    contactDetails: true,
    occupation: true,
    referrals: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRequestView, setShowRequestView] = useState(false);

  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    title: "Mrs",
    forename: "Andrew",
    surname: "Andrew",
    gender: "Female",
    dob: "23 Jan, 2025",
    relationshipStatus: "Married",
    nationality: "Ethiopian",
    additionalNationality: "British",
  });

  // Contact details state
  const [contactDetails, setContactDetails] = useState({
    addressLine1: "Andrew",
    townCity: "Andrew",
    country: "Andrew",
    postcodeZipcode: "Andrew",
    primaryEmail: "Andrew",
    secondaryEmail: "Andrew",
    primaryPhone: "Andrew",
    secondaryPhone: "Andrew",
    state: "Andrew",
  });

  // Occupation state
  const [occupationInfo, setOccupationInfo] = useState({
    employmentStatus: "Employed",
    memberOfClub: "No",
    preferredSocialMedia: "LinkedIn",
    secondaryPhone: "Andrew",
  });

  const [cardRequest, setCardRequest] = useState({
    fullName: "Good Luck",
    cardType: "Standard",
    disableCurrent: "No",
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleContactDetailsChange = (field, value) => {
    setContactDetails({
      ...contactDetails,
      [field]: value,
    });
  };

  const handleOccupationInfoChange = (field, value) => {
    setOccupationInfo({
      ...occupationInfo,
      [field]: value,
    });
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving profile data:", {
      personalInfo,
      contactDetails,
      occupationInfo,
    });

    // Show success message or handle errors
    alert("Profile updated successfully!");

    // Exit edit mode
    setIsEditing(false);
  };

  const interests = [
    "Art & Design",
    "Cigars",
    "Country Pursuits",
    "Dance",
    "Family Entertainment",
    "Fashion",
    "Film",
    "Food",
    "Literature",
    "Music/Dj",
    "Politics",
    "Sport",
  ];

  return (
    <div className="text-black">
      {/* Profile Header */}
      {showRequestView ? (
        <SupportRequestsView onBack={() => setShowRequestView(false)} />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Good luck</h2>
              <p className="text-gray-600 mb-1">Standard Member/12345678</p>
              <p className="text-gray-500">goodlucks@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-100 text-[#540A26] rounded-full">
                <BsChatDots size={18} />
              </button>
              <button onClick={() => setShowRequestView(true)}>Request</button>
              <button
                className={`px-4 sm:px-6 py-1.5 sm:py-2 ${
                  isEditing ? "bg-green-600" : "bg-[#540A26]"
                } text-white rounded-lg`}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("personalInfo")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Personal Information
              </h3>
              {openSections.personalInfo ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.personalInfo && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Title*</label>
                  <input
                    type="text"
                    value={personalInfo.title}
                    onChange={(e) =>
                      handlePersonalInfoChange("title", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Forename*</label>
                  <input
                    type="text"
                    value={personalInfo.forename}
                    onChange={(e) =>
                      handlePersonalInfoChange("forename", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Surname*</label>
                  <input
                    type="text"
                    value={personalInfo.surname}
                    onChange={(e) =>
                      handlePersonalInfoChange("surname", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Gender*</label>
                  <input
                    type="text"
                    value={personalInfo.gender}
                    onChange={(e) =>
                      handlePersonalInfoChange("gender", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Date of birth*</label>
                  <input
                    type="text"
                    value={personalInfo.dob}
                    onChange={(e) =>
                      handlePersonalInfoChange("dob", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Relationship Status*
                  </label>
                  <input
                    type="text"
                    value={personalInfo.relationshipStatus}
                    onChange={(e) =>
                      handlePersonalInfoChange(
                        "relationshipStatus",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Nationality*</label>
                  <input
                    type="text"
                    value={personalInfo.nationality}
                    onChange={(e) =>
                      handlePersonalInfoChange("nationality", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Additional Nationality*
                  </label>
                  <input
                    type="text"
                    value={personalInfo.additionalNationality}
                    onChange={(e) =>
                      handlePersonalInfoChange(
                        "additionalNationality",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("contactDetails")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Contact Details
              </h3>
              {openSections.contactDetails ? (
                <BsChevronUp />
              ) : (
                <BsChevronDown />
              )}
            </div>

            {openSections.contactDetails && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Address Line1*</label>
                  <input
                    type="text"
                    value={contactDetails.addressLine1}
                    onChange={(e) =>
                      handleContactDetailsChange("addressLine1", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Town/City*</label>
                  <input
                    type="text"
                    value={contactDetails.townCity}
                    onChange={(e) =>
                      handleContactDetailsChange("townCity", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Country*</label>
                  <input
                    type="text"
                    value={contactDetails.country}
                    onChange={(e) =>
                      handleContactDetailsChange("country", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Postcode/Zipcode*
                  </label>
                  <input
                    type="text"
                    value={contactDetails.postcodeZipcode}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "postcodeZipcode",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Primary Email*</label>
                  <input
                    type="email"
                    value={contactDetails.primaryEmail}
                    onChange={(e) =>
                      handleContactDetailsChange("primaryEmail", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Secondary Email*</label>
                  <input
                    type="email"
                    value={contactDetails.secondaryEmail}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "secondaryEmail",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">PrimaryPhone*</label>
                  <input
                    type="text"
                    value={contactDetails.primaryPhone}
                    onChange={(e) =>
                      handleContactDetailsChange("primaryPhone", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Secondary Phone*</label>
                  <input
                    type="text"
                    value={contactDetails.secondaryPhone}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "secondaryPhone",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">State*</label>
                  <input
                    type="text"
                    value={contactDetails.state}
                    onChange={(e) =>
                      handleContactDetailsChange("state", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Occupation & Interest */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("occupation")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Occupation & Interest
              </h3>
              {openSections.occupation ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.occupation && (
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1 text-sm">
                      Employment Status*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.employmentStatus}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "employmentStatus",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      member of a club?*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.memberOfClub}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "memberOfClub",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Prefered Social Media*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.preferredSocialMedia}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "preferredSocialMedia",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Secondary Phone*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.secondaryPhone}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "secondaryPhone",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                </div>

                <h4 className="font-medium mb-3">Your Interests</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                  {interests.map((interest, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm">{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Your Referrals */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("referrals")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Your Referrals{" "}
                <span className="text-sm font-normal">
                  (who approved your registration)
                </span>
              </h3>
              {openSections.referrals ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.referrals && (
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={avatar}
                        alt="Referral"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>Andrew Bojangles</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Approved on Jan 22, 2023
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Two Factor Authentication */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">
              Enable/disable Two Factor authentication
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked
                    className="w-4 h-4 accent-[#540A26]"
                    readOnly
                  />
                  <span>goodlucks@gmail.com</span>
                </div>
                <span className="text-gray-500 text-sm">1 month ago</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#540A26]"
                    readOnly
                  />
                  <span>+251988049229</span>
                </div>
                <span className="text-gray-500 text-sm">1 month ago</span>
              </div>
            </div>
          </div>

          {/* Request a New Club Card */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Request a New Club Card</h3>
            <div className="border border-gray-400 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block mb-2">Full name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardRequest.fullName}
                      className="w-full px-4 py-3 bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200"
                      readOnly
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <BsPencil className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="md:col-span-1 md:row-span-3 md:justify-self-end md:mt-0">
                  <div className="p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Payment Summary:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Club Card Fee:</span>
                        <span className="font-medium">$10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Fee:</span>
                        <span className="font-medium">$5</span>
                      </div>
                      <div className="border-t border-gray-300 my-2 pt-2 flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">$15</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block mb-2">Card Type</label>
                  <div className="relative">
                    <select
                      className="w-full px-4 py-3 bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200 appearance-none"
                      value={cardRequest.cardType}
                      onChange={(e) =>
                        setCardRequest({
                          ...cardRequest,
                          cardType: e.target.value,
                        })
                      }
                    >
                      <option>Standard</option>
                      <option>VIP</option>
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

                <div className="md:col-span-2">
                  <label className="block mb-2">Disable Current Card</label>
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="relative flex-1 ">
                      <select
                        className="w-full px-4 py-3  bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200 appearance-none"
                        value={cardRequest.disableCurrent}
                        onChange={(e) =>
                          setCardRequest({
                            ...cardRequest,
                            disableCurrent: e.target.value,
                          })
                        }
                      >
                        <option>No</option>
                        <option>Yes</option>
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
                    <div className="md:col-span-2 mt-6 flex-1">
                      <div className="flex justify-end gap-3">
                        <button className="px-6 py-1 border border-gradient_r text-[#444444] rounded-lg">
                          Cancel
                        </button>
                        <button className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg">
                          Request New Club Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showRequestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <button className="flex items-center gap-2 text-gray-700">
                    <span>←</span> Back
                  </button>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-2 mb-4">
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      All Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[#540A26] text-white">
                      Approved Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      Pending Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      Declined Requests
                    </button>
                  </div>

                  <div className="flex justify-end mb-4">
                    <button className="px-4 py-2 bg-[#540A26] text-white rounded-lg">
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-4">1</td>
                        <td>Evidence Review</td>
                        <td>Jan 16, 2025</td>
                        <td className="text-green-500">Approved</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-4">1</td>
                        <td>Evidence Review</td>
                        <td>Jan 16, 2025</td>
                        <td className="text-green-500">Approved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StandardProfile;
