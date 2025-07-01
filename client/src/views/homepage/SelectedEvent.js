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
  fetchAllEventTypes,
  removeSavedEvent,
} from "../../features/eventSlice";
import { PaymentMethodModal } from "../account/events/EventDetails";
import PaymentModal from "../../components/PaymentModal";
import EventBg from "../../assets/event-bg.jpg";
import Event1 from "../../assets/event-1.jpg";
import Event2 from "../../assets/event-2.jpg";
import Event3 from "../../assets/event-3.jpg";
import Event4 from "../../assets/event-4.jpg";
import toast from "react-hot-toast";
import { fetchProfile } from "../../features/auth/authSlice";
import AuthModal from "../../components/AuthModal";
import useUserIdentificationApproved from "../../hooks/useIdentificationApproved";

const SelectedEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const isEventSaved = useSelector(selectIsEventSaved(id));
  const isUserAttending = useSelector((state) => {
    if (!selectedEvent) return false;
    const attendingEvents = state.events.attendingEvents || [];
    return attendingEvents.some((event) => event._id === selectedEvent._id);
  });
  const { user } = useSelector((state) => state.auth);
  const [showDocumentReviewModal, setShowDocumentReviewModal] = useState(false);
  const { userIdentificationApproved } = useUserIdentificationApproved();

  useEffect(() => {
    // Fetch saved events when component mounts
    dispatch(getSavedEvents());
    dispatch(fetchProfile());
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
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showOneTimePaymentModal, setShowOneTimePaymentModal] = useState(false);
  const [selectedTicketCount, setSelectedTicketCount] = useState(1);
  const [savingEvent, setSavingEvent] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
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
    try {
      dispatch(saveEvent(eventId)).unwrap();
      toast.success("Event saved successfully");
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error("Failed to save event");
    } finally {
      setSavingEvent(false);
    }
  };

  const handleUnsaveEvent = async (eventId) => {
    setSavingEvent(true);
    try {
      await dispatch(removeSavedEvent(eventId)).unwrap();
      toast.success("Event removed from saved list");
    } catch (error) {
      console.error("Failed to unsave event:", error);
      toast.error("Failed to unsave event");
    } finally {
      setSavingEvent(false);
    }
  };

  const handleTicketConfirm = (ticketCount) => {
    setSelectedTicketCount(ticketCount);
    setShowTicketModal(false);
    setShowPaymentModal(true);
  };
  const handleAttendEvent = () => {
    if (!userIdentificationApproved) {
      console.log("Approved? ", userIdentificationApproved);
      setShowDocumentReviewModal(true);
      return;
    }
    if (user.isRestricted) {
      toast.error("You are restricted from attending events");
      return;
    }
    if (isUserAttending) {
      toast.info("You are already registered for this event");
      return;
    }
    if (
      selectedEvent.audienceType === "all" ||
      selectedEvent.audienceType === "open"
    ) {
      setShowTicketModal(true);
    } else {
      const newPaymentData = {
        eventId: selectedEvent._id,
        ticketCount: selectedTicketCount,
        amount: selectedEvent.price * selectedTicketCount,
        type: `Event - ${selectedEvent.name} ticket purchase`,
        reason: `Ticket purchase for ${selectedEvent.name}`,
      };
      setPaymentData(newPaymentData);
      setShowOneTimePaymentModal(true);
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const hasMultipleImages =
    selectedEvent?.images && selectedEvent?.images.length > 1;

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (isLoading || !selectedEvent || userIdentificationApproved === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-medium">Loading...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="relative">
        <Header />{" "}
        <AuthModal
          open={showDocumentReviewModal}
          title="Document Verification Process "
          description="Verification is ongoing before you can start using this feature"
          onClose={() => setShowDocumentReviewModal(false)}
        />
        {showTicketModal && (
          <TicketSelectionModal
            event={selectedEvent}
            onClose={() => setShowTicketModal(false)}
            onConfirm={handleTicketConfirm}
            setPaymentData={setPaymentData}
            setShowOneTimePaymentModal={setShowOneTimePaymentModal}
          />
        )}
        {showPaymentModal && (
          <PaymentMethodModal
            event={selectedEvent}
            ticketCount={selectedTicketCount}
            onClose={() => setShowPaymentModal(false)}
          />
        )}
        {showOneTimePaymentModal && (
          <PaymentModal
            isOpen={showOneTimePaymentModal}
            onClose={() => setShowOneTimePaymentModal(false)}
            paymentData={paymentData}
            onPaymentSuccess={async (result) => {
              console.log("Payment successful:", result);
              setShowOneTimePaymentModal(false);

              try {
                await dispatch(fetchAllEventTypes()).unwrap();
              } catch (error) {
                console.error("Failed to refresh attending events:", error);
              }
            }}
          />
        )}
        <div className="relative lg:bg-[rgba(255,255,255,0.85)] bg-white min-h-screen ">
          <div className="">
            <div className="bg-black  flex lg:flex-row flex-col">
              <div className={`${hasMultipleImages ? "lg:w-3/4" : "w-full"}`}>
                <img
                  src={selectedEvent.images[selectedImageIndex]}
                  alt="Event"
                  className="w-full h-[350px] object-cover"
                />
              </div>

              {hasMultipleImages && (
                <div className="w-full lg:w-1/4 flex items-center justify-center">
                  <div className="hidden lg:flex flex-row justify-center items-center gap-1 p-2">
                    {selectedEvent.images.map((image, index) => (
                      <div
                        key={index}
                        className={`w-full h-full cursor-pointer transition-all duration-200 hover:opacity-80 ${
                          selectedImageIndex === index
                            ? "ring-2 ring-white"
                            : ""
                        }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <img
                          src={image}
                          alt={`Event ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {hasMultipleImages && (
              <div className="flex flex-row items-center justify-center gap-4 lg:hidden mt-4">
                {selectedEvent.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square cursor-pointer transition-all duration-200 hover:opacity-80 ${
                      selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Event ${index + 1}`}
                      className="w-[40px] h-[40px] object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mx-auto px-4">
              <div className="lg:mt-11 mt-8 flex lg:flex-row flex-col lg:items-start items-center gap-4 lg:justify-between justify-center">
                <div className="flex flex-row flex-wrap items-start gap-4">
                  <div className="flex flex-col lg:items-start items-center gap-3.5">
                    <div className="flex flex-row items-start gap-4 w-[80%]">
                      <h2 className="lg:text-4xl text-xl font-bold text-[#374151] whitespace-nowrap">
                        {selectedEvent.name}
                      </h2>
                      <div className="mt-1 inline-block px-8 py-1 rounded-full border-2 border-gradient_r text-black font-semibold whitespace-nowrap">
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
                  {isUserAttending && selectedEvent.audienceType !== "all" ? (
                    <button
                      disabled
                      className="w-full py-1 px-8 bg-gray-400 text-white rounded-xl text-lg font-medium cursor-not-allowed"
                    >
                      Registered
                    </button>
                  ) : (
                    <button
                      onClick={handleAttendEvent}
                      className="w-full py-1 px-8 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Attend
                    </button>
                  )}
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

                        <div className="mt-12 flex flex-row items-center justify-between gap-4">
                          <button
                            onClick={() =>
                              isEventSaved
                                ? handleUnsaveEvent(selectedEvent._id)
                                : handleSaveEvent(selectedEvent._id)
                            }
                            aria-label={
                              isEventSaved ? "Unsave event" : "Save event"
                            }
                            className="focus:outline-none"
                            type="button"
                          >
                            <FaHeart
                              size={24}
                              className={`${
                                isEventSaved
                                  ? "text-[#540A26]"
                                  : "text-[#9C9494]"
                              } text-xl transition-all duration-300 active:text-[#540A26]`}
                            />
                          </button>
                          <button
                            onClick={() =>
                              isEventSaved
                                ? handleUnsaveEvent(selectedEvent._id)
                                : handleSaveEvent(selectedEvent._id)
                            }
                            className="w-[327px] py-1 px-8 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
                            type="button"
                            disabled={savingEvent}
                          >
                            {isEventSaved
                              ? savingEvent
                                ? "Unsaving..."
                                : "Unsave Event"
                              : savingEvent
                              ? "Saving..."
                              : "Save for later"}
                          </button>
                        </div>
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
                      /> */}{" "}
                              <iframe
                                className="md:h-[500px] w-full"
                                frameBorder="0"
                                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${selectedEvent.location?.coordinates?.lat},${selectedEvent.location?.coordinates?.lng}&zoom=15`}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map showing location of ${selectedEvent.name}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "members" && (
                        <div className="space-y-4">
                          {attendees.map((attendee, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4"
                            >
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
      </div>
      <Footer />
    </div>
  );
};

const TicketSelectionModal = ({
  event,
  onClose,
  onConfirm,
  setPaymentData,
  setShowOneTimePaymentModal,
}) => {
  const [ticketCount, setTicketCount] = useState(1);
  const maxTickets = event.numberOfTicket || 1;

  const incrementTickets = () => {
    if (ticketCount < maxTickets) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decrementTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  const handleConfirm = () => {
    const newPaymentData = {
      eventId: event._id,
      ticketCount: ticketCount,
      amount: event.price * ticketCount,
      type: `Event - ${event.name} ticket purchase`,
      reason: `Ticket purchase for ${event.name}`,
    };
    setPaymentData(newPaymentData);
    onClose(); // Close ticket modal
    setShowOneTimePaymentModal(true); // Open payment modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Select Tickets
          </h2>
          <p className="text-gray-600 mb-6">
            How many tickets would you like for this event?
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800">{event.name}</h3>
            <p className="text-sm text-gray-600">{event.location}</p>
            <p className="text-lg font-bold text-gray-800 mt-2">
              £{event.price} per ticket
            </p>
          </div>

          {/* Ticket Counter */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={decrementTickets}
              disabled={ticketCount <= 1}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              -
            </button>

            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                {ticketCount}
              </div>
              <div className="text-sm text-gray-600">
                {ticketCount === 1 ? "ticket" : "tickets"}
              </div>
            </div>

            <button
              onClick={incrementTickets}
              disabled={ticketCount >= maxTickets}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Total Price */}
          <div className="bg-gradient-to-r from-gradient_r to-gradient_g rounded-xl p-4 mb-6">
            <div className="text-white">
              <p className="text-sm opacity-90">Total Amount</p>
              <p className="text-2xl font-bold">
                £{(event.price * ticketCount).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl font-medium"
            >
              Confirm {ticketCount} {ticketCount === 1 ? "Ticket" : "Tickets"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedEvent;
