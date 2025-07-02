import React, { useEffect, useState } from "react";
import headerBg from "../../assets/header-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import { MdPerson, MdLocationOn } from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchNonExpiredNews } from "../../features/newsSlice";
import { fetchEvents, fetchAllEventTypes } from "../../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDateWithSuffix, formatTime } from "../../utils/formatDate";
import PaymentModal from "../../components/PaymentModal";
import toast from "react-hot-toast";
import AuthModal from "../../components/AuthModal";
import useUserIdentificationApproved from "../../hooks/useIdentificationApproved";
import { PaymentMethodModal } from "../account/events/EventDetails";
import { RxHamburgerMenu } from "react-icons/rx";

// const EventDetailsModal = ({ event, onClose, eventType, events }) => {
//   const dispatch = useDispatch();

//   const [activeTab, setActiveTab] = useState("description");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [modalPage, setModalPage] = useState(1);
//   const { attendingMembers, membersLoading } = useSelector(
//     (state) => state.events
//   );

//   // Get attendees for the current event
//   const attendees = attendingMembers[event._id] || [];
//   useEffect(() => {
//     // Only fetch if we haven't already loaded members for this event
//     if (!attendingMembers[event._id]) {
//       dispatch(fetchAttendingMembers(event._id));
//     }
//   }, [dispatch, event._id, attendingMembers]);

//   const attendeesPerPage = 4;
//   const totalModalPages = Math.ceil(attendees.length / attendeesPerPage);

//   const handleModalPageChange = (page) => {
//     setModalPage(page);
//   };

//   const paginatedAttendees = attendees.slice(
//     (modalPage - 1) * attendeesPerPage,
//     modalPage * attendeesPerPage
//   );

//   const mapCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates

//   const [currentEventIndex, setCurrentEventIndex] = useState(
//     events.findIndex((eventx) => eventx.name === event.name)
//   );

//   // const handleNext = () => {
//   //   setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
//   // };

//   // const handlePrev = () => {
//   //   setCurrentEventIndex((prevIndex) =>
//   //     prevIndex === 0 ? events.length - 1 : prevIndex - 1
//   //   );
//   // };
//   const handleNext = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex + 1) % currentEvent.images.length
//     );
//   };

//   const handlePrev = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? currentEvent.images.length - 1 : prevIndex - 1
//     );
//   };

//   const currentEvent = events[currentEventIndex];

//   return (
//     <div className="fixed inset-0 z-50  superZ flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
//       <div className="bg-white h-[90vh]  rounded-3xl w-full md:w-[80vw] max-w-7xl overflow-hidden">
//         <div className="flex flex-col md:flex-row md:h-full">
//           {/* Left side - Image */}
//           <div className="w-full md:w-5/12 relative bg-black">
//             <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
//               <BsChevronLeft
//                 size={20}
//                 className="cursor-pointer"
//                 onClick={onClose}
//               />
//               <span>{eventType}</span>
//             </div>
//             <div className="relative h-full overflow-y-auto">
//               {/* <img
//                 src={currentEvent.image}
//                 alt={currentEvent.name}
//                 className="w-full md:h-full h-[25rem] object-center bg-center bg-current opacity-90"
//               /> */}
//               <img
//                 src={currentEvent.images[currentImageIndex]}
//                 alt={currentEvent.name}
//                 className="w-full md:h-full h-[25rem] object-center bg-center bg-current opacity-90"
//               />
//               <div className="absolute -mt-10 inset-0 flex items-center justify-between px-6">
//                 <button
//                   onClick={handlePrev}
//                   className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
//                 >
//                   <BsChevronLeft className="text-white text-xl" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
//                 >
//                   <BsChevronRight className="text-white text-xl" />
//                 </button>
//               </div>
//               <div className="absolute top-6 right-6">
//                 <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm  active:text-red-500 flex items-center justify-center">
//                   <BsHeart className="text-white text-xl transition-all duration-300 active:text-red-500" />
//                 </button>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
//                 <div className="text-5xl font-bold text-white mb-4">
//                   {currentEvent.price}£
//                 </div>
//                 <div className="inline-block px-4 py-1.5 rounded-full border-2 border-gradient_r text-white mb-6">
//                   {currentEvent.audienceType === "members"
//                     ? "Members Only"
//                     : currentEvent.audienceType === "vip"
//                     ? "VIP Only"
//                     : "Open to All"}
//                 </div>
//                 <div className="flex items-center gap-6 text-white mb-4">
//                   <div className="flex items-center gap-2">
//                     <BsCalendar />
//                     <span>{formatDateWithSuffix(currentEvent.time)}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <MdAccessTime />
//                     <span>{formatTime(currentEvent.time)}</span>
//                   </div>
//                 </div>
//                 <p className="text-white/70 text-sm mb-6">
//                   {currentEvent.numberOfTicket === 1
//                     ? "Note: You can only buy one ticket"
//                     : `Note: You can buy up to ${currentEvent.numberOfTicket} tickets`}
//                 </p>
//                 <button
//                   // onClick={() => setShowPaymentModal(true)}
//                   className="w-full opacity-0 py-4 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
//                 >
//                   Attend
//                 </button>
//                 {showPaymentModal && (
//                   <PaymentMethodModal
//                     onClose={() => setShowPaymentModal(false)}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right side - Details */}
//           <div className="w-full md:w-7/12 overflow-y-auto max-h-[80vh]">
//             <div className="border-b">
//               <div className="flex">
//                 <button
//                   className={`px-8 py-4 ${
//                     activeTab === "description"
//                       ? "bg-[#540A26] text-white"
//                       : "bg-white text-black"
//                   }`}
//                   onClick={() => setActiveTab("description")}
//                 >
//                   Event Description
//                 </button>
//                 <button
//                   className={`px-8 py-4 ${
//                     activeTab === "location"
//                       ? "bg-[#540A26] text-white"
//                       : "bg-white text-black"
//                   }`}
//                   onClick={() => setActiveTab("location")}
//                 >
//                   Location
//                 </button>
//                 <button
//                   className={`px-8 py-4 ${
//                     activeTab === "members"
//                       ? "bg-[#540A26] text-white"
//                       : "bg-white text-black"
//                   }`}
//                   onClick={() => setActiveTab("members")}
//                 >
//                   Attending Members
//                 </button>
//               </div>
//             </div>

//             <div className="p-8">
//               {activeTab === "description" && (
//                 <div>
//                   <h2 className="text-[40px] font-bold mb-4 text-black font-primary">
//                     {currentEvent.name}
//                   </h2>
//                   <h3 className="text-xl mb-4 text-black font-primary font-semibold">
//                     The Party of the Year! 🎵
//                   </h3>
//                   <p className="text-gray-600 mb-6">
//                     {currentEvent.description}
//                   </p>
//                   <h3 className="text-xl font-semibold mb-4 text-black">
//                     🎵 What to Expect
//                   </h3>
//                   <ul className="space-y-2 text-gray-600 list-disc p-4 ">
//                     <li>
//                       Live DJ or Band spinning your favorite hits all night
//                       long!
//                     </li>
//                     <li>
//                       Delicious Food & Drinks to keep you energized and in the
//                       party mood.
//                     </li>
//                     <li>
//                       Fun Activities & Surprises that will make this night
//                       unforgettable.
//                     </li>
//                     <li>Photo Booth to capture all your favorite moments.</li>
//                   </ul>
//                 </div>
//               )}

//               {activeTab === "location" && (
//                 <div className="h-[500px]">
//                   {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                       <GoogleMap
//                         mapContainerStyle={{ width: '100%', height: '100%' }}
//                         center={mapCenter}
//                         zoom={15}
//                       >
//                         <Marker position={mapCenter} />
//                       </GoogleMap>
//                     </LoadScript>
//                     <p className="mt-4 text-gray-600">
//                       No. 12, Kudirat Abiola Avenue, Ikeja, NG.
//                     </p> */}
//                   {/* <h1>hello</h1> */}
//                   <div>
//                     <div id="google-maps-canvas" className="h-full">
//                       {/* <iframe
//                         className="md:h-[500px] w-full"
//                         frameborder="0"
//                         src="https://www.google.com/maps/embed/v1/place?q=uk+london,+brixton+brockwell+park&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
//                       /> */}
//                       <iframe
//                         className="md:h-[500px] w-full"
//                         frameBorder="0"
//                         src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${currentEvent.location?.coordinates?.lat},${currentEvent.location?.coordinates?.lng}&zoom=15`}
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "members" && (
//                 <div className="space-y-4">
//                   {paginatedAttendees.map((attendee, index) => (
//                     <div key={index} className="flex items-center gap-4">
//                       <img
//                         src={attendee.profilePhoto}
//                         alt={`${attendee.forename} ${attendee.lastname}`}
//                         className="w-12 h-12 rounded-full"
//                       />
//                       <div>
//                         <h3 className="font-semibold text-black">
//                           {`${attendee.forename} ${attendee.surname}`}
//                         </h3>
//                         <p className="text-gray-600">
//                           {formatDateWithSuffix(attendee.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                   <div className="flex items-center justify-center gap-2 mt-6">
//                     <button
//                       className="p-2"
//                       onClick={() =>
//                         handleModalPageChange(
//                           modalPage > 1 ? modalPage - 1 : totalModalPages
//                         )
//                       }
//                     >
//                       <BsChevronLeft />
//                     </button>
//                     <div className="flex gap-1">
//                       {Array.from({ length: totalModalPages }, (_, index) => (
//                         <div
//                           key={index}
//                           className={`w-2 h-2 rounded-full ${
//                             modalPage === index + 1
//                               ? "bg-[#540A26]"
//                               : "bg-gray-200"
//                           }`}
//                         ></div>
//                       ))}
//                     </div>
//                     <button
//                       className="p-2"
//                       onClick={() =>
//                         handleModalPageChange(
//                           modalPage < totalModalPages ? modalPage + 1 : 1
//                         )
//                       }
//                     >
//                       <BsChevronRight />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const PaymentMethodModal = ({ onClose }) => {
//   const paymentMethods = [
//     { id: "apple-pay", logo: mastercard, name: "Apple Pay" },
//     { id: "amazon-pay", logo: mastercard, name: "Amazon Pay" },
//     { id: "samsung-pay", logo: mastercard, name: "Samsung Pay" },
//     { id: "google-pay", logo: mastercard, name: "Google Pay" },
//     { id: "mastercard", logo: mastercard, name: "Mastercard" },
//     { id: "paypal", logo: mastercard, name: "PayPal" },
//     { id: "visa", logo: mastercard, name: "Visa" },
//     { id: "maestro", logo: mastercard, name: "Maestro" },
//     { id: "cirrus", logo: mastercard, name: "Cirrus" },
//   ];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
//       <div className="bg-white rounded-3xl w-full max-w-lg p-6">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-semibold">Select your Payment Method</h2>
//           <button onClick={onClose} className="text-[#540A26] font-medium">
//             Back
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-8">
//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className="bg-white rounded-lg p-4 shadow-sm border hover:border-[#540A26] cursor-pointer transition-colors"
//             >
//               <img
//                 src={method.logo}
//                 alt={method.name}
//                 className="w-full h-12 object-contain"
//               />
//             </div>
//           ))}
//         </div>

//         <button className="w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

const Events = () => {
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("scroll");

  // Payment and attend modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);
  const [showDocumentReviewModal, setShowDocumentReviewModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchNonExpiredNews());
    dispatch(fetchEvents());
    dispatch(fetchAllEventTypes());
  }, [dispatch]);

  const { events, attendingEvents } = useSelector((state) => state.events);
  const { userIdentificationApproved } = useUserIdentificationApproved();

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAudience, selectedCountry, selectedCity, selectedDate]);

  const isUserAttending = (eventId) =>
    attendingEvents.some((event) => event._id === eventId);

  const handleAttendEvent = (event, e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Event clicked:", event);
    console.log("is user attending:", isUserAttending(event._id));

    if (!userIdentificationApproved) {
      console.log("Approved? ", userIdentificationApproved);
      setShowDocumentReviewModal(true);
      return;
    }
    if (event.audienceType !== "all") {
      if (isUserAttending(event._id)) {
        toast.info("You are already registered for this event");
        return;
      }
    }

    if (event.audienceType === "all" || event.audienceType === "open") {
      // Show ticket selection modal for events with multiple ticket options
      setSelectedEvent(event);
      setShowTicketModal(true);
    } else {
      // Direct payment for restricted events
      const newPaymentData = {
        eventId: event._id,
        ticketCount: 1,
        amount: event.price * 1,
        type: `Event - ${event.name} ticket purchase`,
        reason: `Ticket purchase for ${event.name}`,
      };
      setPaymentData(newPaymentData);
      setShowPaymentModal(true);
    }
  };

  const handleTicketModalClose = () => {
    setShowTicketModal(false);
    setSelectedEvent(null);
  };

  const handlePaymentSuccess = async (result) => {
    setShowPaymentModal(false);

    try {
      await dispatch(fetchAllEventTypes()).unwrap();
    } catch (error) {
      console.error("Failed to refresh attending events:", error);
    }
  };

  const filterEvents = () => {
    if (!events) return [];

    return events
      .filter((event) => {
        // Only show approved events
        if (event.status.toLowerCase() !== "approved") return false;

        // Audience filter: "members" should include both "members" and "vip"
        if (selectedAudience) {
          if (selectedAudience === "members") {
            if (
              event.audienceType !== "members" &&
              event.audienceType !== "vip"
            ) {
              return false;
            }
          } else if (event.audienceType !== selectedAudience) {
            return false;
          }
        }

        if (selectedCountry) {
          const eventCountry =
            event.location && typeof event.location === "string"
              ? event.location.split(",").pop().trim()
              : "";
          if (eventCountry !== selectedCountry) return false;
        }

        if (selectedCity) {
          let eventCity = "";
          if (event.location && typeof event.location === "string") {
            // Search backwards for a part without digits
            const parts = event.location.split(",");
            for (let i = parts.length - 4; i >= 0; i--) {
              const part = parts[i].trim();
              if (part && !/\d/.test(part)) {
                eventCity = part;
                break;
              }
            }
          }
          if (eventCity !== selectedCity) return false;
        }

        if (
          selectedDate === "newest" ||
          selectedDate === "oldest" ||
          selectedDate === "a-to-z" ||
          selectedDate === "z-to-a" ||
          selectedDate === "city-a-to-z" ||
          selectedDate === "city-z-to-a"
        ) {
          return true;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedDate === "newest") {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return dateB.getTime() - dateA.getTime();
        } else if (selectedDate === "oldest") {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return dateA.getTime() - dateB.getTime();
        } else if (selectedDate === "a-to-z") {
          return a.name.localeCompare(b.name);
        } else if (selectedDate === "z-to-a") {
          return b.name.localeCompare(a.name);
        } else if (selectedDate === "city-a-to-z") {
          const getCityFromLocation = (location) => {
            if (location && typeof location === "string") {
              const parts = location.split(",");
              for (let i = parts.length - 4; i >= 0; i--) {
                const part = parts[i].trim();
                if (part && !/\d/.test(part)) {
                  return part;
                }
              }
            }
            return "";
          };
          const cityA = getCityFromLocation(a.location);
          const cityB = getCityFromLocation(b.location);
          return cityA.localeCompare(cityB);
        } else if (selectedDate === "city-z-to-a") {
          const getCityFromLocation = (location) => {
            if (location && typeof location === "string") {
              const parts = location.split(",");
              for (let i = parts.length - 4; i >= 0; i--) {
                const part = parts[i].trim();
                if (part && !/\d/.test(part)) {
                  return part;
                }
              }
            }
            return "";
          };
          const cityA = getCityFromLocation(a.location);
          const cityB = getCityFromLocation(b.location);
          return cityB.localeCompare(cityA);
        }
        return 0;
      });
  };

  const getUniqueCountries = () => {
    if (!events) return [];

    const approvedEvents = events.filter(
      (event) => event.status.toLowerCase() === "approved"
    );
    const countries = approvedEvents
      .map((event) => {
        if (event.location && typeof event.location === "string") {
          // Split by comma and get the last part (country), then trim whitespace
          const parts = event.location.split(",");
          return parts[parts.length - 1].trim();
        }
        return null;
      })
      .filter(Boolean); // Remove null/empty values

    return [...new Set(countries)].sort(); // Remove duplicates and sort
  };

  const getUniqueCities = () => {
    if (!events) return [];

    const approvedEvents = events.filter(
      (event) => event.status.toLowerCase() === "approved"
    );
    const cities = approvedEvents
      .map((event) => {
        if (event.location && typeof event.location === "string") {
          const parts = event.location.split(",");
          for (let i = parts.length - 4; i >= 0; i--) {
            const part = parts[i].trim();
            if (part && !/\d/.test(part)) {
              return part;
            }
          }
        }
        return null;
      })
      .filter(Boolean);

    return [...new Set(cities)].sort();
  };

  const countries = getUniqueCountries();
  const cities = getUniqueCities();

  const filteredEvents = filterEvents();

  const eventsPerPage = 12;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleHideFilters = () => {
    setHideFilters(true);
    setTimeout(() => {
      setShowFilters(false);
      setHideFilters(false);
    }, 400);
  };

  if (userIdentificationApproved === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <AuthModal
        open={showDocumentReviewModal}
        title="Document Verification Process "
        description="Verification is ongoing before you can start using this feature"
        onClose={() => setShowDocumentReviewModal(false)}
      />
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentData={paymentData}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {showTicketModal && selectedEvent && (
        <TicketSelectionModal
          event={selectedEvent}
          onClose={handleTicketModalClose}
          setPaymentData={setPaymentData}
          setShowOneTimePaymentModal={setShowPaymentModal}
        />
      )}
      <div className={`relative text-white`}>
        <div className="absolute inset-0 z-0">
          <img
            src={headerBg}
            alt="background"
            className="w-full h-full md:min-h-full min-h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black/50 md:min-h-full min-h-screen" />
        </div>

        <div className="relative z-10 pb-20">
          <Header />
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-28 relative">
                <button
                  onClick={() =>
                    showFilters ? handleHideFilters() : setShowFilters(true)
                  }
                  className="md:hidden w-auto bg-transparent border border-gray-400 text-white py-2 px-4 rounded-lg mb-2 flex flex-col items-center justify-center"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Mobile Modal */}
                {showFilters && (
                  <div
                    className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-[270px] max-w-[90vw] bg-white rounded-lg p-3 shadow-lg z-50 mt-2"
                    style={{
                      animation: hideFilters
                        ? "slideOutToTop 0.6s ease-in"
                        : "slideInFromTop 0.6s ease-out",
                      animationFillMode: "both",
                    }}
                  >
                    <style jsx>{`
                      @keyframes slideInFromTop {
                        from {
                          opacity: 0;
                          transform: translateX(-50%) translateY(-100vh);
                        }
                        to {
                          opacity: 1;
                          transform: translateX(-50%) translateY(0);
                        }
                      }

                      @keyframes slideOutToTop {
                        from {
                          opacity: 1;
                          transform: translateX(-50%) translateY(0);
                        }
                        to {
                          opacity: 0;
                          transform: translateX(-50%) translateY(-100vh);
                        }
                      }
                    `}</style>
                    <div className="w-full max-h-[70vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-black">
                          Filters
                        </h3>
                        <button
                          onClick={handleHideFilters}
                          className="text-gray-500 hover:text-gray-700 text-xl"
                        >
                          ×
                        </button>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="relative w-full">
                          <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none text-gray-700"
                            value={selectedAudience}
                            onChange={(e) =>
                              setSelectedAudience(e.target.value)
                            }
                          >
                            <option value="" className="text-black">
                              Audience
                            </option>
                            <option value="vip" className="text-black">
                              Vip Members
                            </option>
                            <option value="members" className="text-black">
                              All Members
                            </option>
                            <option value="all" className="text-black">
                              Public
                            </option>
                          </select>
                        </div>

                        <div className="relative w-full">
                          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none text-gray-700"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                          >
                            <option value="" className="text-black">
                              All Countries
                            </option>
                            {countries.map((country) => (
                              <option
                                key={country}
                                value={country}
                                className="text-black"
                              >
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="relative w-full">
                          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none text-gray-700"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                          >
                            <option value="" className="text-black">
                              All Cities
                            </option>
                            {cities.map((city) => (
                              <option
                                key={city}
                                value={city}
                                className="text-black"
                              >
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="relative w-full">
                          <BsCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <select
                            className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none text-gray-700"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          >
                            <option value="" className="text-black">
                              Sort By
                            </option>
                            <option value="newest" className="text-black">
                              Newest to Oldest
                            </option>
                            <option value="oldest" className="text-black">
                              Oldest to Newest
                            </option>
                            <option value="a-to-z" className="text-black">
                              Name: A to Z
                            </option>
                            <option value="z-to-a" className="text-black">
                              Name: Z to A
                            </option>
                            <option value="city-a-to-z" className="text-black">
                              City: A to Z
                            </option>
                            <option value="city-z-to-a" className="text-black">
                              City: Z to A
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={handleHideFilters}
                          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleHideFilters}
                          className="flex-1 bg-[#540A26] text-white py-2 px-4 rounded-lg"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop Filters */}
                <div className="hidden md:flex items-center gap-2 md:gap-4 w-full">
                  <div className="relative w-full">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                    >
                      <option value="" className="text-black">
                        Audience
                      </option>
                      <option value="vip" className="text-black">
                        Vip Members
                      </option>
                      <option value="members" className="text-black">
                        All Members
                      </option>
                      <option value="all" className="text-black">
                        Public
                      </option>
                    </select>
                  </div>

                  <div className="relative w-full">
                    <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="" className="text-black">
                        All Countries
                      </option>
                      {countries.map((country) => (
                        <option
                          key={country}
                          value={country}
                          className="text-black"
                        >
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full">
                    <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="" className="text-black">
                        All Cities
                      </option>
                      {cities.map((city) => (
                        <option key={city} value={city} className="text-black">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full">
                    <BsCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="" className="text-black">
                        Sort By
                      </option>
                      <option value="newest" className="text-black">
                        Newest to Oldest
                      </option>
                      <option value="oldest" className="text-black">
                        Oldest to Newest
                      </option>
                      <option value="a-to-z" className="text-black">
                        Name: A to Z
                      </option>
                      <option value="z-to-a" className="text-black">
                        Name: Z to A
                      </option>
                      <option value="city-a-to-z" className="text-black">
                        City: A to Z
                      </option>
                      <option value="city-z-to-a" className="text-black">
                        City: Z to A
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-2 mt-8">
            {viewMode === "scroll" ? (
              <div className="w-full flex justify-center">
                <div className="overflow-x-auto scrollbar-hide">
                  <div
                    className="flex justify-center space-x-6 pb-4"
                    style={{ width: "max-content" }}
                  >
                    {filteredEvents.slice(0, 8).map((event, index) => (
                      <div
                        key={index}
                        className="rounded-2xl overflow-hidden bg-black relative group cursor-pointer flex-shrink-0 w-[300px] h-[427px]"
                      >
                        <Link to={`/events/${event._id}`}>
                          <img
                            src={event.images[0]}
                            alt={event.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-xl font-semibold mb-2">
                              {event.name}
                            </h3>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-lg font-bold text-white">
                                £{event.price}
                              </span>
                              <div className="inline-block px-3 py-1 rounded-full border border-white text-white text-xs">
                                {event.audienceType === "members"
                                  ? "Members Only"
                                  : event.audienceType === "vip"
                                  ? "VIP Only"
                                  : "Open to All"}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 mb-3 text-sm">
                              <span>{formatDateWithSuffix(event.time)}</span>
                              <span>{formatTime(event.time)}</span>
                            </div>
                            {isUserAttending(event._id) &&
                            event.audienceType !== "all" ? (
                              <button
                                disabled
                                className="w-full py-1 px-8 bg-gray-400 text-white rounded-xl text-lg font-medium cursor-not-allowed"
                              >
                                Registered
                              </button>
                            ) : (
                              <button
                                onClick={(e) => handleAttendEvent(event, e)}
                                className="w-full py-2 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-medium hover:opacity-90 "
                              >
                                Attend
                              </button>
                            )}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center max-w-7xl mx-auto px-4">
                    {paginatedEvents.map((event, index) => (
                      <div
                        key={index}
                        className="rounded-2xl overflow-hidden bg-black relative group cursor-pointer w-full min-w-[300px] max-w-[350px] h-[427px]"
                      >
                        <Link to={`/events/${event._id}`}>
                          <img
                            src={event.images[0]}
                            alt={event.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </Link>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <Link to={`/events/${event._id}`}>
                            <h3 className="text-xl font-semibold mb-2">
                              {event.name}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-bold text-white">
                              £{event.price}
                            </span>
                            <div className="inline-block px-3 py-1 rounded-full border border-white text-white text-xs">
                              {event.audienceType === "members"
                                ? "Members Only"
                                : event.audienceType === "vip"
                                ? "VIP Only"
                                : "Open to All"}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mb-3 text-sm">
                            <span>{formatDateWithSuffix(event.time)}</span>
                            <span>{formatTime(event.time)}</span>
                          </div>
                          {isUserAttending(event._id) &&
                          event.audienceType !== "all" ? (
                            <button
                              disabled
                              className="w-full py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                            >
                              Registered
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handleAttendEvent(event, e)}
                              className="w-full py-2 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                              Attend
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex justify-center items-center">
                  <div className="flex justify-center ml-10 items-center space-x-2 mt-8">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          currentPage === index + 1
                            ? "bg-[#540A26]"
                            : "bg-gray-400"
                        } flex items-center justify-center`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {/* {index + 1} */}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full flex justify-center items-center">
                  <div className="flex justify-center ml-10 items-center space-x-2 mt-8">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          currentPage === index + 1
                            ? "bg-[#540A26]"
                            : "bg-gray-400"
                        } flex items-center justify-center`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {/* {index + 1} */}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="my-12 flex md:justify-end justify-between items-center gap-4">
              <button
                onClick={() => navigate("/homepage")}
                className="text-white md:hidden flex gap-2 items-center border p-2 px-3 rounded-lg border-gray-400 hover:text-white transition-colors text-sm"
              >
                Go Back
              </button>
              <button
                onClick={() =>
                  setViewMode(viewMode === "scroll" ? "grid" : "scroll")
                }
                className="text-white flex gap-2 items-center border p-2 px-3 rounded-lg border-gray-400 hover:text-white transition-colors text-sm"
              >
                {viewMode === "scroll" ? "View All" : "Scroll View"}
              </button>
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

export default Events;
