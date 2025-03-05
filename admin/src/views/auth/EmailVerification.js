import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_white from "../../assets/logo_white.png";
import { MdEmail } from "react-icons/md";
import authImage from "../../assets/image.jpg";

// import { useDispatch } from "react-redux";

const EmailVerification = () => {
  // const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    const data = {
      email: email,
    };
    // console.log(data)
    // dispatch(emailVerify(data))
    navigate("/code-verification", { state: { type: "email" } });
  };

  return (
    <div className="flex h-screen">
      <div
        className="md:w-2/5 w-full absolute md:relative pb-2 bg-[#1A1A1A] flex items-center justify-center p-8"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <img src={logo_white} alt="logo" className="w-32 h-32 mx-auto mb-6" />
          <h1 className="text-white text-[40px] font-primary">Hevsuite Club</h1>
        </div>
      </div>
      <div className="flex-1 mt-10 flex flex-col justify-center px-[52px] bg-white">
        <div className="w-full max-w-[380px] mx-auto">
          <h1 className="text-[32px] font-primary mb-3 text-center">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-500 text-sm font-['Lato'] text-center mb-8">
            We'll text a verification code to this email whenever you sign-in to
            your account
          </p>

          <div className="space-y-4">
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-0 font-['Lato']"
                required
              />
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3.5 rounded-3xl text-white text-sm font-secondary"
              style={{
                background: "linear-gradient(to right, #540A26, #0A5438)",
              }}
            >
              Verify
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full text-center text-gray-500 text-sm font-['Lato']"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
