import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import event_card from "../../assets/event.png";
import image_card from "../../assets/image.jpg";
import Footer from "../../components/Footer";
import HeaderOne from "../../components/HeaderOne";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatDateWithSuffix, formatTime } from "../../utils/formatDate";
// import "swiper/swiper-bundle.min.css";
import "swiper/css";
// import Header from "../../components/Header";
import { fetchNonExpiredNews, setSelectedNews } from '../../features/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Autoplay } from "swiper/modules";
import { fetchLandingPageData } from "../../features/landingPageSlice";
const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNonExpiredNews());
  }, [dispatch]);

const { 
  landingPages, 
  loading: landingLoading, 
  error: landingError 
} = useSelector((state) => state.landingPage);
  useEffect(() => {
    dispatch(fetchLandingPageData());
  }, [dispatch]);
  useEffect(() => {
    console.log('Landing pages data:', landingPages);
  }, [landingPages]);
  const { newsItems, loading, error } = useSelector((state) => state.news);
  const navigate = useNavigate();
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
  const landingPageNews = newsItems.find(item => item.isOnLandingPage)
  return (
    <div className="min-h-screen">
      {/* Header */}
      <HeaderOne />

      {/* Hero Section */}
      <section className="relative z-0 h-screen">
        <div className="absolute inset-0 bg-black/50">
          {landingPages.length > 0 ? (
            <Swiper
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onSlideChange={(swiper) => {
                const buttons = document.querySelectorAll('.slider-button');
                buttons.forEach((btn, index) => {
                  btn.classList.toggle('bg-white', index === swiper.activeIndex);
                  btn.classList.toggle('bg-white/50', index !== swiper.activeIndex);
                });
              }}
              ref={swiperRef}
            >
              {landingPages?.map((page, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={page.image}
                    alt={`Image ${index}`}
                    className='w-full h-[100vh] -z-10 object-cover brightness-50'
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          ) : (
            <div className="h-screen relative">
              <img
                src={image_card}
                alt="Default event"
                className="w-full h-full object-cover brightness-50"
              />
            </div>
          )}
        </div>
        <div className="absolute z-50 inset-0 flex flex-col items-center justify-end mb-20 text-white px-4">
          <h1 className="text-2xl lg:text-6xl md:text-5xl sm:text-2xl font-primary font-bold mb-8 text-center">
             The Kings Halloween Event Celebration Party
          </h1>
          <Link
            to="/register"
            className="px-8 py-3 md:px-6 md:py-2 sm:px-4 sm:py-1 bg-gradient-to-r from-gradient_r to-[#1F4F46] rounded-3xl font-secondary text-xl md:text-lg sm:text-base"
          >
            Become a Member
          </Link>
          <div className="flex gap-2 mt-8">
            {landingPages?.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/50"
                  } slider-button`} // Adjust active button styling
                onClick={() => handleSlideChange(index)} // On button click, change slide
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsroom Section */}
      <section className="py-16 md:py-12 sm:py-8">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading news...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : newsItems.length === 0 ? (
          <p className="text-center text-gray-500">No news available.</p>
        ) : (
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-center mb-12 font-secondary text-gradient_r">
              Newsroom
            </h2>
            <section className="relative">
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
                { newsItems?.filter( item => item.isOnLandingPage)
                  .map((item) => (
                    <SwiperSlide key={item._id}>
                      <div
                        onClick={() => {
                          dispatch(setSelectedNews(item));
                            navigate(`/news-detail/${item._id}`);
                        }}
                        className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-md flex-shrink-0"
                      >
                        <div
                          className="relative h-80 sm:h-64 md:h-72 rounded-2xl bg-cover bg-center bg-current"
                          style={{ backgroundImage: `url(${item.images[0]})` }}
                        >
                          <div className="absolute inset-0 " />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-xl md:text-lg sm:text-base font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                              {item.title}
                            </h3>
                            <div className="flex justify-between gap-4">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-white/80">
                                  <BsCalendar className="w-4 h-4 sm:w-3 sm:h-3" />
                                  <span className="text-[12px] sm:text-[10px]">
                                    {formatDateWithSuffix(item.expireDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80">
                                  <MdAccessTime className="w-4 h-4 sm:w-3 sm:h-3" />
                                  <span className="text-[12px] sm:text-[10px]">
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
              <div className="md:flex hidden justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(newsItems.length / 6) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === Math.floor(activeIndex / 6)
                        ? "bg-[#540A26]"
                        : "bg-gray-300"
                        } news-slider-button`}
                      onClick={() => swiperRef2.current.swiper.slideTo(index * 6)}
                    ></button>
                  )
                )}
              </div>

              <div className="flex md:hidden justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(newsItems.length / 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === activeBullet ? "bg-[#540A26]" : "bg-gray-300"
                        } news-slider-button`}
                      onClick={() => swiperRef2.current.swiper.slideTo(index * 2)}
                    ></button>
                  )
                )}
              </div>
            </section>
            <div className="text-center mt-8">
              <Link
                to="news"
                className="px-8 py-3 md:px-6 md:py-2 sm:px-4 sm:py-1 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg font-secondary text-xl md:text-lg sm:text-base"
              >
                View all
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Hide scrollbar using custom CSS
const styles = `
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
`;

export default Landing;

// export default function Landing() {
//   return (
//     <>
//       <style>{styles}</style>
//       <LandingContent />
//     </>
//   );
// }

// const LandingContent = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Rest of the component code */}
//     </div>
//   );
// }
