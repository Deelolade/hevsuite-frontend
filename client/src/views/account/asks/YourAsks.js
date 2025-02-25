import React, { useState } from "react";
import { BsGrid, BsListUl, BsCheckLg } from "react-icons/bs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Your Asks", "Accepted Asks"];
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            tab === activeTab
              ? "bg-[#540A26] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const AskCard = ({ ask, view, activeTab, filter }) => {
  const renderCurrentListView = () => (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4">
      <input type="checkbox" className="w-5 h-5" />
      <div className="flex-grow">
        <h3 className="font-medium">{ask.title}</h3>
        <p className="text-sm text-gray-600">{ask.description}</p>
      </div>
      <img src={ask.image} alt={ask.name} className="w-12 h-12 rounded-full" />
      <div>
        <h4 className="font-medium">{ask.name}</h4>
        <p className="text-sm text-gray-600">{ask.date}</p>
      </div>
      {activeTab === "Your Asks" ? (
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

  const renderArchivedListView = () => (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4">
      <input type="checkbox" className="w-5 h-5" />
      <div className="flex-grow">
        <h3 className="font-medium">{ask.title}</h3>
        <p className="text-sm text-gray-600">{ask.description}</p>
      </div>
      <img src={ask.image} alt={ask.name} className="w-12 h-12 rounded-full" />
      <div>
        <h4 className="font-medium">{ask.name}</h4>
        <p className="text-sm text-gray-600">{ask.date}</p>
      </div>
      <div className="px-4 py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
        Delivered
      </div>
    </div>
  );

  const renderCurrentGridView = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-2 mb-3">
        <input type="checkbox" className="w-5 h-5 mt-1" />
        <div>
          <h3 className="font-medium text-lg">{ask.title}</h3>
          <p className="text-sm text-gray-600">{ask.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <img src={ask.image} alt={ask.name} className="w-16 h-16 rounded-full mb-2" />
        <h4 className="font-medium">{ask.name}</h4>
        <p className="text-sm text-gray-600 mb-3">{ask.date}</p>
        {activeTab === "Your Asks" ? (
          <button className="w-full bg-red-500 text-white py-2 rounded-lg">
            Abandon
          </button>
        ) : (
          <div className="w-full text-center py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
            Delivered
          </div>
        )}
      </div>
    </div>
  );

  const renderArchivedGridView = () => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-2 mb-3">
        <input type="checkbox" className="w-5 h-5 mt-1" />
        <div>
          <h3 className="font-medium text-lg">{ask.title}</h3>
          <p className="text-sm text-gray-600">{ask.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <img src={ask.image} alt={ask.name} className="w-16 h-16 rounded-full mb-2" />
        <h4 className="font-medium">{ask.name}</h4>
        <p className="text-sm text-gray-600 mb-3">{ask.date}</p>
        <div className="w-full text-center py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
          Delivered
        </div>
      </div>
    </div>
  );

  if (filter === "Current") {
    return view === "grid" ? renderCurrentGridView() : renderCurrentListView();
  } else {
    return view === "grid" ? renderArchivedGridView() : renderArchivedListView();
  }
};

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

const YourAsks = () => {
  const [view, setView] = useState("grid");
  const [activeTab, setActiveTab] = useState("Your Asks");
  const [filter, setFilter] = useState("Current");

  const asks = Array(7).fill({
    title: "Event Volunteer",
    description: "We Need volunteer too.....",
    name: "Anna Ivanovic",
    date: "2nd Dec., 2025",
    image: "/profile-image.jpg",
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex items-center gap-4">
          <button className="p-2 rounded hover:bg-gray-100">
            <BsCheckLg size={20} className="text-gray-600" />
          </button>
          <ViewToggle view={view} setView={setView} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200"
          >
            <option value="Current">Current</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {asks.map((ask, index) => (
            <AskCard
              key={index}
              ask={ask}
              view={view}
              activeTab={activeTab}
              filter={filter}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {asks.map((ask, index) => (
            <AskCard
              key={index}
              ask={ask}
              view={view}
              activeTab={activeTab}
              filter={filter}
            />
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default YourAsks;
