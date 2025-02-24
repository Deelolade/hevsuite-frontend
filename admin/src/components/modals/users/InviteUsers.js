import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const InviteUsers = ({ setIsInviteModalOpen, setInviteEmail, inviteEmail }) => {
  return (
    <div>
      <div className="p-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Invite New Users
        </h2>
        <div className="relative">
          <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="email"
            placeholder="Enter Email Address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#540A26] text-sm"
          />
        </div>
        <button
          onClick={() => {
            // Handle invite logic here
            setIsInviteModalOpen(false);
            setInviteEmail("");
          }}
          className="w-full bg-[#540A26] text-white py-3 rounded-2xl mt-6 text-sm font-medium hover:bg-[#540A26]/90 transition-colors"
        >
          Invite
        </button>
      </div>
    </div>
  );
};

export default InviteUsers;
