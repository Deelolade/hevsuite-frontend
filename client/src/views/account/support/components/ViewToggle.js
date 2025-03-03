import React from "react";
import { BsGrid, BsListUl } from "react-icons/bs";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={() => setView("list")}
        className={`p-1.5 sm:p-2 text-black rounded transition-colors ${
          view === "list" ? "bg-gray-300" : "hover:bg-gray-100"
        }`}
      >
        <BsListUl size={16} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-1.5 sm:p-2 text-black rounded transition-colors ${
          view === "grid" ? "bg-gray-300" : "hover:bg-gray-100"
        }`}
      >
        <BsGrid size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default ViewToggle;
