// components/Footer.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../features/footerSlice";
import LoadingSpinner from "../views/LoadingSpinner";
import instagram from "../assets/icons/insta.png";
import twitter from "../assets/icons/twitter.png";
import facebook from "../assets/icons/facebook.png";
import linkedIn from "../assets/icons/linkedn.png";
const Footer = () => {
  const dispatch = useDispatch();
  const { footerData, socialMedia, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(fetchFooterData());
  }, [dispatch]);

  if (error || loading) return (
    <footer
      className="py-8 border-t bg-gray-50  hidden sm:block"
      style={{ boxShadow: "-4px -4px 8px 0px #00000040" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="font-medium">Follow us</span>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={facebook} alt="facebook" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={twitter} alt="twitter" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={instagram} alt="instagram" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={linkedIn} alt="linkedin" className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div className="flex gap-8 sm:gap-4 font-bold">
              <Link
                to="/terms"
                className="hover:text-black transition-colors  "
              >
                Policies
              </Link>
              <Link to="/about" className="hover:text-black transition-colors ">
                HH Club & Founder
              </Link>
            </div>
          </div>

          <div className="text-sm sm:text-base text-right font-black">
            &copy; 2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <footer className="py-8 border-t bg-gray-50 hidden sm:block" style={{ boxShadow: "-4px -4px 8px 0px #00000040" }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Social Media Links */}
            {socialMedia.length > 0 && (
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
            &copy; 2024 Hazor Group (Trading as HH Club)
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
