// import React from "react";
// import logo_white from "../../assets/logo_white.png";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";

// const Login = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Left Section */}
//       <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
//         <div className="text-center">
//           {/* <div className="w-32 h-32 bg-[#540A26] rounded-full mx-auto mb-6"> */}
//           <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
//           {/* </div> */}
//           <h1 className="text-white text-[40px] font-['Playfair_Display']">
//             Hevsuite Club
//           </h1>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex-1 flex flex-col justify-center px-[52px]">
//         <h1 className="text-[32px] font-['Playfair_Display'] mb-14 text-center">
//           Welcome Admin!
//         </h1>

//         <div className="space-y-4 w-full max-w-[380px] mx-auto">
//           <div className="relative">
//             <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato'] placeholder:text-gray-400"
//             />
//           </div>

//           <div className="relative">
//             <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato'] placeholder:text-gray-400"
//             />
//           </div>

//           <button
//             className="w-full py-2.5 rounded-[4px] text-white cursor-pointer font-['Lato'] text-sm"
//             style={{
//               background: "linear-gradient(to right, #540A26, #0A5438)",
//             }}
//           >
//             Login
//           </button>

//           <div className="text-center mt-2">
//             <a
//               href="#"
//               className="text-gray-500 hover:underline text-xs font-['Lato']"
//             >
//               Forgot Password
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/two-factor-auth");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-black relative flex flex-col items-center justify-center">
        <div className="text-center">
          {/* <div className="w-32 h-32 bg-[#540A26] rounded-full mx-auto mb-6"> */}
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          {/* </div> */}
          <h1 className="text-white text-[40px] font-['Playfair_Display']">
            Hevsuite Club
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center px-[52px]">
        <h1 className="text-[32px] font-['Playfair_Display'] mb-14 text-center">
          Welcome Admin!
        </h1>

        <div className="space-y-4 w-full max-w-[380px] mx-auto">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato'] placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato'] placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-2.5 rounded-[4px] text-white cursor-pointer font-['Lato'] text-sm"
            style={{
              background: "linear-gradient(to right, #540A26, #0A5438)",
            }}
          >
            Login
          </button>

          <div className="text-center mt-2">
            <a
              href="#"
              className="text-gray-500 hover:underline text-xs font-['Lato']"
            >
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
