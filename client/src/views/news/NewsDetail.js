import React from "react";
import { Link } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import logo from "../../assets/logo_white.png";
import event_card from "../../assets/event.png";
import image_card from "../../assets/image.jpg";
import Footer from "../../components/Footer";
import HeaderOne from "../../components/HeaderOne";
import Header from "../../components/Header";

const NewsDetail = () => {
  const relatedNews = [
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
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative ">
        <Link
          to="/news"
          className="absolute top-20 md:top-32 left-4 md:left-12 z-10 flex items-center gap-2 text-white"
        >
          <IoArrowBack />
          <span>back</span>
        </Link>
        <div className="relative inset-0 bg-black/50">
          <img
            src={image_card}
            alt=""
            className="w-full md:h-[70vh] h-[50vh] object-cover brightness-50"
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
        <div className=" hidden absolute inset-0  flex-col items-center justify-end mb-20 text-white">
          <div className="flex gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-white"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="container mx-auto px-4 md:px-12 py-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 font-primary text-gradient_r">
            The Kings Halloween Event Celebration Party
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <BsCalendar className="w-4 h-4" />
              <span>2nd January, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MdAccessTime className="w-4 h-4" />
              <span>10:00pm</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👁</span>
              <span>105 reads</span>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="pb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Praesent auctor purus
              luctus enim egestas, ac scelerisque ante pulvinar. Donec ut
              rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur
              vel bibendum lorem. Morbi convallis convallis diam sit amet
              lacinia. Aliquam in elementum tellus.
            </p>
            <p className="pb-4">
              Curabitur tempor quis eros tempus lacinia. Nam bibendum
              pellentesque quam a convallis. Sed ut vulputate nisi. Integer in
              felis sed leo vestibulum venenatis. Suspendisse quis arcu sem.
              Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend
              magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices
              nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla
              varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis
              eleifend. Sed nec ante dictum sem condimentum ullamcorper quis
              venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
            </p>
          </div>
        </div>

        {/* Related News - Horizontal Scrollable */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <h2 className="text-4xl md:text-3xl sm:text-2xl font-bold mb-12 font-secondary text-gradient_r text-center">
              Related News
            </h2>
            <div className="overflow-x-auto scrollbar-hidden">
              <div className="flex gap-4 sm:gap-6 min-w-max">
                {relatedNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      window.scrollTo({ top: 50, behavior: "smooth" })
                    }
                    className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer min-w-[200px] flex-shrink-0"
                  >
                    <div
                      className="relative h-80 sm:h-64 rounded-2xl bg-cover bg-current bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-3 !z-50 ">
                        <div className="absolute inset-0   !z-10" />
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
