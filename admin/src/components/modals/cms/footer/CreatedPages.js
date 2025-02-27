import React from "react";

const CreatedPages = ({ setIsCreatedPagesOpen }) => {
  // Sample created pages - replace with your actual data
  const createdPages = [
    { id: 1, title: "About Us", createdAt: "2024-01-15" },
    { id: 2, title: "Contact", createdAt: "2024-01-16" },
    { id: 3, title: "Services", createdAt: "2024-01-17" },
    { id: 4, title: "Products", createdAt: "2024-01-18" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Created Pages</h2>
        <button
          onClick={() => setIsCreatedPagesOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {createdPages.map((page) => (
          <div
            key={page.id}
            className="p-4 border rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium">{page.title}</h3>
              <p className="text-sm text-gray-500">
                Created on: {page.createdAt}
              </p>
            </div>
            {/* <button className="text-primary text-sm">View Page</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedPages;
