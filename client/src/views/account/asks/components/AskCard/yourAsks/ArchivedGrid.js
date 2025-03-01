import React from "react";

export const renderArchivedGridView = (ask) => (
  <div className="bg-white rounded-lg p-4 shadow-sm text-[#444444]">
    <div className="flex items-start gap-2 mb-3">
      <input type="checkbox" className="w-5 h-5 mt-1" />
      <div>
        <h3 className="font-medium text-lg">{ask.title}</h3>
        <p className="text-sm text-gray-600">{ask.description}</p>
      </div>
    </div>
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-start w-full items-center gap-4">
        <img
          src={ask.image}
          alt={ask.name}
          className="w-16 h-16 rounded-full mb-2"
        />
        <div>
          <h4 className="font-medium">{ask.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{ask.date}</p>
        </div>
      </div>
      <div className="w-full text-center py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
        Delivered
      </div>
    </div>
  </div>
);
