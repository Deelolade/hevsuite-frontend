import React, { useState, useRef, useEffect } from 'react';
import { BsCalendar } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import logo from '../../assets/logo_white.png';
import event_card from '../../assets/event.png';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
// import HeaderOne from "../../components/HeaderOne";
import image_card from '../../assets/image.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from '../../components/Header';
import { fetchNonExpiredNews } from '../../features/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedNews } from '../../features/newsSlice';
import {formatDateWithSuffix,formatTime} from "../../utils/formatDate";
const News = () => {
      const dispatch = useDispatch();
     
      useEffect(() => {
        dispatch(fetchNonExpiredNews());
      }, [dispatch]);
      
      const { newsItems, loading, error } = useSelector((state) => state.news);
  const navigate = useNavigate();
  // const newsItems = [
  //   {
  //     id: 1,
  //     title: 'The Bout for Lions',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  //   {
  //     id: 2,
  //     title: 'Battle for NBA Cup',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  //   {
  //     id: 3,
  //     title: 'The Adventurer',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  //   {
  //     id: 4,
  //     title: 'Battle for NBA Cup',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  //   {
  //     id: 5,
  //     title: 'Battle for NBA Cup',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  //   {
  //     id: 6,
  //     title: 'Battle for NBA Cup',
  //     date: '2nd January, 2025',
  //     time: '10:00pm',
  //     image: event_card,
  //   },
  // ];
  const swiperRef = useRef(null); // Create a reference for the Swiper instance

  const handleSlideChange = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // Correctly accessing the swiper instance
    }
  };

  const swiperRef2 = useRef(null); // Create a reference for the Swiper instance

  const images = [image_card, image_card, image_card]; // Replace with your image sources
  const [activeBullet, setActiveBullet] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className='relative z-0 h-screen'>
        <div className='absolute inset-0 bg-black/50'>
          <Swiper
            loop={true}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              // Handle icon change when slide changes
              const buttons = document.querySelectorAll('.slider-button');
              buttons.forEach((btn, index) => {
                btn.classList.toggle('bg-white', index === swiper.activeIndex);
                btn.classList.toggle(
                  'bg-white/50',
                  index !== swiper.activeIndex
                );
              });
            }}
            ref={swiperRef} // Assign swiperRef to the Swiper component
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className='w-full h-[100vh] -z-10 object-cover brightness-50'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='absolute z-50 inset-0 flex flex-col items-center justify-end mb-20 text-white px-4'>
          <h1 className='text-xl lg:text-6xl md:text-5xl sm:text-4xl font-bold mb-8 text-center'>
            The Kings Halloween Event Celebration Party
          </h1>
          <Link
            to='/news-detail'
            className='px-3 py-1.5 lg:px-8 lg:py-3 sm:px-6 sm:py-2 bg-gradient-to-r from-gradient_r to-[#1F4F46] rounded-3xl font-secondary font-semibold text-lg sm:text-lg'
          >
            Read News
          </Link>
          <div className='flex gap-2 mt-8'>
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-white' : 'bg-white/50'
                } slider-button`} // Adjust active button styling
                onClick={() => handleSlideChange(index)} // On button click, change slide
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* News Content - Horizontal Scrollable */}
      <section className='py-16 md:py-12 sm:py-8'>
        <div className='container mx-auto px-4 sm:px-6 md:px-8'>
          <h2 className='text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold mb-12 font-secondary text-gradient_r text-center'>
            More News
          </h2>
          <section className='relative'>
            <Swiper
              loop={false}
              ref={swiperRef2} // Assign swiperRef to the Swiper component
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                1024: { slidesPerView: 6 },
                768: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                0: { slidesPerView: 2 },
              }}
              onSlideChange={(swiper) => {
                const slidesPerView = swiper.params.slidesPerView;
                setActiveBullet(Math.floor(swiper.activeIndex / slidesPerView));
                setActiveIndex(swiper.realIndex);
              }}
            >
              {newsItems?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                     onClick={() => {
                      dispatch(setSelectedNews(item));
                      navigate('/news-detail');
                    }}
                    className='relative group cursor-pointer overflow-hidden rounded-2xl shadow-md flex-shrink-0'
                  >
                    <div
                      className='relative h-80 sm:h-64 md:h-72 rounded-2xl bg-cover bg-center bg-current'
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <div className='absolute inset-0 ' />
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <h3 className='text-xl md:text-lg sm:text-base font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                          {item.title}
                        </h3>
                        <div className='flex justify-between gap-4'>
                          <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2 text-white/80'>
                              <BsCalendar className='w-4 h-4 sm:w-3 sm:h-3' />
                              <span className='text-[12px] sm:text-[10px]'>
                                {formatDateWithSuffix(item.expireDate)}
                              </span>
                            </div>
                            <div className='flex items-center gap-2 text-white/80'>
                              <MdAccessTime className='w-4 h-4 sm:w-3 sm:h-3' />
                              <span className='text-[12px] sm:text-[10px]'>
                                {formatTime(item.expireDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='md:flex hidden justify-center gap-2 mt-8'>
              {Array.from({ length: Math.ceil(newsItems.length / 6) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === Math.floor(activeIndex / 6)
                        ? 'bg-[#540A26]'
                        : 'bg-gray-300'
                    } news-slider-button`}
                    onClick={() => swiperRef2.current.swiper.slideTo(index * 6)}
                  ></button>
                )
              )}
            </div>

            <div className='flex md:hidden justify-center gap-2 mt-8'>
              {Array.from({ length: Math.ceil(newsItems.length / 2) }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === activeBullet ? 'bg-[#540A26]' : 'bg-gray-300'
                    } news-slider-button`}
                    onClick={() => swiperRef2.current.swiper.slideTo(index * 2)}
                  ></button>
                )
              )}
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Custom CSS to hide scrollbar
const styles = `
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
`;

export default News;
//   return (
//     <>
//       <style>{styles}</style>
//       <NewsContent />
//     </>
//   );
// }

// const NewsContent = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Rest of the component code */}
//     </div>
//   );
// }
