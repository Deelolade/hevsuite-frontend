import React from "react";
import { BsGrid, BsListUl } from "react-icons/bs";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setView("list")}
        className={`p-2 text-black rounded ${
          view === "list" ? "bg-gray-300" : ""
        }`}
      >
        <BsListUl size={20} />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-2 text-black rounded ${
          view === "grid" ? "bg-gray-300" : ""
        }`}
      >
        <BsGrid size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;