import React from "react";
import { BsCalendar } from "react-icons/bs";
import avatar from "../../../assets/user.avif";

const AccountProfile = () => {
  return (
    <div className="text-black">
      <>
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-8 text-black">
          <img
            src={avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Good luck</h2>
            <p className="text-gray-600 mb-1">VIP Membership/12345678</p>
            <p className="text-gray-500">goodlucks@gmail.com</p>
          </div>
          <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
            Edit
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Form Fields */}
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              value="Good Luck"
              disabled
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none">
              <option>Male</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value="goodlucks@gmail.com"
              disabled
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2">Date of birth</label>
            <div className="relative">
              <input
                type="text"
                value="23 January, 2025"
                disabled
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
              />
              <BsCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              value="+251-988-049229"
              disabled
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block mb-2">Country</label>
            <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none">
              <option>London</option>
            </select>
          </div>
        </div>

        {/* Two Factor Authentication */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">
            Enable/disable Two Factor authentication
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
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
            <div className="flex items-center justify-between">
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
      </>
    </div>
  );
};

export default AccountProfile;
