import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import Landing from "./views/landing/Landing";
import Login from "./views/auth/login/Login";
import ForgotPassword from "./views/auth/login/ForgotPassword";
import ResetPassword from "./views/auth/login/ResetPassword";
import ResetSuccess from "./views/auth/login/ResetSuccess";
import AuthLayout from "./views/AuthLayout";
import TwoFactorAuth from "./views/auth/2FA/TwoFactorAuth";
import CodeVerification from "./views/auth/2FA/CodeVerification";
import EmailVerification from "./views/auth/2FA/EmailVerification";
import PhoneVerification from "./views/auth/2FA/PhoneVerification";
import Success from "./views/auth/2FA/Success";
import Register from "./views/auth/register/Register";
import RegisterStep2 from "./views/auth/register/RegisterStep2";
import RegisterStep3 from "./views/auth/register/RegisterStep3";
import RegisterStep4 from "./views/auth/register/RegisterStep4";
import RegisterStep5 from "./views/auth/register/RegisterStep5";
import RegisterStep6 from "./views/auth/register/RegisterStep6";
import RegisterStep7 from "./views/auth/register/RegisterStep7";
import Homepage from "./views/homepage/Homepage";
import Events from "./views/homepage/Events";
import Ask from "./views/ask/Ask";
import Topics from "./views/help/Topics";
import TopicDetails from "./views/help/TopicDetails";
import Terms from "./views/terms/Terms";
import HowItWorks from "./views/how-it-works/HowItWorks";
import News from "./views/news/News";
import NewsDetail from "./views/news/NewsDetail";
import axios from "axios";
import MakeSubscriptionPayment from "./views/account/settings/components/paymentChannels.js/subscriptionPayments";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import MaintenancePage from "./components/MaintainanceMode";
import { fetchGeneralSettings } from "./features/generalSettingSlice";
// import NotFound from "./views/NotFound";
import ErrorPage from "./views/ErrorPage";
import constants from "./constants";
import ApplicationDeclined from "./views/auth/ApplicationDeclined";
import PageWrapper from "./components/PageWrapper";
import UserVerifyEmail from "./views/auth/login/userVerifyEmail";
import UpcomingEvents from "./views/account/events/UpcomingEvents";
import SelectedEvent from "./views/homepage/SelectedEvent";
import PenaltyModal from "./components/PenaltyModal";

axios.defaults.withCredentials = true;

const AuthenticatedOnly = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { rehydrated } = useSelector((state) => state._persist);
  const location = useLocation();

  if (!rehydrated)
    return (
      <div className="min-h-screen max-w-xl m-auto w-full flex justify-center items-center">
        <div className="w-12 h-12 border-l border-[#540A26] rounded-full animate-spin">
          {" "}
        </div>
      </div>
    );

  if (!isAuthenticated && !user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check membership status if user exists
  // if (user && user.membershipStatus !== "accepted") {
  //   return <Navigate to="/register-6" replace />;
  // }
  // if (user && user.joinFeeStatus !== "paid") {
  //   return <Navigate to="/register-6" replace />;
  // }
  // if (user && user.membershipStatus && user.membershipStatus !== 'accepted' || user.joinFeeStatus !== 'paid') {
  //   return <Navigate to="/register-6" state={{ from: location }} replace />;
  // }

  return children;
};

const PenaltyHandler = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isPenalized) {
      // If user is penalized and not on homepage, redirect
      if (location.pathname !== "/homepage") {
        navigate("/homepage", { replace: true });
      }
      // Always show modal for penalized users
      setShowPenaltyModal(true);
    } else {
      setShowPenaltyModal(false);
    }
  }, [user?.isPenalized, location.pathname, navigate]);

  const handlePenaltyModalClose = () => {
    setShowPenaltyModal(false);
  };

  return (
    <>
      {children}
      {showPenaltyModal && (
        <PenaltyModal
          isOpen={showPenaltyModal}
          onClose={handlePenaltyModalClose}
        />
      )}
    </>
  );
};
// Add this new component
const LoginRedirect = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { Settings } = useSelector((state) => state.generalSettings);
  const location = useLocation();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const hasToken = searchParams.get("token");
  if (hasToken) {
    return children;
  }

  if (isAuthenticated && user) {
    if (user.membershipStatus === constants.membershipStatus.declined)
      return (
        <Navigate
          to="/application-declined"
          state={{ from: location }}
          replace
        />
      );

    if (
      user.membershipStatus === constants.membershipStatus.accepted &&
      user.joinFeeStatus === constants.joinFeeStatus.paid
    )
      return <Navigate to="/homepage" state={{ from: location }} replace />;

    if (
      user.membershipStatus === constants.membershipStatus.accepted &&
      user.joinFeeStatus === constants.joinFeeStatus.pending &&
      Settings?.membershipFee
    )
      return <Navigate to="/register-7" state={{ from: location }} replace />;

    if (Settings?.requiredReferralNumber <= 0 && !Settings?.membershipFee)
      return <Navigate to="/homepage" state={{ from: location }} replace />;

    const allReferredByApproved = user.referredBy.every(
      (r) => r.status.toLowerCase() === constants.referredByStatus.approved
    );
    if (
      user.approvedByAdmin ||
      (allReferredByApproved &&
        user.referredBy.length === user.requiredReferrals) ||
      user.membershipStatus === constants.membershipStatus.accepted
    )
      return <Navigate to="/homepage" state={{ from: location }} replace />;

    return <Navigate to="/register-6" state={{ from: location }} replace />;

    //  // all referredBy declined
    //   const allReferredByDeclined = user.referredBy.every(r => r.status.toLowerCase() === constants.referredByStatus.declined);
    //   if(allReferredByDeclined && user.referredBy.length > 0 && user.requiredReferrals > 0) return <Navigate to="/application-declined" state={{from: location}} replace />

    //   if (user.requiredReferrals <= 0 && !Settings.membershipFee)
    //       return <Navigate to="/homepage" state={{ from: location }} replace />;

    //   // only membership is on
    //   if (user.requiredReferrals <= 0 && Settings.membershipFee) {
    //     if(user.joinFeeStatus === constants.joinFeeStatus.paid) return <Navigate to="/homepage" state={{ from: location }} replace />;
    //     return <Navigate to="/register-7" state={{ from: location }} replace />;
    //   }

    //   // referrals on
    //   const allReferredByApproved = user.referredBy.every(r => r.status.toLowerCase() === constants.referredByStatus.approved);
    //   if (user.approvedByAdmin || allReferredByApproved) {
    //     //if membeshipFee is on
    //     if (Settings.membershipFee) return <Navigate to="/register-7" state={{ from: location }} replace />;
    //     else return <Navigate to="/homepage" state={{ from: location }} replace />;

    //   }

    //   // not approved
    //   return <Navigate to="/register-6" state={{ from: location }} replace />;
  }

  // if (isAuthenticated) {
  //   // Redirect to homepage or wherever you want logged-in users to go
  //   if (
  //     user &&
  //     user.membershipStatus &&
  //     user.membershipStatus === "accepted" &&
  //     user.joinFeeStatus === "paid"
  //   ) {
  //     return <Navigate to="/homepage" state={{ from: location }} replace />;
  //   } else if (
  //     user &&
  //     user.membershipStatus &&
  //     user.membershipStatus === "accepted" &&
  //     user.joinFeeStatus === "pending"
  //   ) {
  //     return <Navigate to="/register-6" state={{ from: location }} replace />;
  //   } else if (
  //     user &&
  //     user.membershipStatus &&
  //     user.membershipStatus === "pending"
  //   ) {
  //     return <Navigate to="/register-6" state={{ from: location }} replace />;
  //   }
  // }
  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/news",
    element: <News />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/news-detail/:id",
    element: <NewsDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <LoginRedirect>
        <Login />
      </LoginRedirect>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-success",
    element: <ResetSuccess />,
    errorElement: <ErrorPage />,
  },
  {
    path: "two-factor-auth",
    element: <TwoFactorAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/phone-verification",
    element: <PhoneVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/code-verification",
    element: <CodeVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/success",
    element: <Success />,
    errorElement: <ErrorPage />,
  },
  {
    path: "topics",
    element: <Topics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "topic-details/:id",
    element: <TopicDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "terms",
    element: (
      <PageWrapper>
        <Terms />
      </PageWrapper>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "how-it-works",
    element: <HowItWorks />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/verify-email",
    element: <UserVerifyEmail />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-2",
    element: <RegisterStep2 />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-3",
    element: <RegisterStep3 />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-4",
    element: <RegisterStep4 />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-5",
    element: <RegisterStep5 />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-6",
    element: (
      <AuthenticatedOnly>
        <RegisterStep6 />,
      </AuthenticatedOnly>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register-7",
    element: (
      <AuthenticatedOnly>
        <RegisterStep7 />,
      </AuthenticatedOnly>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/application-declined",
    element: (
      <AuthenticatedOnly>
        <ApplicationDeclined />,
      </AuthenticatedOnly>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PenaltyHandler>
          <AuthLayout />
        </PenaltyHandler>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <SelectedEvent />,
      },
      {
        path: "upcoming-events",
        element: <UpcomingEvents />,
      },
      {
        path: "ask",
        element: <Ask />,
      },
      {
        path: "topics",
        element: <Topics />,
      },
      {
        path: "topic-details/:id",
        element: <TopicDetails />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      // {
      //   path: "make-one-time-payment",
      //   element: <OneTimePayment />,
      // },
      {
        path: "make-subscription-payment",
        element: <MakeSubscriptionPayment />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { Settings } = useSelector((state) => state.generalSettings);
  const { isAuthenticated } = useSelector((state) => state.auth); // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(fetchProfile());
  //   }
  // }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(fetchGeneralSettings()).unwrap();
        if (isAuthenticated) {
          await dispatch(fetchProfile()).unwrap();
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    initializeApp();
  }, [dispatch, isAuthenticated]);
  if (Settings?.maintenanceMode) {
    return <MaintenancePage />;
  }
  return <RouterProvider router={router} />;
}

export default App;
