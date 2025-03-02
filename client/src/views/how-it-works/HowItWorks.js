// import React from "react";
// import Header from "../../components/Header";
// import bg_image from "../../assets/header-bg.jpg";
// import Footer from "../../components/Footer";
// import email_camp from "../../assets/email_camp.png";

// const HowItWorks = () => {
//   const steps = [
//     {
//       number: 1,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 2,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 3,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 4,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 5,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 6,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//   ];

//   return (
//     <div>
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
//           <div className="relative z-10 text-center py-16">
//             <p className="text-gray-200 font-secondary text-4xl">
//               How Hevsuite Club Works?
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 mb-4 ">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-24">
//           {steps.map((step) => (
//             <div key={step.number} className="text-center">
//               <div className="w-12 h-12 rounded-full border-2 border-[#540A26] text-primary font-bold flex items-center justify-center mx-auto mb-4">
//                 <span className="text-xl">{step.number}</span>
//               </div>
//               <h3 className="text-xl font-medium mb-3">{step.title}</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-gradient-to-r from-[#540A26] to-[#1F4F46] py-6 px-4 max-w-4xl rounded-2xl mx-auto mb-8">
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-6">
//             <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
//               <img src={email_camp} alt="FAQ" className="w-8 h-8" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-medium text-white mb-2">
//                 Have Question in mind?
//               </h3>
//               <p className="text-white/80">
//                 We'll help you in everything you need.
//               </p>
//             </div>
//           </div>
//           <button className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#1F4F46] text-white rounded-3xl ">
//             Check our FAQs
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default HowItWorks;

// import React from "react";
// import Header from "../../components/Header";
// import bg_image from "../../assets/header-bg.jpg";
// import email_camp from "../../assets/email_camp.png";
// import Footer from "../../components/Footer";

// const HowItWorks = () => {
//   const steps = [
//     {
//       number: 1,
//       title: "Become a Member",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 2,
//       title: "Create an Event",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 3,
//       title: "Invite Guests",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 4,
//       title: "Receive Notifications",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 5,
//       title: "Manage Attendance",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//     {
//       number: 6,
//       title: "Enjoy Your Experience",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Background Image */}
//       <div className="relative text-white">
//         <div className="absolute inset-0 z-0">
//           <img
//             src={bg_image}
//             alt="background"
//             className="w-full h-[300px] sm:h-[400px] object-cover brightness-50"
//           />
//           <div className="absolute inset-0 bg-black/50" />
//         </div>
//         {/* Header */}
//         <div className="relative z-10">
//           <Header />
//           <div className="relative z-10 text-center py-16 px-4 sm:py-24 sm:px-8">
//             <p className="text-gray-200 font-secondary text-2xl sm:text-4xl">
//               How Hevsuite Club Works?
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Steps Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {steps.map((step) => (
//             <div
//               key={step.number}
//               className="text-center bg-white shadow-md rounded-lg p-6 sm:p-8"
//             >
//               {/* Step Number */}
//               <div
//                 className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#540A26] flex items-center justify-center mx-auto mb-4"
//                 style={{ fontSize: "1rem", transition: "transform 0.3s ease" }}
//               >
//                 <span className="text-xl sm:text-2xl">{step.number}</span>
//               </div>
//               {/* Step Title */}
//               <h3 className="text-lg sm:text-xl font-medium mb-3">
//                 {step.title}
//               </h3>
//               {/* Step Description */}
//               <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                 {step.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-gradient-to-r from-[#540A26] to-[#1F4F46] py-8 px-4 sm:py-12 sm:px-8 max-w-4xl rounded-2xl mx-auto mb-8">
//         <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
//           {/* Left Content */}
//           <div className="flex flex-col sm:flex-row items-center sm:gap-6">
//             <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/10 rounded-lg flex items-center justify-center">
//               <img
//                 src={email_camp}
//                 alt="FAQ"
//                 className="w-6 h-6 sm:w-8 sm:h-8"
//               />
//             </div>
//             <div className="sm:max-w-md">
//               <h3 className="text-lg sm:text-2xl font-medium text-white mb-2">
//                 Have Question in mind?
//               </h3>
//               <p className="text-sm sm:text-base text-white/80">
//                 We'll help you in everything you need.
//               </p>
//             </div>
//           </div>
//           {/* Right Button */}
//           <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-[#540A26] rounded-3xl mt-4 sm:mt-0">
//             Check our FAQs
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default HowItWorks;

import React from "react";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import email_camp from "../../assets/email_camp.png";
import Footer from "../../components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 2,
      title: "Create an Event",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 3,
      title: "Invite Guests",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 4,
      title: "Receive Notifications",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 5,
      title: "Manage Attendance",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 6,
      title: "Enjoy Your Experience",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image */}
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[200px] sm:h-[250px] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        {/* Header */}
        <div className="relative z-10">
          <Header />
          <div className="relative z-10 text-center py-8 px-4 sm:py-12 sm:px-8">
            <p className="text-gray-200 font-secondary text-2xl sm:text-4xl">
              How Hevsuite Club Works?
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section - Added margin-top to create space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 mt-16 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center bg-white shadow-md rounded-lg p-6 sm:p-8"
            >
              {/* Step Number */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#540A26] flex items-center justify-center mx-auto mb-4"
                style={{ fontSize: "1rem", transition: "transform 0.3s ease" }}
              >
                <span className="text-xl sm:text-2xl">{step.number}</span>
              </div>
              {/* Step Title */}
              <h3 className="text-lg sm:text-xl font-medium mb-3">
                {step.title}
              </h3>
              {/* Step Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-[#540A26] to-[#1F4F46] py-8 px-4 sm:py-12 sm:px-8 max-w-4xl rounded-2xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
          {/* Left Content */}
          <div className="flex flex-col sm:flex-row items-center sm:gap-6">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <img
                src={email_camp}
                alt="FAQ"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <div className="sm:max-w-md">
              <h3 className="text-lg sm:text-2xl font-medium text-white mb-2">
                Have Question in mind?
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                We'll help you in everything you need.
              </p>
            </div>
          </div>
          {/* Right Button */}
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-[#540A26] rounded-3xl mt-4 sm:mt-0">
            Check our FAQs
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HowItWorks;
