import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
// import {toast} from "react-hot-toast"
// import { useDispatch } from "react-redux";

const Login = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)

    // dispatch(login(formData))
    // .then((response) => {
    //   if (response.payload.success) {
              navigate("/two-factor-auth");
    // } else {
    //    toast.error(response.payload.message || "Invalid username or password")
    // }
    // .catch((error) => {
    //   toast.error("An error occurred while logging in.");
    // });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-[#1A1A1A] flex items-center justify-center p-8">
        <div className="text-center">
          <img 
            src={logo_white} 
            alt="Hevsuite Club" 
            className="w-32 h-32 mx-auto mb-4" 
          />
          <h1 className="text-white text-4xl font-['Playfair_Display']">
            Hevsuite Club
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-[32px] font-['Playfair_Display'] text-center mb-12">
            Welcome Admin!
          </h1>
          <div className="flex items-center justify-center  ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-center" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-3xl text-sm focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <RiLockPasswordLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-3xl text-sm focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-3xl text-white text-sm font-medium bg-gradient-to-r from-[#540A26] to-[#1F4F46] hover:opacity-90 transition-opacity"
            >
              Login
            </button>

            <div className="text-center">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Forgot Password
              </a>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
