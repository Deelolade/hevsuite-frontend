import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEventTypes } from "../../../features/eventSlice";
import logo from "../../../assets/logo_white.png";
import EventCard from "./EventCard";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { visibleEvents, loading } = useSelector((state) => state.events);
  const [timeFilter, setTimeFilter] = useState("24hr");

  useEffect(() => {
    dispatch(fetchAllEventTypes());
  }, [dispatch]);

  const getFilteredEvents = () => {
    const now = new Date();
    let endDate;

    switch (timeFilter) {
      case "24hr":
        endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case "7days":
        endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }

    return visibleEvents.filter((event) => {
      const eventTime = new Date(event.time);
      const isWithinTimeRange = eventTime >= now && eventTime <= endDate;

      return isWithinTimeRange;
    });
  };

  const filteredEvents = getFilteredEvents();

  console.log("visibleEvents", visibleEvents);
  console.log("filteredEvents", filteredEvents);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="py-4 px-8">
      <div className="mt-6">
        <img src={logo} alt="logo" />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <select
          className="w-full md:w-auto bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-sm appearance-none"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="24hr" className="text-black">
            Next 24 Hours
          </option>
          <option value="7days" className="text-black">
            Next 7 Days
          </option>
          <option value="month" className="text-black">
            Over a Month
          </option>
        </select>
      </div>

      <div className="mt-5">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black text-lg">No upcoming events</p>
            <p className="text-black text-sm mt-2">
              Try adjusting your filters to see more events
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredEvents.map((event, index) => (
              <EventCard key={event._id || index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
