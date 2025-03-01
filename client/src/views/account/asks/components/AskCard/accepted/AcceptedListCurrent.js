import React from "react";

const AcceptedListCurrent = (ask, activeTab) => (
  <div className="flex justify-between items-center gap-4 bg-white rounded-lg p-4 text-[#444444]">
    <div className="flex gap-8 items-center">
      <input type="checkbox" className="w-5 h-5" />
      <div className="">
        <h3 className="font-medium">{ask.title}</h3>
        <p className="text-sm text-gray-600">{ask.description}</p>
      </div>
    </div>
    <div className="flex justify-between gap-4">
      <img src={ask.image} alt={ask.name} className="w-12 h-12 rounded-full" />
      <div>
        <h4 className="font-medium font-primary ">{ask.name}</h4>
        <p className="text-sm text-gray-600">{ask.date}</p>
      </div>
    </div>
    {activeTab === "Accepted Asks" ? (
      <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
        Abandon
      </button>
    ) : (
      <div className="flex gap-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Delete
        </button>
        <div className="px-4 py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
          Delivered
        </div>
      </div>
    )}
  </div>
);

export default AcceptedListCurrent;
