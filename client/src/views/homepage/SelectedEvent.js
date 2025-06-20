import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { formatDateWithSuffix, formatTime } from "../../utils/formatDate";
import { MdAccessTime } from "react-icons/md";
import {
  fetchAttendingMembers,
  getSavedEvents,
  saveEvent,
  selectIsEventSaved,
} from "../../features/eventSlice";
import { PaymentMethodModal } from "../account/events/EventDetails";
import EventBg from "../../assets/event-bg.jpg";
import Event1 from "../../assets/event-1.jpg";
import Event2 from "../../assets/event-2.jpg";
import Event3 from "../../assets/event-3.jpg";
import Event4 from "../../assets/event-4.jpg";
import { setISODay } from "date-fns";

const SelectedEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isEventSaved = useSelector(selectIsEventSaved(id));
  console.log(isEventSaved);

  useEffect(() => {
    // Fetch saved events when component mounts
    dispatch(getSavedEvents());
  }, [dispatch]);

  useEffect(() => {
    // Find the event based on ID
    if (events && events.length > 0) {
      const foundEvent = events.find(
        (event) => event._id === id || event.id === id
      );

      if (foundEvent) {
        setSelectedEvent(foundEvent);
      }
    }
  }, [id, events]);

  useEffect(() => {
    if (events && events.length > 0) {
      const foundEvent = events.find(
        (event) => event._id === id || event.id === id
      );

      if (foundEvent) {
        setSelectedEvent(foundEvent);
      }
    }
  }, [id, events]);

  const formatEventDateTime = (startTime, endTime) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      const time = `${hours}.${minutesStr}${ampm}`;

      return `${month} ${day}, ${year} ${time}`;
    };

    const startFormatted = formatDate(startTime);
    const endFormatted = formatDate(endTime);

    return `${startFormatted} to ${endFormatted}`;
  };

  const [activeTab, setActiveTab] = useState("description");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [savingEvent, setSavingEvent] = useState(false);
  const { attendingMembers } = useSelector((state) => state.events);

  const attendees =
    selectedEvent && attendingMembers[selectedEvent._id]
      ? attendingMembers[selectedEvent._id]
      : [];
  useEffect(() => {
    if (selectedEvent && !attendingMembers[selectedEvent._id]) {
      dispatch(fetchAttendingMembers(selectedEvent._id));
    }
  }, [dispatch, selectedEvent, attendingMembers]);

  const attendeesPerPage = 4;
  const totalModalPages = Math.ceil(attendees.length / attendeesPerPage);

  const eventImages = [Event1, Event2, Event3, Event4];
  const generateRandomImages = () => {
    const randomImages = [];
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * eventImages.length);
      randomImages.push(eventImages[randomIndex]);
    }
    return randomImages;
  };

  const randomEventImages = generateRandomImages();

  const handleSaveEvent = (eventId) => {
    setSavingEvent(true);
    dispatch(saveEvent(eventId));
    setTimeout(() => {
      setSavingEvent(false);
    }, 1000);
  };

  if (isLoading || !selectedEvent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="relative">
        <Header />
        <div className="pt-24 relative lg:bg-[rgba(255,255,255,0.85)] bg-white min-h-screen ">
          <div className=" mx-auto px-4">
            <div className="bg-black  flex lg:flex-row flex-col">
              <div className="lg:w-3/4 ">
                <img
                  src={EventBg}
                  alt="Event"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="w-full lg:w-1/4">
                {/* Desktop: 4x4 grid of 16 images */}
                <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-4 h-[350px] gap-4">
                  {randomEventImages.map((image, index) => (
                    <div key={index} className="w-full h-full">
                      <img
                        src={image}
                        alt={`Event ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile: Single row of 4 images */}
            </div>
            <div className="flex flex-row items-center justify-center gap-4 lg:hidden mt-4">
              {eventImages.map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={image}
                    alt={`Event ${index + 1}`}
                    className="w-[40px] h-[40px] object-cover rounded-xl cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="lg:mt-11 mt-8 flex lg:flex-row flex-col lg:items-start items-center gap-4 lg:justify-between justify-center">
              <div className="flex flex-row flex-wrap items-start gap-4">
                <div className="flex flex-col lg:items-start items-center gap-3.5">
                  <div className="flex flex-row items-start gap-4 flex-wrap">
                    <h2 className="lg:text-4xl text-xl font-bold text-[#374151] lg:max-w-xl line-clamp-2">
                      {selectedEvent.name} at {selectedEvent.location}
                    </h2>
                    <div className="mt-1 inline-block px-8 py-1 rounded-full border-2 border-gradient_r text-black font-semibold">
                      {selectedEvent.audienceType === "members"
                        ? "Members Only"
                        : selectedEvent.audienceType === "vip"
                        ? "VIP Only"
                        : "Open to All"}
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-[#6B7280] uppercase">
                    <p className="text-sm font-semibold text-[#6B7280] uppercase">
                      {formatEventDateTime(
                        selectedEvent.time,
                        selectedEvent.endTime
                      )}
                    </p>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h4 className="text-3xl font-semibold text-black">
                  £{selectedEvent.price}
                </h4>
                <button className="w-full py-1 px-8 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium">
                  Attend
                </button>
              </div>
            </div>
            <div className="lg:bg-white drop-shadow-[0px_10px_50px_rgba(0,0,0,0.18)] my-11 rounded-3xl w-full overflow-hidden">
              <div className="flex flex-col md:flex-row md:h-full">
                {/* Left side - Image */}
                <div className="w-full md:w-5/12 relative bg-black">
                  <div className="relative h-full overflow-y-auto">
                    <img
                      src={selectedEvent.images[0]}
                      alt={selectedEvent.name}
                      className="w-full md:h-full h-[25rem] object-center bg-center bg-current opacity-90"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                      <div className="inline-block px-4 py-1.5 rounded-full border-2 border-gradient_r text-white mb-6">
                        {selectedEvent.audienceType === "members"
                          ? "Members Only"
                          : selectedEvent.audienceType === "vip"
                          ? "VIP Only"
                          : "Open to All"}
                      </div>
                      <div className="flex items-center gap-6 text-white mb-4">
                        <div className="flex items-center gap-2">
                          <BsCalendar />
                          <span>
                            {formatDateWithSuffix(selectedEvent.time)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MdAccessTime />
                          <span>{formatTime(selectedEvent.time)}</span>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-6">
                        {selectedEvent.numberOfTicket === 1
                          ? "Note: You can only buy one ticket"
                          : `Note: You can buy up to ${selectedEvent.numberOfTicket} tickets`}
                      </p>
                      <button
                        // onClick={() => setShowPaymentModal(true)}
                        className="w-full opacity-0 py-4 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
                      >
                        Attend
                      </button>
                      <div className="flex flex-row items-center justify-between gap-4">
                        <FaHeart
                          className={`${
                            isEventSaved ? "text-[#540A26]" : "text-[#9C9494]"
                          }  text-xl transition-all duration-300 active:text-[#540A26]`}
                        />
                        <button
                          onClick={() => handleSaveEvent(selectedEvent._id)}
                          className="w-[327px] py-1 px-8 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
                        >
                          {isEventSaved
                            ? "Event Saved"
                            : savingEvent
                            ? "Saving..."
                            : "Save for later"}
                        </button>
                      </div>
                      {showPaymentModal && (
                        <PaymentMethodModal
                          onClose={() => setShowPaymentModal(false)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="w-full md:w-7/12 overflow-y-auto max-h-[80vh] lg:mt-0 mt-14">
                  <div className="lg:border-b">
                    <div className="flex flex-row items-center lg:gap-0 gap-4">
                      <button
                        className={`lg:px-8 lg:py-4 py-1.5 px-2.5 rounded-[4px] lg:rounded-none lg:text-lg text-xs ${
                          activeTab === "description"
                            ? "bg-[#540A26] text-white"
                            : "lg:bg-white bg-[#F3F2F3] text-black"
                        }`}
                        onClick={() => setActiveTab("description")}
                      >
                        Event Description
                      </button>
                      <button
                        className={`lg:px-8 lg:py-4 py-1.5 px-2.5 rounded-[4px] lg:rounded-none lg:text-lg text-xs ${
                          activeTab === "location"
                            ? "bg-[#540A26] text-white"
                            : "lg:bg-white bg-[#F3F2F3] text-black lg:border-x border-[#C4C4C4]"
                        }`}
                        onClick={() => setActiveTab("location")}
                      >
                        Location
                      </button>
                      <button
                        className={`lg:px-8 lg:py-4 py-1.5 px-2.5 rounded-[4px] lg:rounded-none lg:text-lg text-xs ${
                          activeTab === "members"
                            ? "bg-[#540A26] text-white"
                            : "lg:bg-white bg-[#F3F2F3] text-black"
                        }`}
                        onClick={() => setActiveTab("members")}
                      >
                        Attending Members
                      </button>
                    </div>
                  </div>

                  <div className="lg:p-8 pt-4">
                    {activeTab === "description" && (
                      <div>
                        <h2 className="lg:text-[40px] text-2xl lg:font-bold font-semibold mb-4 text-black font-primary">
                          {selectedEvent.name}
                        </h2>

                        <p className="text-gray-600 mb-6">
                          {selectedEvent.description}
                        </p>
                      </div>
                    )}

                    {activeTab === "location" && (
                      <div className="h-[500px]">
                        {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={mapCenter}
                        zoom={15}
                      >
                        <Marker position={mapCenter} />
                      </GoogleMap>
                    </LoadScript>
                    <p className="mt-4 text-gray-600">
                      No. 12, Kudirat Abiola Avenue, Ikeja, NG.
                    </p> */}
                        {/* <h1>hello</h1> */}
                        <div>
                          <div id="google-maps-canvas" className="h-full">
                            {/* <iframe
                        className="md:h-[500px] w-full"
                        frameborder="0"
                        src="https://www.google.com/maps/embed/v1/place?q=uk+london,+brixton+brockwell+park&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                      /> */}
                            <iframe
                              className="md:h-[500px] w-full"
                              frameBorder="0"
                              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${selectedEvent.location?.coordinates?.lat},${selectedEvent.location?.coordinates?.lng}&zoom=15`}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "members" && (
                      <div className="space-y-4">
                        {attendees.map((attendee, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img
                              src={attendee.profilePhoto}
                              alt={`${attendee.forename} ${attendee.lastname}`}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold text-black">
                                {`${attendee.forename} ${attendee.surname}`}
                              </h3>
                              <p className="text-gray-600">
                                {formatDateWithSuffix(attendee.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectedEvent;
