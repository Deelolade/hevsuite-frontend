import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import headerBg from "../../assets/header-bg.jpg";
import event from "../../assets/event.png";
import party from "../../assets/party2.jpg";
import Footer from "../../components/Footer";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime, MdLocationOn, MdPerson } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "./forced.css";
import EventDetailsModal from "../account/events/EventDetails";
import { fetchNonExpiredNews, setSelectedNews } from "../../features/newsSlice";
import { fetchAllEventTypes, fetchEvents } from "../../features/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDateWithSuffix, formatTime } from "../../utils/formatDate";
import useUserMembership from "../../hooks/useUserMembership";
import toast from "react-hot-toast";
import PaymentModal from "../../components/PaymentModal";

const Homepage = () => {
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hideFilters, setHideFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const swiperRef = useRef(null);

  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);
  const { Settings } = useSelector((s) => s.generalSettings);

  useUserMembership();

  useEffect(() => {
    dispatch(fetchNonExpiredNews());
    dispatch(fetchEvents());
  }, [dispatch]);

  const { newsItems, loading, error } = useSelector((state) => state.news);
  const {
    events,
    attendingEvents,
    loading: eventsLoading,
    error: eventsError,
  } = useSelector((state) => state.events);
  const navigate = useNavigate();

  const isUserAttending = (eventId) =>
    attendingEvents.some((event) => event._id === eventId);

  const handleAttendEvent = (event, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user.isRestricted) {
      toast.error("You are restricted from attending events");
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
            for (let i = parts.length - 2; i >= 0; i--) {
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
              for (let i = parts.length - 2; i >= 0; i--) {
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
              for (let i = parts.length - 2; i >= 0; i--) {
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
          for (let i = parts.length - 2; i >= 0; i--) {
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

  useEffect(() => {
    if (
      filteredEvents.length > 0 &&
      swiperRef.current &&
      swiperRef.current.swiper
    ) {
      const centerIdx = Math.floor(filteredEvents.length / 2);
      swiperRef.current.swiper.slideToLoop(centerIdx, 0);
    }
  }, [filteredEvents.length]);

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

  const handleHideFilters = () => {
    setHideFilters(true);
    setTimeout(() => {
      setShowFilters(false);
      setHideFilters(false);
    }, 400);
  };

  // Add CSS for the slide-in animation
  const styles = `
  @keyframes slideInFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }`;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  return (
    <div className="min-h-screen h-full">
      {/* Header */}
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
      <header className="relative text-white min-h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src={headerBg}
            alt="background"
            className={`w-full ${
              showFilters ? "h-[120vh]" : "h-[110vh]"
            } object-cover`}
          />
          <div
            className={`absolute inset-0 bg-black/50 ${
              showFilters ? "h-[120vh]" : "h-[110vh]"
            }`}
          />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Filters */}
            <div className=" flex flex-col md:flex-row items-center gap-4 justify-center">
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

            {/* Event Slider */}
            <div className="relative py-8">
              {/* Mobile Slider */}

              {/* Desktop Slider */}
              <div className="relative flex flex-col items-center">
                <div className="flex items-center md:-ml-10 flex-row absolute -bottom-20  justify-center gap-32 mb-4">
                  <button className="custom-prev scale-150  p-2 z-30 rounded-full hover:bg-black/70 transition-colors">
                    ←
                  </button>
                  <button className="custom-next z-30 scale-150  p-2 rounded-full  hover:bg-black/50 transition-colors">
                    →
                  </button>
                  <div className="swiper-pagination text-white"></div>
                </div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  slidesPerView={3}
                  breakpoints={{
                    1024: { slidesPerView: 3 },
                    768: { slidesPerView: 2.2 },
                    640: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                  }}
                  spaceBetween={8}
                  pagination={{
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                    clickable: true,
                    renderBullet: (index, className) =>
                      `<span class="${className} w-3 h-3 bg-red-500 rounded-full mx-1"></span>`,
                  }}
                  centeredSlides={true}
                  loop={true}
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                  initialSlide={Math.floor(filteredEvents.length / 2)}
                  ref={swiperRef}
                  onInit={(swiper) => {
                    setTimeout(() => {
                      swiper.params.navigation.prevEl = ".custom-prev";
                      swiper.params.navigation.nextEl = ".custom-next";
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }, 0);
                    const centerIdx = Math.floor(filteredEvents.length / 2);
                    swiper.slideToLoop(centerIdx, 0);
                  }}
                  className="w-full max-w-6xl mx-auto !flex !items-center !justify-center min-h-[400px] md:min-h-[420px] lg:min-h-[480px]"
                >
                  {eventsLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <span className="text-lg text-white">
                        Loading events...
                      </span>
                    </div>
                  ) : eventsError ? (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <span className="text-lg text-red-50">
                        Failed to load events. Please try again.
                      </span>
                    </div>
                  ) : filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event, idx) => (
                      <SwiperSlide key={event._id}>
                        {({ isActive }) => {
                          const isCenter = isActive;
                          return (
                            <div
                              key={idx}
                              className={`
                                rounded-2xl overflow-hidden bg-black relative group cursor-pointer flex-shrink-0 mx-auto
                                transition-all duration-500 ease-in-out
                                ${
                                  isCenter
                                    ? "md:w-[320px] md:h-[400px] w-[260px] h-[360px] md:scale-110 z-30"
                                    : "w-[260px] h-[360px] scale-90 opacity-90"
                                }
                              `}
                            >
                              <Link to={`/events/${event._id}`}>
                                <img
                                  src={event.images[0]}
                                  alt={event.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {/* Spotlight overlay for center card */}
                                {isCenter && (
                                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none"></div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                  <h3
                                    className={`font-semibold mb-2 transition-all duration-300 ${
                                      isCenter
                                        ? "text-xl text-white"
                                        : "text-base text-gray-200"
                                    }`}
                                  >
                                    {event.name}
                                  </h3>
                                  <div className="flex items-center justify-between mb-2">
                                    <span
                                      className={`font-bold transition-all duration-300 ${
                                        isCenter
                                          ? "text-xl text-white"
                                          : "text-sm text-gray-300"
                                      }`}
                                    >
                                      £{event.price}
                                    </span>
                                    <div
                                      className={`inline-block px-2 py-1 rounded-full border border-white text-white transition-all duration-300 ${
                                        isCenter ? "text-xs" : "text-[10px]"
                                      }`}
                                    >
                                      {event.audienceType === "members"
                                        ? "Members Only"
                                        : event.audienceType === "vip"
                                        ? "VIP Only"
                                        : "Open to All"}
                                    </div>
                                  </div>
                                  <div
                                    className={`flex items-center space-x-4 mb-3 transition-all duration-300 ${
                                      isCenter
                                        ? "text-sm text-gray-200"
                                        : "text-xs text-gray-400"
                                    }`}
                                  >
                                    <span>
                                      {formatDateWithSuffix(event.time)}
                                    </span>
                                    <span>{formatTime(event.time)}</span>
                                  </div>
                                  {isUserAttending(event._id) &&
                                  event.audienceType !== "all" ? (
                                    <button
                                      disabled
                                      className={`w-full bg-gray-400 text-white rounded-xl font-medium cursor-not-allowed transition-all duration-300 ${
                                        isCenter
                                          ? "py-2 text-base"
                                          : "py-1 text-sm"
                                      }`}
                                    >
                                      Registered
                                    </button>
                                  ) : (
                                    <button
                                      onClick={(e) =>
                                        handleAttendEvent(event, e)
                                      }
                                      className={`w-full bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 ${
                                        isCenter
                                          ? "py-2 text-base shadow-lg"
                                          : "py-1 text-sm"
                                      }`}
                                    >
                                      Attend
                                    </button>
                                  )}
                                </div>
                              </Link>
                            </div>
                          );
                        }}
                      </SwiperSlide>
                    ))
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <span className="text-lg text-white">
                        {selectedCountry ||
                        selectedCity ||
                        selectedAudience ||
                        selectedDate
                          ? "No events match your filters"
                          : "No events available"}
                      </span>
                    </div>
                  )}
                </Swiper>
              </div>
              {events?.length > 0 && (
                <div className="text-center md:text-right mt-20 md:mt-4 px-4">
                  <Link
                    to="/events"
                    className="text-white border p-2 px-4 rounded-lg border-gray-400 hover:text-white transition-colors text-sm"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Newsroom */}
      {newsItems.length > 0 && (
        <section className="py-8 mt-32 md:mt-8 md:py-16">
          <div className="container mx-auto px-4 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-secondary text-gradient_r">
              Newsroom
            </h2>
            {loading ? (
              <p className="text-center text-lg text-gray-600">
                Loading news...
              </p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : newsItems.length === 0 ? (
              <p className="text-center text-gray-500">No news available.</p>
            ) : (
              <div className="md:w-full md:overflow-hidden overflow-auto md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 md:gap-6">
                {newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative cursor-pointer group"
                    onClick={() => {
                      dispatch(setSelectedNews(item));
                      navigate(`/news-detail/${item._id}`);
                    }}
                  >
                    {/* This is the parent div of the image */}
                    <div className="relative md:w-full w-60 h-80 md:h-80 rounded-2xl overflow-hidden flex justify-center items-center">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        // The image itself gets fixed width on mobile, and full width on larger screens
                        className="w-60 md:w-full h-full object-cover bg-cover bg-center bg-current rounded-2xl"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black text-white">
                        <h3 className="text-lg md:text-xl font-semibold">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between gap-5 mt-2 text-xs md:text-sm">
                          <div className="flex items-center gap-2">
                            <BsCalendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{formatDateWithSuffix(item.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdAccessTime className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{formatTime(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {newsItems.length > 0 && (
              <div className="text-center mt-6 md:mt-8">
                <button
                  onClick={() => navigate("/news")}
                  className="px-6 py-3 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-secondary text-lg hover:opacity-90 transition-opacity duration-200 md:px-8 md:py-3 md:text-xl"
                >
                  View All
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          eventType={"Home"}
          events={events}
          onClose={() => setSelectedEvent(null)}
        />
      ) */}
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

  const incrementTickets = () => {
    setTicketCount(ticketCount + 1);
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

export default Homepage;
