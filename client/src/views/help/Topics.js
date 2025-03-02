// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoSearchOutline } from "react-icons/io5";
// import Header from "../../components/Header";
// import bg_image from "../../assets/header-bg.jpg";
// import Footer from "../../components/Footer";

// const Topics = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const popularTopics = [
//     {
//       id: 1,
//       icon: "h",
//       title: "About Hazor Hevsuite (HH) Club",
//       description:
//         "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
//     },
//     {
//       id: 2,
//       icon: "h",
//       title: "Joining the HH Club",
//       description:
//         "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
//     },
//     {
//       id: 3,
//       icon: "h",
//       title: "About Hazor Hevsuite (HH) Club",
//       description:
//         "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
//     },
//     {
//       id: 4,
//       icon: "h",
//       title: "Joining the HH Club",
//       description:
//         "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
//     },
//     {
//       id: 5,
//       icon: "h",
//       title: "About Hazor Hevsuite (HH) Club",
//       description:
//         "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
//     },
//     {
//       id: 6,
//       icon: "h",
//       title: "Joining the HH Club",
//       description:
//         "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="relative text-white">
//         <div className="absolute inset-0 z-0">
//           <img
//             src={bg_image}
//             alt="background"
//             className="w-full h-full object-cover brightness-50"
//           />
//           <div className="absolute inset-0 bg-black/50" />
//         </div>
//         <div className="relative z-10">
//           <Header />
//           <div className=" text-white text-center py-16 px-4">
//             <p className="text-sm mb-2 font-secondary">FAQs</p>
//             <h1 className="text-4xl font-semibold mb-4 font-secondary">
//               Ask us anything
//             </h1>
//             <p className="mb-8 font-primary">
//               Have any questions? We're here to assist you.
//             </p>
//             <div className="max-w-2xl mx-auto relative">
//               <input
//                 type="text"
//                 placeholder="Search here"
//                 className="w-full px-4 py-3 rounded-lg text-black"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737474]">
//                 <IoSearchOutline size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Popular Topics */}
//       <div className="max-w-6xl mx-auto px-4 py-16">
//         <h2 className="text-[50px] font-semibold text-gradient_r mb-12 text-center font-secondary">
//           Popular Topics
//         </h2>

//         <div className="relative">
//           <div className="grid grid-cols-3 gap-8 px-20 overflow-hidden">
//             {popularTopics.map((topic) => (
//               <div
//                 key={topic.id}
//                 className=" bg-white rounded-lg p-6 shadow-lg"
//                 onClick={() => navigate(`/topic-details/${topic.id}`)}
//               >
//                 <div className="w-12 h-12 bg-[#540A26] rounded-lg text-white flex items-center justify-center text-2xl mb-4">
//                   {topic.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
//                 <p className="text-gray-600 text-sm">{topic.description}</p>
//               </div>
//             ))}
//           </div>

//           {/* Navigation Dots */}
//           <div className="flex justify-center gap-2 mt-8">
//             <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
//             <button className="w-2 h-2 rounded-full bg-gray-300"></button>
//             <button className="w-2 h-2 rounded-full bg-gray-300"></button>
//             <button className="w-2 h-2 rounded-full bg-gray-300"></button>
//             <button className="w-2 h-2 rounded-full bg-gray-300"></button>
//           </div>
//         </div>

//         {/* FAQs */}
//         <div className="mt-20">
//           <h2 className="text-[50px] mb-12 text-gradient_r text-center font-secondary">
//             FAQs
//           </h2>
//           <div className="grid grid-cols-2 gap-x-16 gap-y-12">
//             {[...Array(6)].map((_, index) => (
//               <div key={index} className="border-b border-gray-200 pb-6">
//                 <div className="flex items-start gap-6">
//                   <span className="w-8 h-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full flex items-center justify-center text-white text-base font-medium shrink-0">
//                     {index + 1}
//                   </span>
//                   <div>
//                     <h3 className="text-lg font-semibold mb-3">
//                       How do I join the HH Club?
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed mb-3">
//                       To join, complete the registration form and select three
//                       members to support your registration. Once accepted,
//                       you'll need to pay a non-refundable joining fee of £120 to
//                       activate your membership.
//                     </p>
//                     <button className="text-red-700 font-medium hover:text-red-600 transition-colors">
//                       Read more
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Topics;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import Footer from "../../components/Footer";

const Topics = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const popularTopics = [
    {
      id: 1,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 2,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
    {
      id: 3,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 4,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
    {
      id: 5,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 6,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I join the HH Club?",
      answer:
        "To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership. To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership.",
    },
    {
      id: 2,
      question: "How do I join the HH Club?",
      answer:
        "To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership. To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership.",
    },
    {
      id: 3,
      question: "How do I join the HH Club?",
      answer:
        "To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership. To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership.To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership. To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership.",
    },
    {
      id: 4,
      question: "How do I join the HH Club?",
      answer:
        "To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership. To join, complete the registration form and select three members to support your registration. Once accepted, you'll need to pay a non-refundable joining fee of £120 to activate your membership.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[200px] md:h-[315px] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="text-white text-center py-8 md:py-16 px-4">
            <p className="text-sm mb-1 md:mb-2 font-secondary">FAQs</p>
            <h1 className="text-2xl md:text-4xl font-semibold mb-2 md:mb-4 font-secondary">
              Ask us anything
            </h1>
            <p className="mb-4 md:mb-8 text-sm md:text-base font-primary">
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
              {popularTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="w-full md:w-auto min-w-[280px] md:min-w-0 bg-white rounded-lg p-4 md:p-6 shadow-md cursor-pointer mb-4 md:mb-0"
                  onClick={() => navigate(`/topic-details/${topic.id}`)}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#540A26] rounded-lg text-white flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4">
                    {topic.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4 md:mt-8">
            <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10 md:mt-20">
          <h2 className="text-2xl md:text-4xl mb-6 md:mb-12 text-[#540A26] text-center font-secondary">
            FAQs
          </h2>
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 md:pb-6"
              >
                <div className="flex items-start gap-3 md:gap-6">
                  <span className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full flex items-center justify-center text-white text-sm md:text-base font-medium shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                      {faq.question}
                    </h3>
                    <p
                      className="text-gray-600 text-sm md:text-base leading-relaxed mb-2 md:mb-3"
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
                      } // Toggle expand/collapse
                      className="text-[#540A26] text-sm md:text-base font-medium hover:text-red-600 transition-colors"
                    >
                      {expandedFAQ === faq.id ? "Read less" : "Read more"}{" "}
                      {/* Change button text based on state */}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-12">
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
            <BsChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#0A5440] text-white rounded">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
            2
          </button>
          <span className="mx-1">...</span>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
            9
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
            10
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded">
            <BsChevronRight size={16} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Topics;
