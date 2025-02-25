import React from "react";
import { BsArrowLeft } from "react-icons/bs";

const ViewPending = ({ setShowViewPending, viewUser}) => {
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
      <div className="flex justify-between">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={viewUser?.avatar}
            alt="Andrew Bojangles"
            className="w-14 h-14 rounded-full"
            onClick={()=>console.log(viewUser)}
          />
          <div>
            <h2 className="text-xl font-semibold">{viewUser?.name}</h2>
            <p className="text-gray-500">{viewUser?.email}</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <h3 className="text-gray-600 mb-4">Documents</h3>
          <div className="flex gap-6">
            <div className="relative">
              <img
                src="https://via.placeholder.com/200x150"
                alt="ID Card"
                className="rounded-lg"
              />
              <button className="absolute top-2 right-2 px-3 py-1 bg-black/50 text-white rounded-md text-sm">
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500 text-center">ID Card</p>
            </div>
            <div className="relative">
              <img
                src="https://via.placeholder.com/200x150"
                alt="Photo"
                className="rounded-lg"
              />
              <button className="absolute top-2 right-2 px-3 py-1 bg-black/50 text-white rounded-md text-sm">
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500 text-center">Photo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Personal Information</h3>
          <button>
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
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Title*</label>
            <input
              type="text"
              value="Mrs"
              // value={viewUser?.title}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Forename*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.forename}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Surname*</label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.surname}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Gender*</label>
            <input
              type="text"
              value="Female"
              // value={viewUser?.gender}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Date of birth*
            </label>
            <input
              type="text"
              value="23 Jan, 2025"
              // value={viewUser?.dob}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Relationship Status*
            </label>
            <input
              type="text"
              value="Married"
              // value={viewUser?.relationship_status}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Nationality*
            </label>
            <input
              type="text"
              value="Ethiopian"
              // value={viewUser?.nationality}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Additional Nationality*
            </label>
            <input
              type="text"
              value="British"
              // value={viewUser?.additional_nationality}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Contact Details</h3>
          <button>
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
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Address Line1*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.address_line1}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Town/City*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.town_city}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Country*</label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.country}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Postcode/Zipcode*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.postcode_zipcode}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Primary Email*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.primary_email}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Secondary Email*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.secondary_email}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Primary Phone*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.primary_phone}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Secondary Phone*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.secondary_phone}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">State*</label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.state}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Occupation & Interest */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Occupation & Interest</h3>
          <button>
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
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Employment Status*
            </label>
            <input
              type="text"
              value="Employed"
              // value={viewUser?.employment_status}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              member of a club?*
            </label>
            <input
              type="text"
              value="No"
              // value={viewUser?.member_of_a_club}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Prefered Social Media*
            </label>
            <input
              type="text"
              value="LinkedIn"
              // value={viewUser?.preferred_social_media}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Secondary Phone*
            </label>
            <input
              type="text"
              value="Andrew"
              // value={viewUser?.secondary_phone}
              disabled
              className="w-full p-2.5 border rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <h4 className="text-lg font-medium mb-4">User Interests</h4>
        <div className="grid grid-cols-3 gap-4">
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
      </div>

      {/* Referrals */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Referrals (2/3)</h3>
          <button>
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
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2.5 bg-[#00B707] text-white rounded-lg flex items-center gap-2">
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
        <button className="px-6 py-2.5 bg-red-500 text-white rounded-lg flex items-center gap-2">
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
    </div>
  );
};

export default ViewPending;
