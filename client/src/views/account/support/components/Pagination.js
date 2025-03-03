import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <BsChevronLeft size={16} className="sm:w-5 sm:h-5" />
      </button>
      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              page === currentPage ? "bg-[#540A26]" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default Pagination;
