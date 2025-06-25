import React, { useState } from "react";
import EventCard from "./EventCard";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  cancelEventAttendance,
  fetchAllEventTypes,
} from "../../../features/eventSlice";
import toast from "react-hot-toast";

const AttendingEvents = ({ events }) => {
  const dispatch = useDispatch();
  const [cancelingEvents, setCancelingEvents] = useState({});

  const handleCancelAttendance = async (eventId) => {
    setCancelingEvents((prev) => ({ ...prev, [eventId]: true }));

    try {
      await dispatch(cancelEventAttendance(eventId)).unwrap();

      // Refresh all events to sync with backend
      await dispatch(fetchAllEventTypes()).unwrap();

      toast.success("Attendance cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel attendance:", error);
      toast.error("Failed to cancel attendance");
    } finally {
      setCancelingEvents((prev) => {
        const { [eventId]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          You're not attending any events
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        // <EventCard key={index} event={event} activeTab="Attending Events" events={events} />
        <div
          key={index}
          className="drop-shadow-[0px_10px_50px_rgba(0,0,0,0.18)] max-w-[241px]"
        >
          <img
            src={event.images[0]}
            alt={event.name}
            className="w-[241px] h-[200px]"
          />
          <div className="bg-white border-b rounded-xl">
            <div className="p-4">
              <h4 className="text-xl font-semibold">{event.name}</h4>
              <div>
                <div className="flex items-center justify-between gap-2 text-gray-500 mt-2">
                  <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                    <FiCalendar />
                    {formatDateWithSuffix(event.time)}
                  </div>
                  <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                    <FaRegClock />
                    {formatTime(event.time)}
                  </div>
                </div>
              </div>
              <div className="mt-3.5 flex flex-row items-center justify-between gap-4">
                <button
                  onClick={() => handleCancelAttendance(event._id)}
                  disabled={cancelingEvents[event._id]}
                  className="py-2.5 px-4 rounded-lg bg-[#900C3F] text-white text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelingEvents[event._id]
                    ? "Cancelling..."
                    : "Cancel Attendance"}
                </button>
                <Link to={`/events/${event._id}`}>
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

export default AttendingEvents;
