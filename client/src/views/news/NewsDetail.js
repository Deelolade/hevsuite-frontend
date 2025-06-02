import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsCalendar } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import logo from '../../assets/logo_white.png';
import event_card from '../../assets/event.png';
import image_card from '../../assets/image.jpg';
import Footer from '../../components/Footer';
import HeaderOne from '../../components/HeaderOne';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { formatDateWithSuffix, formatTime } from "../../utils/formatDate";
import { fetchNewsById, setSelectedNews } from '../../features/newsSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

const NewsDetail = () => {
  const { newsItems: allNewsItems, selectedNews, loading, error } = useSelector((state) => state.news);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // Filter out the selectedNews from allNewsItems to get relatedNews
  const relatedNews = allNewsItems.filter(news => news._id !== selectedNews?._id);


  useEffect(() => {
    if (!selectedNews || selectedNews._id !== id) {
      dispatch(fetchNewsById(id));
    }
  }, [id, selectedNews, dispatch]);
  useEffect(() => {

    if (selectedNews?._id) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/news/${selectedNews._id}/increment-reads`, {
        method: 'PUT',
      });
    }
  }, [selectedNews, navigate]);

  if (!selectedNews) return null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }
  const mediaSlides = [
    ...(selectedNews.videos || []).map((url) => ({ type: 'video', url })),
    ...(selectedNews.images || []).map((url) => ({ type: 'image', url })),
  ];
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className='relative '>
        <Link
          to='/news'
          className='absolute top-20 md:top-32 left-4 md:left-12 z-10 flex items-center gap-2 text-white'
        >
          <IoArrowBack />
          <span>back</span>
        </Link>
        <div className='relative inset-0 bg-black/50'>
          {/* <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="w-full h-[50vh] md:h-[70vh]"
          >
            {selectedNews.images?.length > 0 ? (
              selectedNews.images.map((img, index) => (
                <SwiperSlide key={`${index}-${img}`}>
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className='w-full h-full object-cover brightness-50'
                    loading='lazy'
                    onError={(e) => {
                      e.target.src = image_card; // Fallback to default image if error
                    }}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img
                  src={image_card} // Fallback when no images exist
                  alt="Default slide"
                  className='w-full h-full object-cover brightness-50'
                />
              </SwiperSlide>
            )}
          </Swiper> */}
          {/* {selectedNews.videos?.length > 0 && (
            selectedNews.videos.map((video, index) => (
              <SwiperSlide key={`video-${index}`}>
                <div className="relative w-full h-full">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Video failed to load:', video);
                      e.target.style.display = 'none'; // Hide if error occurs
                    }}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                 
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    VIDEO
                  </div>
                </div>
              </SwiperSlide>
            ))
          )} */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="w-full h-[50vh] md:h-[70vh]"
          >
            {mediaSlides.length > 0 ? (
              mediaSlides.map((media, index) => (
                <SwiperSlide key={`media-${index}`}>
                  {media.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Video failed to load:', media.url);
                          e.target.style.display = 'none';
                        }}
                      >
                        <source src={media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <img
                      src={media.url}
                      alt={`Slide ${index}`}
                      className="w-full h-full object-cover brightness-50"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = image_card; // fallback image
                      }}
                    />
                  )}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <img
                  src={image_card}
                  alt="Default slide"
                  className="w-full h-full object-cover brightness-50"
                />
              </SwiperSlide>
            )}
          </Swiper>

        </div>
        <div className=' hidden absolute inset-0  flex-col items-center justify-end mb-20 text-white'>
          <div className='flex gap-2 mt-8'>
            <button className='w-2 h-2 rounded-full bg-white'></button>
            <button className='w-2 h-2 rounded-full bg-white/50'></button>
            <button className='w-2 h-2 rounded-full bg-white/50'></button>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className='container mx-auto px-4 md:px-12 py-16'>
        <div>
          <h1 className='text-3xl md:text-4xl font-semibold mb-4 font-primary text-gradient_r'>
            {selectedNews.title}
          </h1>
          <div className='flex flex-wrap items-center gap-4 md:gap-8 text-gray-600 mb-8'>
            <div className='flex items-center gap-2'>
              <BsCalendar className='w-4 h-4' />
              <span>{formatDateWithSuffix(selectedNews.createdAt)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <MdAccessTime className='w-4 h-4' />
              <span>{formatTime(selectedNews.createdAt)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span>👁</span>
              <span>{selectedNews.reads} reads</span>
            </div>
          </div>
          <div className='prose max-w-none'>
            <p className='pb-4'>
              {selectedNews.description}
            </p>
          </div>
        </div>

        {/* Related News - Horizontal Scrollable */}
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4 md:px-12'>
            <h2 className='text-4xl md:text-3xl sm:text-2xl font-bold mb-12 font-secondary text-gradient_r text-center'>
              Related News
            </h2>
            <div className='overflow-x-auto scrollbar-hidden'>
              <div className='flex justify-between gap-4 sm:gap-6 min-w-max'>
                {relatedNews.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      dispatch(setSelectedNews(item));
                      navigate(`/news-detail/${item._id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className='relative group overflow-hidden rounded-2xl shadow-md cursor-pointer min-w-[200px] w-[300px] flex-shrink-0'
                  >
                    <div
                      className='relative h-96 sm:h-64 rounded-2xl bg-cover bg-current bg-center'
                      style={{ backgroundImage: `url(${item.images[0]})` }}
                    >
                      {/* Gradient Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 p-4 sm:p-3 !z-50 '>
                        <div className='absolute inset-0   !z-10' />
                        <h3 className='text-xl sm:text-lg font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                          {item.title}
                        </h3>
                        <div className='flex justify-between gap-4 sm:gap-2'>
                          <div className='flex flex-col gap-2 sm:gap-1'>
                            <div className='flex items-center gap-2 sm:gap-1 text-white/80'>
                              <BsCalendar className='w-4 h-4 sm:w-3 sm:h-3' />
                              <span className='text-[12px] sm:text-[10px]'>
                                {item.date}
                              </span>
                            </div>
                            <div className='flex items-center gap-2 sm:gap-1 text-white/80'>
                              <MdAccessTime className='w-4 h-4 sm:w-3 sm:h-3' />
                              <span className='text-[12px] sm:text-[10px]'>
                                {item.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
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

export default NewsDetail;
