import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

import Profile from "../../components/Profile";
import ViewPending from "./ViewPending";
import DefaultPending from "./DefaultPending";
import user from "../../assets/user.avif";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";

const Pending = () => {
  const [showViewPending, setShowViewPending] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const pendingUsers = [
    {
      id: 1,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 2,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 3,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 4,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 5,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 6,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
    {
      id: 7,
      name: "Andrew Bojangles",
      registrationId: "ID#23455666",
      email: "andrewbojangles@gmail.com",
      supportersStatus: "2/3",
      joinFeeStatus: "Pending",
      avatar: user,
      idCard: idcards,
      photo: avatar,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>
      {showViewPending ? (
        <ViewPending
          setShowViewPending={setShowViewPending}
          viewUser={viewUser}
        />
      ) : (
        <DefaultPending
          pendingUsers={pendingUsers}
          setShowViewPending={setShowViewPending}
          setViewUser={setViewUser}
        />
      )}
    </div>
  );
};

export default Pending;
