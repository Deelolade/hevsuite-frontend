import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./views/Dashboard";
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
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />, // Default route for authenticated users
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
