import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import logo from "../../assets/logo_white.png";
import event_card from "../../assets/event.png";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
// import HeaderOne from "../../components/HeaderOne";
import Header from "../../components/Header";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 2,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 3,
      title: "The Adventurer",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 5,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end mb-20 text-white px-4 sm:px-8 md:px-12">
          <h1 className="text-xl lg:text-6xl md:text-5xl sm:text-4xl font-bold mb-8 text-center">
            The Kings Halloween Event Celebration Party
          </h1>
          <Link
            to="/news-detail"
            className="px-3 py-1.5 lg:px-8 lg:py-3 sm:px-6 sm:py-2 bg-gradient-to-r from-gradient_r to-[#1F4F46] rounded-3xl font-secondary font-semibold text-lg sm:text-lg"
          >
            Read News
          </Link>
          <div className="flex gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-white"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
          </div>
        </div>
      </section>

      {/* News Content - Horizontal Scrollable */}
      <section className="py-16 md:py-12 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold mb-12 font-secondary text-gradient_r text-center">
            More News
          </h2>
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex gap-4 sm:gap-6 min-w-max">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer min-w-[200px] flex-shrink-0"
                >
                  <div
                    className="relative h-80 sm:h-64 md:h-72 lg:h-80 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gradient_r/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-3">
                      <h3 className="text-xl sm:text-lg font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.title}
                      </h3>
                      <div className="flex justify-between gap-4 sm:gap-2">
                        <div className="flex flex-col gap-2 sm:gap-1">
                          <div className="flex items-center gap-2 sm:gap-1 text-white/80">
                            <BsCalendar className="w-4 h-4 sm:w-3 sm:h-3" />
                            <span className="text-[12px] sm:text-[10px]">
                              {item.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-1 text-white/80">
                            <MdAccessTime className="w-4 h-4 sm:w-3 sm:h-3" />
                            <span className="text-[12px] sm:text-[10px]">
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
          <div className="flex justify-center gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
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
