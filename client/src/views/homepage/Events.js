import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsBell, BsChevronLeft, BsChevronRight } from "react-icons/bs";
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const EventDetailsModal = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const attendees = [
    {
      name: "Anna Ivanovic",
      date: "2nd Dec., 2025",
      image: "/path-to-image1.jpg",
    },
    {
      name: "Benson Jackson",
      date: "2nd Dec., 2025",
      image: "/path-to-image2.jpg",
    },
    { name: "Beryl Ama", date: "2nd Dec., 2025", image: "/path-to-image3.jpg" },
    { name: "Jack Phil", date: "2nd Dec., 2025", image: "/path-to-image4.jpg" },
    {
      name: "Matt Hardy",
      date: "2nd Dec., 2025",
      image: "/path-to-image5.jpg",
    },
    {
      name: "Michael Jackinson",
      date: "2nd Dec., 2025",
      image: "/path-to-image6.jpg",
    },
  ];

  const mapCenter = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-7xl overflow-hidden">
        <div className="flex">
          {/* Left side - Image */}
          <div className="w-5/12 relative bg-black">
            <Link
              to="/invited-events"
              className="absolute top-4 left-4 text-white flex items-center gap-2 z-10"
            >
              <BsChevronLeft />
              <span>Invited Events</span>
            </Link>
            <div className="relative h-full">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  className="bg-white/20 rounded-full p-2"
                  onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                >
                  <BsChevronLeft className="text-white" />
                </button>
                <button
                  className="bg-white/20 rounded-full p-2"
                  onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                >
                  <BsChevronRight className="text-white" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black">
                <div className="text-4xl font-bold text-white mb-2">50£</div>
                <div className="inline-block px-4 py-1 rounded-full border border-[#540A26] text-white mb-4">
                  Members Only
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">2nd January, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">10:00pm</span>
                  </div>
                </div>
                <p className="text-white/70 mt-2">
                  Note: You can only buy one ticket
                </p>
                <button
                  className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg mt-4"
                  onClick={() => setShowPaymentModal(true)}
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
          <div className="w-7/12">
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
                  <h2 className="text-3xl font-bold mb-4">
                    Board Members Meeting
                  </h2>
                  <h3 className="text-xl mb-4">The Party of the Year! 🎵</h3>
                  <p className="text-gray-600 mb-6">
                    Get ready to let loose, dance, and create unforgettable
                    memories, a night filled with excitement, laughter, and good
                    vibes! Whether you're here to groove on the dance floor,
                    enjoy delicious food and drinks, or just soak in the party
                    atmosphere, we've got it all covered.
                  </p>
                  <h3 className="text-xl font-semibold mb-4">
                    🎵 What to Expect
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      • Live DJ or Band spinning your favorite hits all night
                      long!
                    </li>
                    <li>
                      • Delicious Food & Drinks to keep you energized and in the
                      party mood.
                    </li>
                    <li>
                      • Fun Activities & Surprises that will make this night
                      unforgettable.
                    </li>
                    <li>• Photo Booth to capture all your favorite moments.</li>
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
                  {attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={attendee.image}
                        alt={attendee.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">{attendee.name}</h3>
                        <p className="text-gray-600">{attendee.date}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center gap-2 mt-6">
                    <button className="p-2">
                      <BsChevronLeft />
                    </button>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#540A26]"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    </div>
                    <button className="p-2">
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
    { id: "apple-pay", logo: "/images/apple-pay.png", name: "Apple Pay" },
    { id: "amazon-pay", logo: "/images/amazon-pay.png", name: "Amazon Pay" },
    { id: "samsung-pay", logo: "/images/samsung-pay.png", name: "Samsung Pay" },
    { id: "google-pay", logo: "/images/google-pay.png", name: "Google Pay" },
    { id: "mastercard", logo: "/images/mastercard.png", name: "Mastercard" },
    { id: "paypal", logo: "/images/paypal.png", name: "PayPal" },
    { id: "visa", logo: "/images/visa.png", name: "Visa" },
    { id: "maestro", logo: "/images/maestro.png", name: "Maestro" },
    { id: "cirrus", logo: "/images/cirrus.png", name: "Cirrus" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
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

  const events = Array(12).fill({
    title: "The Bout for Lions",
    date: "2nd January, 2025",
    time: "10:00pm",
    image: "/images/event-image.jpg",
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold">
          h
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/help-centre">Help centre</Link>
          <Link to="/ask">Ask</Link>
          <div className="relative">
            <BsBell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span>Goodluck</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-6 py-4 flex items-center space-x-4">
        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
        >
          <option value="">Audience</option>
          {/* Add options */}
        </select>

        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Country</option>
          {/* Add options */}
        </select>

        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">City</option>
          {/* Add options */}
        </select>

        <div className="ml-auto">
          <select
            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Date</option>
            {/* Add options */}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {events.map((event, index) => (
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
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button className="w-8 h-8 rounded-full bg-[#540A26] flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
            2
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
            3
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
            4
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
            5
          </button>
        </div>
      </div>
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Follow us</span>
            <Link to="#" className="text-gray-400">
              Facebook
            </Link>
            <Link to="#" className="text-gray-400">
              Twitter
            </Link>
            <Link to="#" className="text-gray-400">
              Instagram
            </Link>
            <Link to="#" className="text-gray-400">
              LinkedIn
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link to="/policies" className="text-gray-400">
              Policies
            </Link>
            <Link to="/about" className="text-gray-400">
              HH Club & Founder
            </Link>
          </div>
          <div className="text-gray-400">
            2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;
