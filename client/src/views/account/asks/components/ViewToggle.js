import React from "react";
import { BsGrid, BsListUl } from "react-icons/bs";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setView("list")}
        className={`p-2 rounded ${view === "list" ? "bg-gray-100" : ""}`}
      >
        <BsListUl size={20} />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-2 rounded ${view === "grid" ? "bg-gray-100" : ""}`}
      >
        <BsGrid size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;