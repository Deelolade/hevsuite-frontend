import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import authImage from "../../assets/image.jpg";
import { toast } from "react-hot-toast";
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
      <div
        className="w-full pb-2 absolute md:relative md:w-2/5 bg-[#1A1A1A] flex items-center justify-center md:p-8"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div> */}
        <div className="text-center">
          <img
            src={logo_white}
            alt="Hevsuite Club"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-white text-4xl font-primary">Hevsuite Club</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-[48px] mt-10 font-secondary font-bold md:font-medium text-center mb-12">
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-80 pl-12 pr-4 py-3 font-secondary text-[16px] border border-gray-200 rounded-3xl text-sm focus:outline-none leading-[20px]"
                  required
                />
              </div>

              <div className="relative">
                <RiLockPasswordLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-80 pl-12 pr-4 py-3 text-[16px] border border-gray-200 rounded-3xl text-sm focus:outline-none leading-[20px]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-3xl text-white text-[20px] font-secondary text-sm font-medium bg-gradient-to-r from-primary to-[#1F4F46] hover:opacity-90 transition-opacity leading-[30px]"
              >
                Login
              </button>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Forgot password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
