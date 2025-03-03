import React from "react";

const EmailNotificationSection = () => {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl">Email Notification</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
        </label>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {["News", "New Events", "Activities", "Promotions"].map((item) => (
          <div key={item} className="flex items-center gap-2 sm:gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300"
            />
            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailNotificationSection;
