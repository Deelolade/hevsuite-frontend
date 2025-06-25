import React from "react";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { removeSavedEvent } from "../../../features/eventSlice";
import toast from "react-hot-toast";

const SavedEvents = ({ events }) => {
  const dispatch = useDispatch();
  const { removeSavedEventLoading } = useSelector((state) => state.events);
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          You haven't saved any events yet
        </div>
      </div>
    );
  }

  const handleRemoveSavedEvent = async (eventId) => {
    console.log("Event ID", eventId);
    try {
      await dispatch(removeSavedEvent(eventId)).unwrap();
      toast.success("Event removed from saved events");
    } catch (error) {
      toast.error(error || "Failed to remove event");
      console.error("Failed to remove saved event:", error);
    }
  };
  console.log("Saved Events:", events);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        // <EventCard key={index} event={event} activeTab="Attending Events" events={events} />
        <div
          key={index}
          className="drop-shadow-[0px_10px_50px_rgba(0,0,0,0.18)] max-w-[241px]"
        >
          <img
            src={event.event.images[0]}
            alt={event.event.name}
            className="w-[241px] h-[200px]"
          />
          <div className="bg-white border-b rounded-xl">
            <div className="p-4">
              <h4 className="text-xl font-semibold">{event.event.name}</h4>
              <div>
                <div className="flex items-center justify-between gap-2 text-gray-500 mt-2">
                  <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                    <FiCalendar />
                    {formatDateWithSuffix(event.event.time)}
                  </div>
                  <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                    <FaRegClock />
                    {formatTime(event.event.time)}
                  </div>
                </div>
              </div>
              <div className="mt-3.5 flex flex-row items-center justify-between gap-4">
                <button
                  onClick={() => handleRemoveSavedEvent(event._id)}
                  className="py-2.5 px-4 rounded-lg bg-[#900C3F] text-white text-base"
                >
                  {removeSavedEventLoading ? "Removing..." : "Remove"}
                </button>
                <Link to={`/events/${event.event._id}`}>
                  <GoArrowRight className="text-[#111111] w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedEvents;
