import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import headerBg from '../../assets/header-bg.jpg';
import event from '../../assets/event.png';
import party from '../../assets/party2.jpg';
import Footer from '../../components/Footer';
import { BsCalendar } from 'react-icons/bs';
import { MdAccessTime, MdPerson } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import './forced.css';
import EventDetailsModal from '../account/events/EventDetails';
import { fetchNonExpiredNews, setSelectedNews } from '../../features/newsSlice';
import { fetchEvents } from '../../features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateWithSuffix, formatTime } from '../../utils/formatDate';
import useUserMembership from '../../hooks/useUserMembership';

const Homepage = () => {
  const [selectedAudience, setSelectedAudience] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [activeSlide, setActiveSlide] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const dispatch = useDispatch();

  const { user }  = useSelector(s => s.auth);
  const { Settings }  = useSelector(s => s.generalSettings);

  useUserMembership();

  useEffect(() => {
    dispatch(fetchNonExpiredNews());
    dispatch(fetchEvents());
  }, [dispatch]);

  const { newsItems, loading, error } = useSelector((state) => state.news);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.events);
  const navigate = useNavigate();
  // Add this function to filter events by date
  const filterEvents = () => {
    if (!events) return [];
    return events
      .filter(event => {
        if (selectedAudience && event.audienceType !== selectedAudience) return false;
        if (selectedCountry && event.country !== selectedCountry) return false;
        if (selectedCity && event.city !== selectedCity) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return selectedDate === 'newest'
          ? dateB - dateA
          : selectedDate === 'oldest'
            ? dateA - dateB
            : 0;
      });
  };

  // Get filtered events
  const filteredEvents = filterEvents();


  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };



  return (
    <div className='min-h-screen'>
      {/* Header */}
      <header className='relative text-white min-h-screen'>
        <div className='absolute inset-0 z-0'>
          <img
            src={headerBg}
            alt='background'
            className={`w-full ${showFilters ? 'h-[120vh]' : 'h-screen'
              } object-cover`}
          />
          <div
            className={`absolute inset-0 bg-black/50 ${showFilters ? 'h-[120vh]' : 'h-screen'
              }`}
          />
        </div>
        <div className='relative z-10'>
          <Header />
          <div className='max-w-[1400px] mx-auto px-4'>
            {/* Filters */}
            <div className=' flex flex-col md:flex-row items-center gap-4 justify-center'>
              <div className='w-full md:w-auto flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-28'>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='md:hidden w-auto bg-[#540A26] text-white py-2 px-4 rounded-lg mb-2'
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div
                  className={`w-full md:flex items-center gap-2 md:gap-4 ${showFilters
                    ? 'flex flex-col md:flex-row'
                    : 'hidden md:flex md:flex-row'
                    }`}
                >
                  <div className='relative w-full md:w-auto'>
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

                  <div className='relative w-full md:w-auto mt-2 md:mt-0'>
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

                  <div className='relative w-full md:w-auto mt-2 md:mt-0'>
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
                  <div className=' md:hidden relative w-full md:w-auto mt-2 md:mt-28'>
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

              </div>
              <div className='hidden md:block relative w-full md:w-auto mt-2 md:mt-28'>
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

            {/* Event Slider */}
            <div className='relative py-8'>
              {/* Mobile Slider */}

              {/* Desktop Slider */}
              <div className=' relative flex flex-col  items-center'>
                <div className='flex items-center md:-ml-10 flex-row absolute -bottom-20  justify-center gap-32 mb-4'>
                  <button className='custom-prev scale-150  p-2 z-50 rounded-full hover:bg-black/70 transition-colors'>
                    ←
                  </button>
                  <button className='custom-next z-50 scale-150  p-2 rounded-full  hover:bg-black/50 transition-colors'>
                    →
                  </button>
                  <div className='swiper-pagination text-white'></div>
                </div>
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                  slidesPerView={3}
                  breakpoints={{
                    1024: { slidesPerView: 3 },
                    768: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    0: { slidesPerView: 1 },
                  }}
                  s
                  spaceBetween={8} // Further reduced gap between slides
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: (index, className) =>
                      `<span class="${className} w-3 h-3 bg-red-500 rounded-full mx-1"></span>`,
                  }}
                  centeredSlides={true}
                  loop={true}
                  navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                  }}
                  className='w-[80%]'
                >
                  {eventsLoading ? (
                    <div className="text-center py-10">Loading events...</div>
                  ) : eventsError ? (
                    <div className="text-center text-red-500 py-10">
                      Failed to load events. Please try again.
                    </div>
                  ) : filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event, idx) => (
                      <SwiperSlide key={event.id}>
                        <div
                          onClick={() => setSelectedEvent(event)}
                          // className={`transition-all duration-300 ${
                          //   activeSlide === idx ? "scale-110 opacity-100" : "scale-90 opacity-70"
                          // }`}
                          className={`relative cursor-pointer bg-black rounded-2xl overflow-hidden transition-all duration-300 w-[300px] 
                      ${activeSlide === idx
                              ? ' opacity-100 md:h-[400px]  h-[400px]'
                              : ' opacity-70 scale-90 md:h-[400px] h-[400px]'
                            }`}
                        >
                          <img
                            src={event.images[0]}
                            alt={event.name}
                            className='w-full h-full  object-cover bg-cover bg-center '
                          />
                          <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gradient_r via-gradient_r to-gradient_r/30'>
                            <h3 className='text-xl font-semibold'>
                              {event.name}
                            </h3>
                            <div className='flex items-center gap-4 mt-2 text-sm'>
                              <div className='flex items-center gap-1'>
                                <BsCalendar className='w-4 h-4' />
                                <span>{formatDateWithSuffix(event.time)}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <MdAccessTime className='w-4 h-4' />
                                <span>{formatTime(event.time)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))) : (
                    <div className="text-center py-10">
                      {selectedCountry || selectedCity || selectedAudience || selectedDate
                        ? "No events match your filters"
                        : "No events available"}
                    </div>
                  )}
                </Swiper>
              </div>
              {events?.length > 0 && (

                <div className='text-center md:text-right mt-20 md:mt-4 px-4'>
                  <Link
                    to='/events'
                    className='text-white border p-2 px-4 rounded-lg border-gray-400 hover:text-white transition-colors text-sm'
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
      <section className='py-8 mt-32 md:mt-8 md:py-16'>
        <div className='container mx-auto px-4 md:px-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-secondary text-gradient_r'>
            Newsroom
          </h2>
          {loading ? (
            <p className="text-center text-lg text-gray-600">Loading news...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : newsItems.length === 0 ? (
            <p className="text-center text-gray-500">No news available.</p>
          ) : (
            <div className='flex w-[90vw] md:w-full md:overflow-hidden overflow-auto md:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className='relative cursor-pointer group'
                  // onClick={() => navigate('/news-detail')}
                  onClick={() => {
                    dispatch(setSelectedNews(item));
                    navigate(`/news-detail/${item._id}`);
                  }}
                >
                  <div className='relative  w-full  h-80 md:h-80 rounded-2xl overflow-hidden'>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className='w-full h-full object-cover bg-cover bg-center bg-current'
                    />
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black text-white'>
                      <h3 className='text-lg md:text-xl font-semibold'>
                        {item.title}
                      </h3>
                      <div className='flex items-center justify-between gap-5 mt-2 text-xs md:text-sm'>
                        <div className='flex items-center gap-2'>
                          <BsCalendar className='w-3 h-3 md:w-4 md:h-4' />
                          <span>{formatDateWithSuffix(item.createdAt)}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MdAccessTime className='w-3 h-3 md:w-4 md:h-4' />
                          <span>{formatTime(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          }
          {newsItems?.length > 0 && (
            <div className='text-center mt-6 md:mt-8'>
              <button
                onClick={() => navigate('/news')}
                className="px-6 py-3 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-secondary text-lg hover:opacity-90 transition-opacity duration-200 md:px-8 md:py-3 md:text-xl"
              >
                View All
              </button>
            </div>
          )}
        </div>
      </section>
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          eventType={'Home'}
          events={events}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default Homepage;
