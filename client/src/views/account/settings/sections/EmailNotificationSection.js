import React from "react";

const EmailNotificationSection = () => {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl">Email Notification</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
        </label>
      </div>

      <div className="space-y-6">
        {["News", "New Events", "Activities", "Promotions"].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailNotificationSection;
