import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../../components/AuthModal";
import { useState } from "react";
import Logo from "../../assets/logo_white.png";
import  { useMemo } from "react";
import moment from "moment";
import { logout } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

const ApplicationDeclined = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [logOutLoading, setLogOutLoading] = useState(false);

  const handleLogout = () => {

    setLogOutLoading(true);

    dispatch(logout()).unwrap()
    .catch(ex => toast.error(ex))
    .finally(() => { setTimeout(() => { setLogOutLoading(false) }, 1000) })

  };

  const timeLeft = useMemo(() => {
    const retryAt = moment(user.createdAt).add(3, "months");
    const now = moment();

    if (now.isAfter(retryAt)) return null;

    const duration = moment.duration(retryAt.diff(now));

    const months = Math.floor(duration.asMonths());
    const days = duration.days();

    let parts = [];
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.join(" ");
  }, [user.createdAt]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <AuthModal
        loading
        open={logOutLoading}
        title="Logging Out"
        description="Sigining out your account..."
      />

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
        <div className="w-full flex justify-center mb-4">
          <img src={Logo} alt="Logo" />
        </div>
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Application Declined
        </h1>
        <p className="text-gray-700 mb-4">
          All the users you referred have declined your request.
        </p>

        {timeLeft ? (
          <p className="text-sm text-gray-500 mb-6">
            You can try again in{" "}
            <span className="font-semibold">{timeLeft}</span>.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            You can try referring new users now.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button onClick={handleLogout} className="bg-[#540A26] hover:bg-[#540A26]/90 text-white py-2 px-4 rounded">
            Logout
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDeclined;
