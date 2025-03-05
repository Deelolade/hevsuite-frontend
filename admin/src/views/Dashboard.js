import React, { useState } from "react";

import {
  BsPeople,
  BsClock,
  BsThreeDotsVertical,
  BsChevronDown,
} from "react-icons/bs";
import { FaUserTimes } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Profile from "../components/Profile";
import { BiSearch } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import Modal from "react-modal";
import avat from "../assets/user.avif";

const Dashboard = () => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [addEventImages, setAddEventImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Andrew Bojangles",
      avatar: avat,
    },
    {
      id: 2,
      name: "Emily Wilson",
      avatar: avat,
    },
    {
      id: 3,
      name: "Michael Davis",
      avatar: avat,
    },
    {
      id: 4,
      name: "Sophia Rodriguez",
      avatar: avat,
    },
    {
      id: 5,
      name: "Oliver Brown",
      avatar: avat,
    },
    {
      id: 6,
      name: "Ava Lee",
      avatar: avat,
    },
    {
      id: 7,
      name: "Ethan Hall",
      avatar: avat,
    },
    {
      id: 8,
      name: "Isabella Martin",
      avatar: avat,
    },
  ]);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:p-6">
      {/* <div className="p-6 space-y-6"> */}
      {/* Header */}
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
      {/* Header with Create Event button */}
      <button
        className="bg-primary font-secondary text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-sm"
        onClick={() => setIsAddEventOpen(true)}
      >
        <span>Create Event</span>
        <IoMdAdd className="text-xl" />
      </button>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={<BsPeople className="text-xl" />}
          label="Total Members"
          value="1349"
          IconWrapper={({ children }) => (
            <div className="bg-[#F0F6FF] text-[#2F6FED] p-3 rounded-lg">
              {children}
            </div>
          )}
        />
        <StatCard
          icon={<BsClock className="text-xl" />}
          label="Pending Registrations"
          value="345"
          IconWrapper={({ children }) => (
            <div className="bg-[#FFF8EC] text-[#FDB022] p-3 rounded-lg">
              {children}
            </div>
          )}
        />
        <StatCard
          icon={<FaUserTimes className="text-xl" />}
          label="Non-Engaged Users"
          value="200"
          IconWrapper={({ children }) => (
            <div className="bg-[#FFF0F0] text-[#F04438] p-3 rounded-lg">
              {children}
            </div>
          )}
        />
        <StatCard
          icon={<IoSparkles className="text-xl" />}
          label="Total Events"
          value="3,500"
          IconWrapper={({ children }) => (
            <div className="bg-[#F0FFF4] text-[#12B76A] p-3 rounded-lg">
              {children}
            </div>
          )}
        />
      </div>
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Analytics</h2>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adip
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border rounded-lg px-3 py-1 text-sm bg-white flex items-center gap-2">
                Users
                <BsChevronDown className="text-red-500 font-bold" />
              </button>
              <select className="border rounded-lg px-3 py-1 text-sm bg-white">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <button className="p-1">
                <BsThreeDotsVertical className="text-gray-400" />
              </button>
            </div>
          </div>
          <div className="h-[200px] bg-white rounded-lg">
            {/* Chart placeholder */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Area Chart Placeholder
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Event Type</h2>
          </div>
          <div className="h-[250px]">
            <div className="mb-6">
              {/* Donut chart placeholder */}
              <div className="w-full h-40 flex items-center justify-center text-gray-400">
                Donut Chart Placeholder
              </div>
            </div>
            <div className="space-y-3">
              <EventTypeRow
                color="#0A5438"
                label="MEMBERS ONLY"
                percentage="81.94%"
              />
              <EventTypeRow
                color="#FFD700"
                label="VIP ONLY"
                percentage="81.94%"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Revenue Section - adjusted height */}
      <div className="bg-white rounded-lg p-6 md:w-full shadow-sm w-80 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Revenue</h2>
        </div>
        <div className="relative h-[200px] pt-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-6 bottom-8 flex flex-col justify-between text-sm text-gray-400">
            <span>400k</span>
            <span>300k</span>
            <span>200k</span>
            <span>100k</span>
            <span>0</span>
          </div>

          {/* Chart area */}
          <div className="ml-12 h-full">
            <div className="flex items-end h-[calc(100%-2rem)] gap-2">
              {[
                { month: "JAN", height: "30%" },
                { month: "FEB", height: "25%" },
                { month: "MAR", height: "20%" },
                { month: "APR", height: "35%" },
                { month: "MAY", height: "40%" },
                { month: "JUN", height: "30%" },
                { month: "JUL", height: "25%" },
                { month: "AUG", height: "15%" },
                { month: "SEP", height: "35%" },
                { month: "OCT", height: "45%" },
                { month: "NOV", height: "50%" },
                { month: "DEC", height: "55%" },
              ].map(({ month, height }) => (
                <div key={month} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-[#540A26] rounded-sm"
                    style={{ height }}
                  ></div>
                  <span className="mt-2 text-xs text-gray-400">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[80vh] overflow-y-auto will-change-transform"

        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Event</h2>
            <button
              onClick={() => setIsAddEventOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block mb-1">Event Name</label>
              <input
                type="text"
                placeholder="Enter event name"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              />
            </div>

            {/* Location and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter event location"
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1">Time</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter event time"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                  <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block mb-1">Event Description</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 resize-none"
              />
            </div>

            {/* Audience Type and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Audience Type</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg text-gray-600  bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Enter who can attend?
                  </option>
                  <option value="VIP Members">VIP Members</option>
                  <option value="Standard Members">Standard Members</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter the price"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ℹ
                  </span>
                </div>
              </div>
            </div>

            {/* No of Tickets */}
            <div>
              <label className="block mb-1">No of Tickets</label>
              <input
                type="text"
                placeholder="Enter the no of tickets"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              />
            </div>

            {/* Attending members */}
            <div>
              <label className="block mb-1">Attending members</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg">
                  Invite Users
                </button>
              </div>
              <div className="mt-2 border rounded-lg h-[120px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 py-2">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Image */}
            <div>
              <label className="block mb-1">Event Image</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setAddEventImages((prev) => [...prev, imageUrl]);
                      }
                    }}
                  />
                </label>
                {addEventImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setAddEventImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddEventOpen(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const StatCard = ({ icon, label, value, IconWrapper }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm mb-2">{label}</p>
        <h3 className="text-xl font-semibold">{value}</h3>
      </div>
      <IconWrapper>{icon}</IconWrapper>
    </div>
  </div>
);
const EventTypeRow = ({ color, label, percentage }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-sm text-green-500">{percentage}</span>
  </div>
);
export default Dashboard;
