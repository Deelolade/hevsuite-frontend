// import React from "react";
// import { BsPeople, BsClock, BsCalendarEvent } from "react-icons/bs";
// import { FaUserTimes } from "react-icons/fa";

// const Dashboard = () => {
//   return (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-4 gap-6">
//         <StatCard
//           icon={<BsPeople />}
//           label="Total Members"
//           value="1349"
//           iconBg="bg-blue-100"
//           iconColor="text-blue-600"
//         />
//         <StatCard
//           icon={<BsClock />}
//           label="Pending Registrations"
//           value="345"
//           iconBg="bg-yellow-100"
//           iconColor="text-yellow-600"
//         />
//         <StatCard
//           icon={<FaUserTimes />}
//           label="Non-Engaged Users"
//           value="200"
//           iconBg="bg-red-100"
//           iconColor="text-red-600"
//         />
//         <StatCard
//           icon={<BsCalendarEvent />}
//           label="Total Events"
//           value="3,500"
//           iconBg="bg-green-100"
//           iconColor="text-green-600"
//         />
//       </div>
//       {/* Analytics Section */}
//       <div className="grid grid-cols-3 gap-6">
//         <div className="col-span-2 bg-white p-6 rounded-lg border">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h2 className="text-xl font-semibold">Analytics</h2>
//               <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet</p>
//             </div>
//             <div className="flex gap-2">
//               <select className="border rounded px-3 py-1">
//                 <option>Users</option>
//               </select>
//               <select className="border rounded px-3 py-1">
//                 <option>2025</option>
//               </select>
//             </div>
//           </div>
//           <div className="h-64 bg-gray-100 rounded">
//             {/* Placeholder for chart */}
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               Chart Placeholder
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-6 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-4">Event Type</h2>
//           <div className="h-64 bg-gray-100 rounded">
//             {/* Placeholder for pie chart */}
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               Pie Chart Placeholder
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const StatCard = ({ icon, label, value, iconBg, iconColor }) => (
//   <div className="bg-white p-6 rounded-lg border">
//     <div className="flex items-start justify-between">
//       <div>
//         <p className="text-gray-600 text-sm">{label}</p>
//         <h3 className="text-2xl font-semibold mt-1">{value}</h3>
//       </div>
//       <div className={`p-3 rounded-lg ${iconBg}`}>
//         <span className={`text-xl ${iconColor}`}>{icon}</span>
//       </div>
//     </div>
//   </div>
// );
// import React from "react";
import { BsPeople, BsClock, BsThreeDotsVertical } from "react-icons/bs";
import { FaUserTimes } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      {/* Header with Create Event button */}
      <button className="bg-[#900C3F] text-white px-4 py-2.5 rounded-md flex items-center gap-2 text-sm">
        <span>Create Event</span>
        <IoMdAdd className="text-xl" />
      </button>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
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
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Analytics</h2>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adip
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select className="border rounded-lg px-3 py-1 text-sm bg-white">
                <option>Users</option>
              </select>
              <select className="border rounded-lg px-3 py-1 text-sm bg-white">
                <option>2025</option>
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
                color="#540A26"
                label="PUBLIC"
                percentage="81.94%"
              />
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
      <div className="bg-white rounded-lg p-6 shadow-sm">
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
