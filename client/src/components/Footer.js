// components/Footer.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../features/footerSlice";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter  } from 'react-icons/fa6'

const Footer = () => {
  const dispatch = useDispatch();
  const { footerData, socialMedia, loading, error } = useSelector(
    (state) => state.footer
  );

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  // console.log({ footerData, socialMedia });

  if (error || loading)
    return (
      <footer
        className="py-8 border-t bg-gray-50  hidden sm:block"
        style={{ boxShadow: "-4px -4px 8px 0px #00000040" }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start  sm:items-center gap-8 lg:gap-10">
              <div className="flex items-center gap-4">
                <span className="font-medium">Follow us</span>
                <div className="flex gap-4  ">
                  <FaFacebook />
                  <FaXTwitter />
                  <FaInstagram />
                  <FaLinkedin />
                </div>
              </div>

              <div className="flex gap-8 sm:gap-4 font-bold">
                <Link
                  to="/terms"
                  className="hover:text-black transition-colors  "
                >
                  Policies
                </Link>
                <Link
                  to="/about"
                  className="hover:text-black transition-colors "
                >
                  HH Club & Founder
                </Link>
              </div>
            </div>

            <div className="text-sm sm:text-base text-right font-black">
              &copy; {new Date().getFullYear()} Hazor Group (Trading as HH Club)
            </div>
          </div>
        </div>
      </footer>
    );
  // Platform-specific styling
  const getPlatformStyle = (platformName) => {
    const platform = platformName.toLowerCase();
    const styles = {
      facebook: "bg-[#1877F2] hover:bg-[#166FE5]",
      twitter: "bg-[#1DA1F2] hover:bg-[#1A91DA]",
      instagram:
        "bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] hover:opacity-90",
      linkedin: "bg-[#0077B5] hover:bg-[#00669C]",
      youtube: "bg-[#FF0000] hover:bg-[#E60000]",
      tiktok: "bg-black hover:bg-gray-800",
      pinterest: "bg-[#E60023] hover:bg-[#D5001F]",
      default: "bg-primary hover:bg-primary-dark",
    };

    return styles[platform] || styles.default;
  };
  return (
    <footer
      className="py-8 border-t bg-gray-50 hidden sm:block"
      style={{ boxShadow: "-4px -4px 8px 0px #00000040" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Social Media Links */}
            {/* {socialMedia.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium">Follow us</span>
                <div className="flex gap-4">
                  {socialMedia.map((item) => (
                    <Link
                      key={item._id}
                      to={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
                    >
                      <img
                        src={item.iconImage}
                        alt={item.socialName}
                        className="w-6 h-6"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )} */}
            {socialMedia.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Follow us</span>
                <div className="flex gap-3">
                  {socialMedia.map((item) => (
                    <Link
                      key={item._id}
                      to={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-3xl flex items-center justify-center transition-all duration-300 ${getPlatformStyle(
                        item.socialName
                      )} shadow-md hover:shadow-lg hover:scale-105`}
                      aria-label={`Follow us on ${item.socialName}`}
                    >
                      <img
                        src={item.iconImage}
                        alt={item.socialName}
                        className="w-6 h-6 rounded-3xl"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Links */}
            <div className="flex gap-8 sm:gap-4 font-bold">
              {footerData?.map((section) => (
                <div key={section._id}>
                  {section.items.map((item) => (
                    <Link
                      key={item._id}
                      to={item.link}
                      className="hover:text-black transition-colors block mb-2"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm sm:text-base text-right font-black">
            &copy; {new Date().getFullYear()} Hazor Group (Trading as HH Club)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { Link } from "react-router-dom";
// import instagram from "../assets/icons/insta.png";
// import twitter from "../assets/icons/twitter.png";
// import facebook from "../assets/icons/facebook.png";
// import linkedIn from "../assets/icons/linkedn.png";

// const Footer = () => {
//   return (
//     <footer
//       className="py-8 border-t bg-gray-50  hidden sm:block"
//       style={{ boxShadow: "-4px -4px 8px 0px #00000040" }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 md:px-8">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
//             <div className="flex items-center gap-4">
//               <span className="font-medium">Follow us</span>
//               <div className="flex gap-4">
//                 <Link to="#" className="hover:text-black transition-colors">
//                   <img src={facebook} alt="facebook" className="w-6 h-6" />
//                 </Link>
//                 <Link to="#" className="hover:text-black transition-colors">
//                   <img src={twitter} alt="twitter" className="w-6 h-6" />
//                 </Link>
//                 <Link to="#" className="hover:text-black transition-colors">
//                   <img src={instagram} alt="instagram" className="w-6 h-6" />
//                 </Link>
//                 <Link to="#" className="hover:text-black transition-colors">
//                   <img src={linkedIn} alt="linkedin" className="w-6 h-6" />
//                 </Link>
//               </div>
//             </div>

//             <div className="flex gap-8 sm:gap-4 font-bold">
//               <Link
//                 to="/terms"
//                 className="hover:text-black transition-colors  "
//               >
//                 Policies
//               </Link>
//               <Link to="/about" className="hover:text-black transition-colors ">
//                 HH Club & Founder
//               </Link>
//             </div>
//           </div>

//           <div className="text-sm sm:text-base text-right font-black">
//             &copy; 2024 Hazor Group (Trading as HH Club)
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
