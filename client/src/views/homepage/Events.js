import React, { useEffect, useState } from 'react';
import headerBg from '../../assets/header-bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {
  BsBell,
  BsChevronLeft,
  BsChevronRight,
  BsCalendar,
  BsHeart,
} from 'react-icons/bs';
import { MdAccessTime, MdPerson } from 'react-icons/md';
import Header from '../../components/Header';
import event from '../../assets/event.png';
import party from '../../assets/party2.jpg';
import Footer from '../../components/Footer';
import avatar from '../../assets/user.avif';
import mastercard from '../../assets/Mastercard.png';
import { IoLocationOutline } from 'react-icons/io5';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchNonExpiredNews } from '../../features/newsSlice';
import { fetchAttendingMembers, fetchEvents } from '../../features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateWithSuffix, formatTime } from '../../utils/formatDate';

const EventDetailsModal = ({ event, onClose, eventType, events }) => {

  const dispatch = useDispatch();

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
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm  active:text-red-500 flex items-center justify-center">
                  <BsHeart className="text-white text-xl transition-all duration-300 active:text-red-500" />
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
                  // onClick={() => setShowPaymentModal(true)}
                  className="w-full opacity-0 py-4 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-xl text-lg font-medium"
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
const PaymentMethodModal = ({ onClose }) => {
  const paymentMethods = [
    { id: 'apple-pay', logo: mastercard, name: 'Apple Pay' },
    { id: 'amazon-pay', logo: mastercard, name: 'Amazon Pay' },
    { id: 'samsung-pay', logo: mastercard, name: 'Samsung Pay' },
    { id: 'google-pay', logo: mastercard, name: 'Google Pay' },
    { id: 'mastercard', logo: mastercard, name: 'Mastercard' },
    { id: 'paypal', logo: mastercard, name: 'PayPal' },
    { id: 'visa', logo: mastercard, name: 'Visa' },
    { id: 'maestro', logo: mastercard, name: 'Maestro' },
    { id: 'cirrus', logo: mastercard, name: 'Cirrus' },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
      <div className='bg-white rounded-3xl w-full max-w-lg p-6'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-semibold'>Select your Payment Method</h2>
          <button onClick={onClose} className='text-[#540A26] font-medium'>
            Back
          </button>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-8'>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className='bg-white rounded-lg p-4 shadow-sm border hover:border-[#540A26] cursor-pointer transition-colors'
            >
              <img
                src={method.logo}
                alt={method.name}
                className='w-full h-12 object-contain'
              />
            </div>
          ))}
        </div>

        <button className='w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity'>
          Next
        </button>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

    const [activeSlide, setActiveSlide] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(fetchNonExpiredNews());
      dispatch(fetchEvents());
    }, [dispatch]);
    const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.events);

  // Add this function to filter events by date
  const filterEvents = () => {
    if (!events) return [];

    return events.filter(event => {
      // Audience filter
      if (selectedAudience && event.audienceType !== selectedAudience) return false;

      // Country filter
      if (selectedCountry && event.country !== selectedCountry) return false;

      // City filter
      if (selectedCity && event.city !== selectedCity) return false;

      // Date filter (newest to oldest or oldest to newest)
      if (selectedDate === 'newest') {
        return true; // Actual sorting will be done after filtering
      } else if (selectedDate === 'oldest') {
        return true; // Actual sorting will be done after filtering
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
    
      if (selectedDate === 'newest') {
        return dateB.getTime() - dateA.getTime();
      } else if (selectedDate === 'oldest') {
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });
  };

  // Get filtered events
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

  return (
    <div className='min-h-screen'>
      <div className='relative text-white'>
        <div className='absolute inset-0 z-0'>
          <img
            src={headerBg}
            alt='background'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50' />
        </div>
        <div className='relative z-10'>
          <Header />

          {/* Filters */}
          <div className='relative px-6 py-4 flex flex-col md:flex-row items-center justify-center md:space-x-4'>
            <div className='absolute bottom-4 left-5 w-full md:w-auto mt-2 md:mt-24'>
              <Link
                to='/homepage'
                className='text-white flex gap-4 items-center border mt-4 p-2 px-3 rounded-lg border-gray-400 hover:text-white transition-colors text-sm'
              >
                <FaArrowLeft />
                <span>Go to home</span>
              </Link>
            </div>

            <div className='relative w-full md:w-auto mt-2 md:mt-24'>
              <MdPerson className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <select
                className='w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none'
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
              >
                <option value='' className='text-black'>
                  Audience
                </option>
                <option value='members' className='text-black'>
                  For Members
                </option>
                <option value='public' className='text-black'>
                  Public Event
                </option>
                <option value='vip' className='text-black'>
                  Vip Members
                </option>
              </select>
            </div>

            <div className='relative w-full md:w-auto mt-2 md:mt-24'>
              <IoLocationOutline className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <select
                className='w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none'
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value='' className='text-black'>
                  Country
                </option>
                <option value='ethiopia' className='text-black'>
                  Ethiopia
                </option>
                <option value='kenya' className='text-black'>
                  Kenya
                </option>
              </select>
            </div>

            <div className='relative w-full md:w-auto mt-2 md:mt-24'>
              <IoLocationOutline className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <select
                className='w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none'
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value='' className='text-black'>
                  City
                </option>
                <option value='addis' className='text-black'>
                  Addis Ababa
                </option>
                <option value='nairobi' className='text-black'>
                  Nairobi
                </option>
              </select>
            </div>

            <div className='relative w-full md:w-auto mt-2 md:mt-24'>
              <BsCalendar className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <select
                className='w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value='' className='text-black'>
                  Date
                </option>
                <option value='newest' className='text-black'>
                  Newest to Oldest
                </option>
                <option value='oldest' className='text-black'>
                  Oldest to Newest
                </option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className='px-6 py-2 mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {paginatedEvents.map((event, index) => (
                <div
                  key={index}
                  className='rounded-2xl overflow-hidden  bg-black relative group cursor-pointer'
                  onClick={() => setSelectedEvent(event)}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className='w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110'
                  />
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <h3 className='text-xl font-semibold'>{event.name}</h3>
                    <div className='flex items-center space-x-4 mt-2'>
                      <span>{formatDateWithSuffix(event.time)}</span>
                      <span>{formatTime(event.time)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className='w-full flex justify-center items-center'>
              <div className='flex justify-center ml-10 items-center space-x-2 mt-8'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentPage === index + 1 ? 'bg-[#540A26]' : 'bg-gray-400'
                    } flex items-center justify-center`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {/* {index + 1} */}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {selectedEvent && (
            <EventDetailsModal
              event={selectedEvent}
              events={events}
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
