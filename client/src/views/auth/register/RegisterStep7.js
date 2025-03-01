// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsCheckCircleFill } from "react-icons/bs";
// import Footer from "../../../components/Footer";
// import avatar from "../../../assets/user.avif";
// import logo_white from "../../../assets/logo_white.png";
// import bg_image from "../../../assets/party3.jpg";

// const RegisterStep7 = () => {
//   const navigate = useNavigate();
//   const referrals = [
//     {
//       id: 1,
//       name: "Andrew Bojangles",
//       avatar: avatar,
//       status: "Approved",
//     },
//     {
//       id: 2,
//       name: "Andrew Bojangles",
//       avatar: avatar,
//       status: "Pending",
//     },
//     {
//       id: 3,
//       name: "Andrew Bojangles",
//       avatar: avatar,
//       status: "Pending",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       <div className="relative text-white">
//         <div className="absolute inset-0 z-0">
//           <img
//             src={bg_image}
//             alt="background"
//             className="w-full h-[120px] object-cover brightness-50 "
//           />
//           <div className="absolute inset-0 bg-black/60" />
//         </div>
//         <header className="relative z-10 py-4">
//           <div className="container mx-auto px-4 flex justify-center">
//             <img src={logo_white} alt="Hevsuite Club" className="h-16" />
//           </div>
//         </header>
//       </div>

//       {/* Progress Steps */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between max-w-4xl mx-auto">
//           {[...Array(7)].map((_, index) => (
//             <div key={index} className="flex items-center">
//               <div className="relative">
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     index < 7
//                       ? "bg-[#0A5440]"
//                       : "bg-white border-2 border-gray-300"
//                   }`}
//                 >
//                   {index < 6 ? (
//                     <BsCheckCircleFill className="text-white" />
//                   ) : (
//                     <span className="text-white">7</span>
//                   )}
//                 </div>
//                 <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
//                   Step {index + 1}
//                 </p>
//               </div>
//               {index < 6 && <div className={`w-32 h-[2px] bg-[#0A5440]`} />}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
//         <div className="mb-12">
//           <div className="w-24 h-24 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full mx-auto mb-8 flex items-center justify-center">
//             <svg
//               className="w-12 h-12 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-medium mb-4">
//             Your membership application is pending for approval.
//           </h2>
//         </div>

//         <div className="bg-white rounded-lg p-8">
//           <h3 className="text-2xl font-medium mb-6">Check your referrals</h3>
//           <div className="space-y-4">
//             {referrals.map((referral) => (
//               <div
//                 key={referral.id}
//                 className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={referral.avatar}
//                     alt={referral.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <span className="font-medium">{referral.name}</span>
//                 </div>
//                 <div>
//                   {referral.status === "Approved" ? (
//                     <span className="px-4 py-2 bg-[#0A5440] text-white rounded-lg">
//                       Approved
//                     </span>
//                   ) : (
//                     <>
//                       <span className="px-4 py-2 bg-white text-quatr rounded-lg mx-4">
//                         Pending
//                       </span>
//                       <span className="px-4 py-2 bg-[#540A26] text-white rounded-lg">
//                         Decline
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             className="mt-8 px-6 py-1  text-[#540A26] border-2 border-gradient_r rounded-3xl font-secondary inline-flex items-center gap-2"
//             onClick={() => navigate("/register-6")}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 4v16m8-8H4"
//               />
//             </svg>
//             Add other referral
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default RegisterStep7;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import Footer from "../../../components/Footer";
import avatar from "../../../assets/user.avif";
import logo_white from "../../../assets/logo_white.png";
import bg_image from "../../../assets/party3.jpg";

const RegisterStep7 = () => {
  const navigate = useNavigate();
  const referrals = [
    {
      id: 1,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Approved",
    },
    {
      id: 2,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Pending",
    },
    {
      id: 3,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[120px] object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <header className="relative z-10 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <img
              src={logo_white}
              alt="Hevsuite Club"
              className="h-12 md:h-16"
            />
            <button className="md:hidden text-white text-2xl">
              <span>☰</span>
            </button>
          </div>
        </header>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6 mt-8">
        <div className="flex flex-wrap justify-center gap-4 pb-6 md:pb-0">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 7
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 6 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : index === 6 ? (
                    <span className="text-white">7</span>
                  ) : (
                    <span className="text-gray-500">{`0${index + 1}`}</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-12 md:w-32 h-[2px] ${
                    index < 6 ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl text-center flex-grow">
        <div className="mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full mx-auto mb-4 md:mb-8 flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-3xl font-medium mb-2 md:mb-4 text-[#540A26]">
            Your membership application is pending for approval.
          </h2>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
          <h3 className="text-lg md:text-2xl font-medium mb-4 md:mb-6">
            Check your referrals
          </h3>
          <div className="space-y-3 md:space-y-4">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex flex-wrap md:flex-nowrap items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-0 w-full md:w-auto">
                  <img
                    src={referral.avatar}
                    alt={referral.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                  />
                  <span className="font-medium text-sm md:text-base">
                    {referral.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                  {referral.status === "Approved" ? (
                    <span className="px-3 md:px-4 py-1 md:py-2 bg-[#0A5440] text-white rounded-lg text-xs md:text-sm">
                      Approved
                    </span>
                  ) : (
                    <>
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-white text-gray-500 border border-gray-200 rounded-lg text-xs md:text-sm">
                        Pending
                      </span>
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-[#540A26] text-white rounded-lg text-xs md:text-sm">
                        Decline
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-6 md:mt-8 px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base hover:bg-[#540A26] hover:text-white transition-colors"
            onClick={() => navigate("/register-6")}
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add other referral
          </button>
          <Link to="/register-8">go to payment</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterStep7;
