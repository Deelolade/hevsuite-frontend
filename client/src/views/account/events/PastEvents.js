import React from "react";
import EventCard from "./EventCard";

const PastEvents = ({ events }) => {
      if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
         <div className="text-gray-500 text-lg mb-4">
          You have no past events
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} activeTab="Past Events" events={events} />
      ))}
    </div>
  );
};

export default PastEvents;
