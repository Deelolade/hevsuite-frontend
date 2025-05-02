import React from 'react';
import { Link } from 'react-router-dom';
import { BsCalendar } from 'react-icons/bs';
import { MdAccessTime } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import logo from '../../assets/logo_white.png';
import event_card from '../../assets/event.png';
import image_card from '../../assets/image.jpg';
import Footer from '../../components/Footer';
import HeaderOne from '../../components/HeaderOne';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {formatDateWithSuffix,formatTime} from "../../utils/formatDate";
const NewsDetail = () => {
  // const relatedNews = [
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
  // ];
  const allNewsItems = useSelector((state) => state.news.newsItems);
  const selectedNews = useSelector((state) => state.news.selectedNews);
  const navigate = useNavigate();

  // Filter out the selectedNews from allNewsItems to get relatedNews
  const relatedNews = allNewsItems.filter(news => news.id !== selectedNews?.id);


  useEffect(() => {

    if (!selectedNews) {
      navigate('/news'); // Redirect if no news selected (e.g. on refresh)
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/news/${selectedNews._id}/increment-reads`, { method: 'PUT' });
  }, [selectedNews, navigate]);

  if (!selectedNews) return null;
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
          <img
            src={image_card}
            alt=''
            className='w-full md:h-[70vh] h-[50vh] object-cover brightness-50'
          />
          {/* <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
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
              <span>{formatDateWithSuffix(selectedNews.expireDate)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <MdAccessTime className='w-4 h-4' />
              <span>{formatTime(selectedNews.expireDate)}</span>
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
                    key={item.id}
                    onClick={() =>
                      window.scrollTo({ top: 50, behavior: 'smooth' })
                    }
                    className='relative group overflow-hidden rounded-2xl shadow-md cursor-pointer min-w-[200px] w-[300px] flex-shrink-0'
                  >
                    <div
                      className='relative h-96 sm:h-64 rounded-2xl bg-cover bg-current bg-center'
                      style={{ backgroundImage: `url(${item.image})` }}
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
