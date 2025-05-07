import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import logo from "../../assets/logo_white.png";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import Footer from "../../components/Footer";

const TopicDetails = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        // First check if we have topic data in location state
        if (location.state?.topic) {
          setTopic(location.state.topic);
        } else {
          // If not, fetch it from the API
          // const response = await topicsService.getTopicById(id);
          // setTopic(response.data);
          console.log("need to fetch")
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch topic details");
        setLoading(false);
        console.error("Error fetching topic:", err);
      }
    };

    fetchTopic();
  }, [id, location.state]);
    if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!topic) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Topic not found</div>;
  }
  // const questions = [
  //   {
  //     id: 1,
  //     question: "What is Hazor Hevsuite (HH) Club?",
  //     answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet, erat id mattis eleifend, justo libero suscipit mi, eu posuere ex quam sed lectus. Donec ultrices laoreet diam eget bibendum. Cras at luctus nisi, in euismod nisi. Nullam ut nunc vehicula, condimentum mi sit amet, pretium dui. Nulla placerat metus lacus, vel sollicitudin ipsum facilisis a. Duis scelerisque egestas nibh, non faucibus metus ornare sit amet. Cras nisi enim, rutrum ut dapibus a, euismod id leo. Aenean sit amet enim enim. Pellentesque eu faucibus magna.`,
  //   },
  //   {
  //     id: 2,
  //     question: "How do I join the HH Club?",
  //     answer: "Answer text here...",
  //   },
  //   {
  //     id: 3,
  //     question: "What are the membership benefits?",
  //     answer: "Answer text here...",
  //   },
  //   {
  //     id: 4,
  //     question: "Can I cancel my membership?",
  //     answer: "Answer text here...",
  //   },
  //   {
  //     id: 5,
  //     question: "How do I update my profile?",
  //     answer: "Answer text here...",
  //   },
  // ];

// Filter QAs based on search query
const questions = topic.QAs.filter(qa =>
  qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
  qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
);
  return (
    <div className="min-h-screen bg-white">
      {/* Background Image */}
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[300px] sm:h-[400px] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      {/* Header */}
      <div className="relative z-10 text-white">
        <Header />
        <div className="text-center py-16 px-4 sm:py-24 sm:px-8">
          <p className="text-sm sm:text-lg mb-2 invisible sm:visible font-secondary">
            FAQs
          </p>
          <h1 className="text-3xl sm:text-4xl invisible sm:visible font-semibold mb-4 font-secondary">
            Ask us anything
          </h1>
          <p className="mb-8 text-base invisible sm:visible sm:text-lg font-primary">
            Have any questions? We're here to assist you.
          </p>
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search here"
              className="w-full px-4 py-3 rounded-lg text-black text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737474] text-xl sm:text-2xl">
              <IoSearchOutline />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 text-sm sm:text-base mb-8">
          <Link to="/topics" className="text-primary font-semibold">
            Popular Topics
          </Link>
          <span className="text-black text-2xl sm:text-3xl">›</span>
          <span className="text-[#222222] font-medium">
            About Hazor Hevsuite (HH) Club
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-gray-50">
            <img src={logo} alt="logo" className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-secondary">
            About Hazor Hevsuite (HH) Club
          </h1>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions?.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              {/* Question Toggle Button */}
              <button
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                onClick={() =>
                  setExpandedQuestion(
                    expandedQuestion === item.id ? null : item.id
                  )
                }
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white text-xs sm:text-sm`}
                  >
                    {item.id}
                  </span>
                  <span className="font-semibold font-primary text-base sm:text-lg">
                    {item.question}
                  </span>
                </div>
                <span className="text-xl sm:text-2xl">
                  {expandedQuestion === item.id ? (
                    <BsChevronCompactUp />
                  ) : (
                    <BsChevronCompactDown />
                  )}
                </span>
              </button>

              {/* Answer Section */}
              {expandedQuestion === item.id && (
                <div className="px-6 pb-6">
                  <div className="ml-12 max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
                    <p className="text-gray-600 font-primary leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Custom CSS for scrollbar hiding
const styles = `
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
`;

export default function EnhancedTopicDetails() {
  return (
    <>
      <style>{styles}</style>
      <TopicDetails />
    </>
  );
}
