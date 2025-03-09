import React, { useState } from "react";
import headerBg from "../../assets/header-bg.jpg";
import { Link } from "react-router-dom";
import {
  BsBell,
  BsChevronLeft,
  BsChevronRight,
  BsCalendar,
  BsHeart,
} from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import Header from "../../components/Header";
import event from "../../assets/event.png";
import Footer from "../../components/Footer";
import avatar from "../../assets/user.avif";
import mastercard from "../../assets/Mastercard.png";

const EventDetailsModal = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalPage, setModalPage] = useState(1);

  const attendees = [
    { name: "Anna Ivanovic", date: "2nd Dec., 2025", image: avatar },
    { name: "Benson Jackson", date: "2nd Dec., 2025", image: avatar },
    { name: "Beryl Ama", date: "2nd Dec., 2025", image: avatar },
    { name: "Jack Phil", date: "2nd Dec., 2025", image: avatar },
    { name: "Matt Hardy", date: "2nd Dec., 2025", image: avatar },
    { name: "Michael Jackinson", date: "2nd Dec., 2025", image: avatar },
  ];

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full md:w-[80vw] max-w-7xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-5/12 relative bg-black">
            <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
              <BsChevronLeft
                size={20}
                className="cursor-pointer"
                onClick={onClose}
              />
              <span>Invited Events</span>
            </div>
            <div className="relative h-full md:h-auto overflow-y-auto">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute -mt-10 inset-0 flex items-center justify-between px-6">
                <button className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <BsChevronLeft className="text-white text-xl" />
                </button>
                <button className="w-12 cursor-pointer z-50 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <BsChevronRight className="text-white text-xl" />
                </button>
              </div>
              <div className="absolute top-6 right-6">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm  active:text-red-500 flex items-center justify-center">
                  <BsHeart className="text-white text-xl transition-all duration-300 active:text-red-500" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                <div className="text-5xl font-bold text-white mb-4">50£</div>
                <div className="inline-block px-4 py-1.5 rounded-full border-2 border-gradient_r text-white mb-6">
                  Members Only
                </div>
                <div className="flex items-center gap-6 text-white mb-4">
                  <div className="flex items-center gap-2">
                    <BsCalendar />
                    <span>2nd January, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdAccessTime />
                    <span>10:00pm</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-6">
                  Note: You can only buy one ticket
                </p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
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
                  className={`px-8 py-4 ${
                    activeTab === "description"
                      ? "bg-[#540A26] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Event Description
                </button>
                <button
                  className={`px-8 py-4 ${
                    activeTab === "location"
                      ? "bg-[#540A26] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setActiveTab("location")}
                >
                  Location
                </button>
                <button
                  className={`px-8 py-4 ${
                    activeTab === "members"
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
                    Board Members Meeting
                  </h2>
                  <h3 className="text-xl mb-4 text-black font-primary font-semibold">
                    The Party of the Year! 🎵
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get ready to let loose, dance, and create unforgettable
                    memories, a night filled with excitement, laughter, and good
                    vibes! Whether you're here to groove on the dance floor,
                    enjoy delicious food and drinks, or just soak in the party
                    atmosphere, we've got it all covered.
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
                  <h1>hello</h1>
                </div>
              )}

              {activeTab === "members" && (
                <div className="space-y-4">
                  {paginatedAttendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={attendee.image}
                        alt={attendee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-black">
                          {attendee.name}
                        </h3>
                        <p className="text-gray-600">{attendee.date}</p>
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
                          className={`w-2 h-2 rounded-full ${
                            modalPage === index + 1
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

const PaymentMethodModal = ({ onClose }) => {
  const paymentMethods = [
    { id: "apple-pay", logo: mastercard, name: "Apple Pay" },
    { id: "amazon-pay", logo: mastercard, name: "Amazon Pay" },
    { id: "samsung-pay", logo: mastercard, name: "Samsung Pay" },
    { id: "google-pay", logo: mastercard, name: "Google Pay" },
    { id: "mastercard", logo: mastercard, name: "Mastercard" },
    { id: "paypal", logo: mastercard, name: "PayPal" },
    { id: "visa", logo: mastercard, name: "Visa" },
    { id: "maestro", logo: mastercard, name: "Maestro" },
    { id: "cirrus", logo: mastercard, name: "Cirrus" },
  ];

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
              className="bg-white rounded-lg p-4 shadow-sm border hover:border-[#540A26] cursor-pointer transition-colors"
            >
              <img
                src={method.logo}
                alt={method.name}
                className="w-full h-12 object-contain"
              />
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
          Next
        </button>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const events = Array(17).fill({
    title: "The Bout for Lions",
    date: "2nd January, 2025",
    time: "10:00pm",
    image: event,
  });

  const eventsPerPage = 12;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="min-h-screen">
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={headerBg}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />

          {/* Filters */}
          <div className="px-6 py-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="md:mt-44 mt-20" />
            <select
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 w-full md:w-auto mt-20"
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
            >
              <option value="">Audience</option>
              <option value="members">For Members</option>
              <option value="public">Public Event</option>
              <option value="vip">Vip Members</option>
            </select>

            <select
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 w-full md:w-auto mt-24"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Country</option>
              <option value="">Ethiopia</option>
            </select>

            <select
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 w-full md:w-auto "
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">City</option>
              <option value="">Addis Ababa</option>
            </select>

            <select
              className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 w-full md:w-auto "
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Date</option>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>

          {/* Events Grid */}
          <div className="px-6 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedEvents.map((event, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden relative group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="w-full flex justify-between items-center">
              <div className="h-2 w-2" />
              <div className="flex justify-center ml-10 items-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentPage === index + 1 ? "bg-[#540A26]" : "bg-gray-400"
                    } flex items-center justify-center`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {/* {index + 1} */}
                  </button>
                ))}
              </div>
              <Link
                to="/homepage"
                className="text-white border mt-4 p-2 px-4 rounded-lg border-gray-400 hover:text-white transition-colors text-sm"
              >
                Exit View
              </Link>
            </div>
          </div>
          {selectedEvent && (
            <EventDetailsModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
