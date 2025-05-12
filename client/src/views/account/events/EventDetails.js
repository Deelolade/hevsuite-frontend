import React, { useEffect, useState } from "react";
import {
  BsBell,
  BsChevronLeft,
  BsChevronRight,
  BsCalendar,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import avatar from "../../../assets/user.avif";
import party from "../../../assets/party2.jpg";
import eventimg from "../../../assets/event.png";
import mastercard from "../../../assets/Mastercard.png";
import paypal from "../../../assets/PayPal.png";
import stripe from "../../../assets/Stripe.png"
import { fetchAttendingMembers, removeSavedEvent, saveEvent } from "../../../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import toast from "react-hot-toast";

const EventDetailsModal = ({ event, onClose, eventType, events }) => {

  const dispatch = useDispatch();
  const { savedEvents, saveEventLoading, removeSavedEventLoading } =
    useSelector(state => state.events);

  const isSaved = savedEvents.some(saved => saved._id === event._id);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalPage, setModalPage] = useState(1);
  const { attendingMembers, membersLoading } = useSelector((state) => state.events);

  // Get attendees for the current event
  const attendees = attendingMembers[event._id] || [];
  useEffect(() => {
    // Only fetch if we haven't already loaded members for this event
    if (!attendingMembers[event._id]) {
      dispatch(fetchAttendingMembers(event._id));
    }
  }, [dispatch, event._id, attendingMembers]);

  const attendeesPerPage = 4;
  const totalModalPages = Math.ceil(attendees.length / attendeesPerPage);

  const handleModalPageChange = (page) => {
    setModalPage(page);
  };

  const paginatedAttendees = attendees.slice(
    (modalPage - 1) * attendeesPerPage,
    modalPage * attendeesPerPage
  );

  const mapCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates

  const [currentEventIndex, setCurrentEventIndex] = useState(
    events.findIndex((eventx) => eventx.name === event.name)
  );

  const handleNext = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const currentEvent = events[currentEventIndex];

  return (
    <div className="fixed inset-0 z-50  superZ flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white h-[90vh]  rounded-3xl w-full md:w-[80vw] max-w-7xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:h-full">
          {/* Left side - Image */}
          <div className="w-full md:w-5/12 relative bg-black">
            <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
              <BsChevronLeft
                size={20}
                className="cursor-pointer"
                onClick={onClose}
              />
              <span>{eventType}</span>
            </div>
            <div className="relative h-full overflow-y-auto">
              <img
                src={currentEvent.image}
                alt={currentEvent.name}
                className="w-full md:h-full h-[25rem] object-center bg-center bg-current opacity-90"
              />
              <div className="absolute -mt-10 inset-0 flex items-center justify-between px-6">
                <button
                  onClick={handlePrev}
                  className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <BsChevronLeft className="text-white text-xl" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <BsChevronRight className="text-white text-xl" />
                </button>
              </div>
              <div className="absolute top-6 right-6">
                {/* <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm  active:text-red-500 flex items-center justify-center">
                  <BsHeart className="text-white text-xl transition-all duration-300 active:text-red-500" />
                </button> */}
                <button
                  onClick={async () => {
                    // if (isSaved) {
                    //   dispatch(removeSavedEvent(event._id))
                    //     .unwrap()
                    //     .then(() => toast.success('Removed from saved!'))
                    //     .catch(err => toast.error(err.message));
                    // } else {
                    //   dispatch(saveEvent(event._id))
                    //     .unwrap()
                    //     .then(() => toast.success('Event saved!'))
                    //     .catch(err => toast.error(err.message));
                    // }
                    try {
                      if (isSaved) {
                        await dispatch(removeSavedEvent(event._id)).unwrap();
                        toast.success('Removed from saved!');
                      } else {
                        // Optimistic update
                        // setIsSaved(true);
                        await dispatch(saveEvent(event._id)).unwrap();
                        toast.success('Event saved!');
                      }
                    } catch (err) {
                      // Revert on error
                      // setIsSaved(!isSaved);
                      console.log(err)
                      toast.error(err || 'Something went wrong');
                    }

                  }}
                  className={`w-12 h-12 flex items-center justify-center ${isSaved ? 'text-red-500' : 'text-white'
                    }`}
                >
                  {isSaved ? (
                    <BsHeartFill className="text-xl" />
                  ) : (
                    <BsHeart className="text-xl" />
                  )}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                <div className="text-5xl font-bold text-white mb-4">{currentEvent.price}£</div>
                <div className="inline-block px-4 py-1.5 rounded-full border-2 border-gradient_r text-white mb-6">
                  {currentEvent.audienceType === "members" ? "Members Only" : currentEvent.audienceType === "vip" ? "VIP Only" : "Open to All"}
                </div>
                <div className="flex items-center gap-6 text-white mb-4">
                  <div className="flex items-center gap-2">
                    <BsCalendar />
                    <span>{formatDateWithSuffix(currentEvent.time)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime />
                    <span>{formatTime(currentEvent.time)}</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-6">
                  {currentEvent.numberOfTicket === 1
                    ? "Note: You can only buy one ticket"
                    : `Note: You can buy up to ${currentEvent.numberOfTicket} tickets`}
                </p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full opacity-70 py-4 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
                >
                  Attend
                </button>
                {showPaymentModal && (
                  <PaymentMethodModal
                    onClose={() => setShowPaymentModal(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right side - Details */}
          <div className="w-full md:w-7/12 overflow-y-auto max-h-[80vh]">
            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-8 py-4 ${activeTab === "description"
                    ? "bg-[#540A26] text-white"
                    : "bg-white text-black"
                    }`}
                  onClick={() => setActiveTab("description")}
                >
                  Event Description
                </button>
                <button
                  className={`px-8 py-4 ${activeTab === "location"
                    ? "bg-[#540A26] text-white"
                    : "bg-white text-black"
                    }`}
                  onClick={() => setActiveTab("location")}
                >
                  Location
                </button>
                <button
                  className={`px-8 py-4 ${activeTab === "members"
                    ? "bg-[#540A26] text-white"
                    : "bg-white text-black"
                    }`}
                  onClick={() => setActiveTab("members")}
                >
                  Attending Members
                </button>
              </div>
            </div>

            <div className="p-8">
              {activeTab === "description" && (
                <div>
                  <h2 className="text-[40px] font-bold mb-4 text-black font-primary">
                    {currentEvent.name}
                  </h2>
                  <h3 className="text-xl mb-4 text-black font-primary font-semibold">
                    The Party of the Year! 🎵
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {currentEvent.description}
                  </p>
                  <h3 className="text-xl font-semibold mb-4 text-black">
                    🎵 What to Expect
                  </h3>
                  <ul className="space-y-2 text-gray-600 list-disc p-4 ">
                    <li>
                      Live DJ or Band spinning your favorite hits all night
                      long!
                    </li>
                    <li>
                      Delicious Food & Drinks to keep you energized and in the
                      party mood.
                    </li>
                    <li>
                      Fun Activities & Surprises that will make this night
                      unforgettable.
                    </li>
                    <li>Photo Booth to capture all your favorite moments.</li>
                  </ul>
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
                        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${currentEvent.location?.coordinates?.lat},${currentEvent.location?.coordinates?.lng}&zoom=15`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <p className="mt-4 text-gray-600">
                        {currentEvent.location?.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "members" && (
                <div className="space-y-4">
                  {paginatedAttendees.map((attendee, index) => (
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
                        <p className="text-gray-600">{formatDateWithSuffix(attendee.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                      className="p-2"
                      onClick={() =>
                        handleModalPageChange(
                          modalPage > 1 ? modalPage - 1 : totalModalPages
                        )
                      }
                    >
                      <BsChevronLeft />
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalModalPages }, (_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${modalPage === index + 1
                            ? "bg-[#540A26]"
                            : "bg-gray-200"
                            }`}
                        ></div>
                      ))}
                    </div>
                    <button
                      className="p-2"
                      onClick={() =>
                        handleModalPageChange(
                          modalPage < totalModalPages ? modalPage + 1 : 1
                        )
                      }
                    >
                      <BsChevronRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentMethodModal = ({ onClose, showNewModal, onPaymentMethodSelect }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const paymentMethods = [
    { id: "mastercard", logo: mastercard, name: "Mastercard" },
    { id: "paypal", logo: paypal, name: "PayPal" },
    { id: "stripe", logo: stripe, name: "Stripe" },
  ];

  const handleMethodSelection = () => {
    if (selectedPaymentMethod) {

      // Optionally call showNewModal or close the modal
      onPaymentMethodSelect(selectedPaymentMethod);
      showNewModal();
      onClose();
    } else {
      alert("Please select a payment method.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Select your Payment Method</h2>
          <button onClick={onClose} className="text-[#540A26] font-medium">
            Back
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method.name)}
              className={`bg-white rounded-lg p-4 shadow-sm border cursor-pointer transition-colors ${selectedPaymentMethod === method.name
                ? 'border-[#540A26] bg-[#540A26]/10'
                : 'hover:border-[#540A26] border-gray-200'
                }`}
            >
              <img
                src={method.logo}
                alt={method.name}
                className="w-full h-12 object-contain"
              />
            </div>
          ))}
        </div>

        <button onClick={() => handleMethodSelection()} className="w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
          Next
        </button>
      </div>
    </div>
  );
};

export default EventDetailsModal;
