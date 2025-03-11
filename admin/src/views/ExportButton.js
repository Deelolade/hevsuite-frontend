"use client";
import { useState, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { BiChevronDown } from "react-icons/bi";
import { exportData } from "./Exporter";

const ExportButton = ({ data, fileName = "export" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleExport = (format) => {
    exportData(data, format, fileName);
    setIsOpen(false);
  };

  return (
    <div className="relative flex" ref={menuRef}>
      <button
        className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiDownload />
        Export
        <BiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2">
          {[
            { format: "pdf", color: "text-red-500", label: "Export as PDF" },
            { format: "csv", color: "text-green-500", label: "Export as CSV" },
            {
              format: "excel",
              color: "text-blue-500",
              label: "Export as Excel",
            },
          ].map(({ format, color, label }) => (
            <button
              key={format}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => handleExport(format)}
            >
              <span className={color}>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                </svg>
              </span>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
