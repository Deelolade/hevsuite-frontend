import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const ViewUser = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("events");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600"
        >
          <BsArrowLeft />
          <span>ID#23455666</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img 
            src="https://via.placeholder.com/60" 
            alt="Andrew Bojangles" 
            className="w-15 h-15 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">Andrew Bojangles</h2>
            <p className="text-gray-500">andrewbojangles@gmail.com</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
          Save
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-sm text-gray-600">Restrict User</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-sm text-gray-600">Ban User</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-sm text-gray-600">Reset Password</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-sm text-gray-600">Request New Verification</span>
        </label>
      </div>

      {/* Tabs Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Events Attended */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Events Attended</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">No</th>
                <th className="pb-4">Event Name</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((num) => (
                <tr key={num}>
                  <td className="py-2">{num}</td>
                  <td className="py-2">The Bout Lions</td>
                  <td className="py-2">
                    <button className="text-[#540A26] text-sm">View more</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            {/* ... pagination buttons ... */}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex justify-between items-center">
                <span className="text-sm">Recently logged in Jan21, 2025</span>
                <button className="text-gray-400">...</button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            {/* ... pagination buttons ... */}
          </div>
        </div>

        {/* User Documents */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">User Documents</h3>
          <div className="space-y-4">
            <div className="relative">
              <img 
                src="https://via.placeholder.com/300x200" 
                alt="ID Card" 
                className="w-full rounded-lg"
              />
              <button className="absolute top-2 right-2 px-3 py-1 bg-black/50 text-white rounded text-sm">
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500">ID Card</p>
            </div>
            <div className="relative">
              <img 
                src="https://via.placeholder.com/300x200" 
                alt="Photo" 
                className="w-full rounded-lg"
              />
              <button className="absolute top-2 right-2 px-3 py-1 bg-black/50 text-white rounded text-sm">
                Preview
              </button>
              <p className="mt-2 text-sm text-gray-500">Photo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;