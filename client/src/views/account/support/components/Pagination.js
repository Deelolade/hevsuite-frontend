import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronLeft size={20} />
      </button>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={dot}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? "bg-[#540A26]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;