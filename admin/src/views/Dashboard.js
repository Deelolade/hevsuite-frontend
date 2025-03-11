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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Chart from "react-apexcharts";
import { showModal } from "../components/FireModal";

const MySwal = withReactContent(Swal);

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

  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const removeUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };
  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
      colors: ["#900C3F"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        colorStops: [
          { offset: 0, color: "#900C3F", opacity: 0.8 },
          { offset: 100, color: "#900C3F", opacity: 0 },
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ["#900C3F"],
      strokeColors: "#900C3F",
      strokeWidth: 2,
    },
    tooltip: {
      theme: "light",
      marker: {
        fillColors: ["#900C3F"],
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: [300, 400, 350, 500, 490, 600, 700, 800, 900, 850, 750, 650],
    },
  ];

  const optionsDonut = {
    chart: {
      type: "donut",
    },
    colors: ["#FFCC00", "#900C3F"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const seriesDonut = [33, 67];

  const optionsColumn = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "30%",
      },
    },
    dataLabels: {
      enabled: false, // This removes only the numbers on the bars
    },
    colors: ["#900C3F"],
    yaxis: {
      labels: {
        formatter: (value) => `${value}K`,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  const seriesColumn = [
    {
      name: "Earnings",
      data: [80, 120, 150, 200, 180, 220, 300, 250, 270, 350, 370, 400],
    },
  ];

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
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-xl">
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
          <div className="h-[350px] bg-white rounded-lg">
            {/* Chart placeholder */}
            <Chart options={options} series={series} type="area" height={350} />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Event Type</h2>
          </div>
          <div className="h-[350px]">
            <div className="mb-6">
              {/* Donut chart placeholder */}
              <Chart
                options={optionsDonut}
                series={seriesDonut}
                type="donut"
                height={350}
              />
            </div>
            <div className="space-y-3">
              <EventTypeRow
                color="#900C3F"
                label="MEMBERS ONLY"
                percentage="67.94%"
              />
              <EventTypeRow
                color="#FFD700"
                label="VIP ONLY"
                percentage="33.94%"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Revenue Section - adjusted height */}
      <div className="bg-white rounded-lg p-6 md:w-full shadow-2xl w-80 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Revenue</h2>
        </div>
        <div className="relative pt-6">
          {/* Y-axis labels */}
          <Chart
            options={optionsColumn}
            series={seriesColumn}
            type="bar"
            height={350}
          />
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
                  <option value="Public">Public</option>
                  <option value="VIP Members">VIP Members</option>
                  <option value="Standard Members">Standard Members</option>
                  <option value="Invite Only">Invite Only</option>
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
              <div>
                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap p-4 m-2 rounded-lg border-gray-200 border gap-2 mb-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 pr-3 border border-gray-200 bg-white shadow-2xl rounded-full"
                      >
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span>{user.name}</span>
                        <button
                          onClick={() => removeUser(user.id)}
                          className="text-black"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border rounded-lg h-[120px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={` items-center gap-2 p-2 ${
                      selectedUsers.some((u) => u.id === user.id)
                        ? "hidden"
                        : "flex"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mx-2"
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      onChange={() => handleCheckboxChange(user)}
                    />
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-4">{user.name}</span>
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
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => {
                  setIsAddEventOpen(false);
                  showModal({
                    title: "Success!",
                    message: "Created Event Successfully!",
                    confirmText: "Ok",
                    onConfirm: () => console.log("Confirmed!"),
                  });
                }}
              >
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
  <div className="bg-white p-4 rounded-lg shadow-xl">
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
