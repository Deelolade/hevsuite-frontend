import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import Footer from "../../components/Footer";
import topicsService from "../../services/topicsService";
import logo from '../../assets/logo_white.png';

const Topics = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [faqsLoading, setFAQsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqs, setFAQs] = useState([]);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
  };

  handleResize(); // Set initial state
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    const fetchTopicsAndFAQs = async () => {
      try {
        setTopicsLoading(true);
        const response = await topicsService.fetchVisibleTopics();
        if (Array.isArray(response.data)) {
          setTopics(response.data);
        } else {
          console.error("Invalid topics data format:", response.data);
          setTopics([]);
        }
      } catch (err) {
        setError("Failed to fetch topics");
        console.error("Error fetching topics:", err);
      } finally {
        setTopicsLoading(false);
      }
    };

    const fetchFAQs = async () => {
      try {
        setFAQsLoading(true);
        const response = await topicsService.fetchFAQs();
        setFAQs(response.data);
      } catch (err) {
        setError("Failed to fetch FAQs");
        console.error("Error fetching FAQs:", err);
      } finally {
        setFAQsLoading(false);
      }
    };

    fetchTopicsAndFAQs();
    fetchFAQs();
  }, []);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Here you would typically fetch data for the new page
      // For example: fetchRequests(pageNumber)
    }
  };
  // Filter topics based on search query
  const filteredTopics = topics?.filter(topic =>
    (topic?.title?.toLowerCase?.() || "").includes(searchQuery.toLowerCase()) ||
    (topic?.description?.toLowerCase?.() || "").includes(searchQuery.toLowerCase())
  );
  // Filter faqs based on search query
    const filteredFAQs = faqs?.filter(faq =>
    (faq?.question?.toLowerCase?.() || "").includes(searchQuery.toLowerCase()) ||
    (faq?.answer?.toLowerCase?.() || "").includes(searchQuery.toLowerCase())
  );
  

  // Update totalPages calculation
  const ITEMS_PER_PAGE = isMobile ? 1 : 6;

  const totalPages = Math.ceil(filteredTopics?.length / ITEMS_PER_PAGE);

  const popularTopics = filteredTopics?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[200px] md:h-[380px] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="text-white text-center py-8 md:py-16 px-4">
            <p className="text-sm mb-1 md:mb-2 md:mt-16 invisible xl:visible font-secondary">
              FAQs
            </p>
            <h1 className="text-2xl invisible xl:visible md:text-4xl font-semibold mb-2 md:mb-4 font-secondary">
              Ask us anything
            </h1>
            <p className="mb-4 md:mb-8 text-sm invisible sm:visible md:text-base font-primary">
              Have any questions? We're here to assist you.
            </p>
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search here"
                className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg text-black text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[#737474]">
                <IoSearchOutline size={20} className="md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <h2 className="text-2xl md:text-4xl font-semibold text-[#540A26] mb-6 md:mb-12 text-center font-secondary">
          Popular Topics
        </h2>

        <div className="relative">
          {/* Topic Cards - Responsive Grid */}
          <div className="overflow-x-scroll scrollbar-hide pb-4 md:pb-0">
            <div className="flex flex-nowrap gap-4 md:grid md:grid-cols-3 md:gap-8 px-0 md:px-4">
              {popularTopics?.map((topic) => (
                <div
                  key={topic._id}
                  className="w-full md:w-auto min-w-[280px] md:min-w-0 bg-white rounded-lg p-4 md:p-6 shadow-xl cursor-pointer mb-4 md:mb-4"
                  onClick={() => navigate(`/topic-details/${topic._id}`, { state: { topic } })}
                >
                  <img
                    src={logo}
                    alt="h"
                    className="w-10 h-10 md:w-12 md:h-12 "
                  />
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-quatr text-xs md:text-sm">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-8 md:mt-12 mb-6 md:mb-8">
            <button
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-quatr hover:text-[#540A26] transition-colors"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              ←
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${currentPage === index + 1 ? "bg-[#540A26]" : "bg-gray-300"
                  } hover:bg-[#540A26]/70 transition-colors`}
                onClick={() => handlePageChange(index + 1)}
                aria-label={`Page ${index + 1}`}
              ></button>
            ))}

            <button
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-quatr hover:text-[#540A26] transition-colors"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              →
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10 md:mt-20">
          <h2 className="text-2xl md:text-4xl mb-6 md:mb-12 text-[#540A26] text-center font-secondary">
            FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFAQs?.map((faq, index) => (
              <div
                key={index}
                className="flex items-start gap-3 md:gap-6 border-b-0 pb-4 md:pb-6"
              >
                <span className="relative w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full flex items-center justify-center text-white text-sm md:text-base font-medium shrink-0 mt-1">
                  {index + 1}
                  <span className="absolute  -bottom-28 left-1/2 transform -translate-x-1/2 w-[2px] h-24 bg-[#540A26]"></span>{" "}
                  {/* Added vertical line under circle */}
                </span>

                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                    {faq.question}
                  </h3>
                  <p
                    className="text-quatr text-sm md:text-base leading-relaxed mb-2 md:mb-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: expandedFAQ === faq.id ? "unset" : 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {faq.answer}
                  </p>
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                    }
                    className="text-[#540A26] text-sm md:text-base font-medium hover:text-red-600 transition-colors"
                  >
                    {expandedFAQ === faq.id ? "Read less" : "Read more"}{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Topics;
