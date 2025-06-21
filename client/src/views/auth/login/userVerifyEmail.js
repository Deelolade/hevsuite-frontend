import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Logo from "../../../assets/logo_white.png"; //" ../assets/logo_white.png";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import authService from "../../../services/authService";

const UserVerifyEmail_ = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("email"));
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-white  p-8 shadow-md max-w-lg relative top-40 m-auto  text-center space-y-5">
        <FaCheckCircle className="mx-auto text-green-500" size={48} />
        <h2 className="text-2xl font-semibold">Email Verified</h2>
        <p className="text-gray-600">
          Your email address has been successfully verified.
        </p>
        <button
          className={`w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440]  text-white rounded-3xl font-secondary text-lg font-medium }`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

// export default UserVerifyEmail;

export default function UserVerifyEmail() {
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      authService
        .verifyEmailLinkToken(token)
        .then((res) => {
          setStatus("success");
        })
        .catch((ex) => {
          setStatus("error");
        });
    };

    verify();
  }, [token]);

  const iconMap = {
    loading: (
      <AiOutlineLoading3Quarters
        className="animate-spin text-blue-500"
        size={48}
      />
    ),
    success: <AiOutlineCheckCircle className="text-green-600" size={48} />,
    error: <AiOutlineCloseCircle className="text-red-500" size={48} />,
  };

  const textMap = {
    loading: "Verifying your email...",
    success: "Email verified successfully!",
    error: "Verification failed. Invalid or expired token.",
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-white  p-8 shadow-md max-w-lg relative top-40 m-auto  text-center space-y-5">
        <div className="flex w-full justify-center "> {iconMap[status]} </div>
        <h2 className="text-xl font-semibold">{textMap[status]}</h2>
        {status === "success" && (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className={`w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440]  text-white rounded-3xl font-secondary text-lg font-medium }`}
          >
            Login
          </button>
        )}
        {status === "error" && (
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="inline-block mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}
