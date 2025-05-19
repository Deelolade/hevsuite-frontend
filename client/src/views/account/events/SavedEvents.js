import React from "react";
import EventCard from "./EventCard";

const SavedEvents = ({ events }) => {
    if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          You haven't saved any events yet
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} activeTab="Saved Events" events={events}/>
      ))}
    </div>
  );
};

export default SavedEvents;
