import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import RegisterStep8 from "./views/auth/register/RegisterStep8";
import Homepage from "./views/homepage/Homepage";
import Events from "./views/homepage/Events";
import Ask from "./views/ask/Ask";
import Topics from "./views/help/Topics";
import TopicDetails from "./views/help/TopicDetails";
import Terms from "./views/terms/Terms";
import HowItWorks from "./views/how-it-works/HowItWorks";
import News from "./views/news/News";
import NewsDetail from "./views/news/NewsDetail";

const isAuthenticated = () => {
  return localStorage.getItem("user") === null;
  // return localStorage.getItem("user") !== null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    window.location.href = "/login"; // Redirect to login if not authenticated
    return null;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/news-detail",
    element: <NewsDetail />,
  },
  { path: "login", element: <Login /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password", element: <ResetPassword /> },
  { path: "reset-success", element: <ResetSuccess /> },
  { path: "two-factor-auth", element: <TwoFactorAuth /> },
  {
    path: "/email-verification",
    element: <EmailVerification />,
  },
  {
    path: "/phone-verification",
    element: <PhoneVerification />,
  },
  {
    path: "/code-verification",
    element: <CodeVerification />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-2",
    element: <RegisterStep2 />,
  },
  {
    path: "/register-3",
    element: <RegisterStep3 />,
  },
  {
    path: "/register-4",
    element: <RegisterStep4 />,
  },
  {
    path: "/register-5",
    element: <RegisterStep5 />,
  },
  {
    path: "/register-6",
    element: <RegisterStep6 />,
  },
  {
    path: "/register-7",
    element: <RegisterStep7 />,
  },
  {
    path: "/register-8",
    element: <RegisterStep8 />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
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
      //   path: "events",
      //   element: <Events />,
      // },
      // {
      //   path: "users",
      //   element: <Users />,
      // },
    ],
  },
  // errorElement: <ErrorPage />,
  // children: [
  // { index: true, element: <Home /> },
  // { path: "/", element: <Login /> },
  // { path: "/signup", element: <Signup /> },
  // { path: "/verify-email", element: <VerifyEmail /> },
  // { path: "/forgot-password", element: <ForgotPassword /> },
  // { path: "reset-password/:token", element: <ResetPassword /> },
  // {
  //   path: "/profile",
  //   element: (
  //     <PrivateRoutes>
  //       <Profile />
  //     </PrivateRoutes>
  //   ),
  // },
  // ],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
