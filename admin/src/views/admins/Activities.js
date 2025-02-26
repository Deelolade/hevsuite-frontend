import React from "react";

const Activities = () => {
  const activities = [
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Added a new Admin",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Added a new Event",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Shakur Joe",
      action: "Editted a news",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Editted a news",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Post Cards",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Editted a news",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Post Cards",
    },
    {
      timestamp: "July 1, 2024 - 10:30AM",
      admin: "Moshood Adam",
      action: "Editted a news",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">All Activities</h2>
        <button className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
          Export ↑
        </button>
      </div>

      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium">Timestamp</th>
              <th className="text-left py-4 px-6 font-medium">Admin</th>
              <th className="text-left py-4 px-6 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6 text-gray-600">
                  {activity.timestamp}
                </td>
                <td className="py-4 px-6">{activity.admin}</td>
                <td className="py-4 px-6 italic">{activity.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
