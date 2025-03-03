import React from "react";
import EventCard from "./EventCard";

const PastEvents = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} activeTab="Past Events" />
      ))}
    </div>
  );
};

export default PastEvents;
