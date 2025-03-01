// ... imports remain the same ...
import { useState } from "react";
import AskCard from "./components/AskCard";
import NavigationTabs from "./components/NavigationTabs";
import Pagination from "./components/Pagination";
import avatar from "../../../assets/user.avif";
import { BsCheckLg } from "react-icons/bs";
import ViewToggle from "./components/ViewToggle";

const YourAsks = () => {
  const [view, setView] = useState("list");
  const [activeTab, setActiveTab] = useState("Your Asks");
  const [filter, setFilter] = useState("Current");

  const asks = Array(7).fill({
    title: "Event Volunteer",
    description: "We Need volunteer too.....",
    name: "Anna Ivanovic",
    date: "2nd Dec., 2025",
    image: avatar,
  });

  const acceptedAsks = Array(7).fill({
    title: "Event Volunteer",
    description: "We Need volunteer too...",
    name: "Anna Ivanovic",
    date: "2nd Dec., 2025",
    image: avatar,
  });

  const renderContent = () => {
    if (activeTab === "Your Asks") {
      if (filter === "Current") {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
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
        );
      } else {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
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
        );
      }
    } else {
      if (filter === "Current") {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            {asks.map((acceptedAsks, index) => (
              <AskCard
                key={index}
                ask={acceptedAsks}
                view={view}
                activeTab={activeTab}
                filter={filter}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
          >
            {asks.map((acceptedAsks, index) => (
              <AskCard
                key={index}
                ask={acceptedAsks}
                view={view}
                activeTab={activeTab}
                filter={filter}
              />
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 text-[#444444]">
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

      {renderContent()}
      <Pagination />
    </div>
  );
};

export default YourAsks;
