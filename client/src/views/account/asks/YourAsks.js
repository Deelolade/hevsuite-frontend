import { useEffect, useState } from "react";
import AskCard from "./components/AskCard";
import NavigationTabs from "./components/NavigationTabs";
import Pagination from "./components/Pagination";
import avatar from "../../../assets/user.avif";
import { BsCheckLg } from "react-icons/bs";
import ViewToggle from "./components/ViewToggle";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcceptedAsks, fetchCurrentUserAsks } from "../../../features/askSlice";

const YourAsks = () => {
  const [view, setView] = useState("list");
  const [activeTab, setActiveTab] = useState("Your Asks");
  const [filter, setFilter] = useState("Current");

  const dispatch = useDispatch();
  const { acceptedAsks, currentAsks } = useSelector((state) => state.ask);

    // Fetch data when component mounts 
    useEffect(() => {
      if (activeTab === "Your Asks") {
        dispatch(fetchCurrentUserAsks());
      } else {
        dispatch(fetchAcceptedAsks());
      }
    }, [dispatch,activeTab]);

  // const asks = [
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //     delivered: true,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  //   {
  //     title: "Event Volunteer",
  //     description: "We Need volunteer too.....",
  //     name: "Anna Ivanovic",
  //     date: "2nd Dec., 2025",
  //     image: avatar,
  //   },
  // ];

  
  // const acceptedAsks = Array(7).fill({
  //   title: "Event Volunteer",
  //   description: "We Need volunteer too...",
  //   name: "Anna Ivanovic",
  //   date: "2nd Dec., 2025",
  //   image: avatar,
  // });
  const getFilteredAsks = () => {

    const currentDate = new Date();
    if (activeTab === "Your Asks") {
      // For "Your Asks" tab
      const asksToFilter = currentAsks || [];
      if (filter === "Current") {
        return asksToFilter.filter(ask => 
          (ask.status === "open" || ask.status === "claimed")
        );
      } else {
        // For archived asks in "Your Asks" tab
        return asksToFilter.filter(ask => 
          ask.status === "delivered"
        );
      }
    } else {
      // For "Accepted Asks" tab
      const asksToFilter= acceptedAsks || [];
      if (filter === "Current") {
        return asksToFilter.filter(ask => 
          ask.status === "claimed"
        );
      } else {
        // For archived asks in "Accepted Asks" tab
        return asksToFilter.filter(ask => 
          ask.status === "delivered"
        );
      }
    }
  };
  
  const renderContent = () => {

    const asksToDisplay = getFilteredAsks();
    console.log(asksToDisplay)
    if (asksToDisplay.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No {filter.toLowerCase()} {activeTab === "Your Asks" ? "created" : "accepted"} asks found
        </div>
      );
    }
  
    if (activeTab === "Your Asks") {
      if (filter === "Current") {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                : "space-y-2 sm:space-y-3"
            }
          >
            {asksToDisplay.map((ask, index) => (
              <AskCard
                key={index}
                ask={ask}
                view={view}
                activeTab={activeTab}
                filter={filter}
                dispatch={dispatch}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                : "space-y-2 sm:space-y-3"
            }
          >
            {asksToDisplay.map((ask, index) => (
              <AskCard
                key={index}
                ask={ask}
                view={view}
                activeTab={activeTab}
                filter={filter}
                dispatch={dispatch}
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
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                : "space-y-2 sm:space-y-3"
            }
          >
            {asksToDisplay.map((acceptedAsks, index) => (
              <AskCard
                key={index}
                ask={acceptedAsks}
                view={view}
                activeTab={activeTab}
                filter={filter}
                dispatch={dispatch}
              />
            ))}
          </div>
        );
      } else {
        return (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                : "space-y-2 sm:space-y-3"
            }
          >
            {asksToDisplay.map((acceptedAsks, index) => (
              <AskCard
                key={index}
                ask={acceptedAsks}
                view={view}
                activeTab={activeTab}
                filter={filter}
                dispatch={dispatch}
              />
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-6 text-[#444444]">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100">
            <BsCheckLg size={16} className="sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <ViewToggle view={view} setView={setView} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-gray-200"
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
