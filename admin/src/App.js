import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/auth/Login";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Success from "./views/auth/Success";
import CodeVerification from "./views/auth/CodeVerification";
import PhoneVerification from "./views/auth/PhoneVerification";
import EmailVerification from "./views/auth/EmailVerification";
import TwoFactorAuth from "./views/auth/TwoFactorAuth";
import Pending from "./views/pending/Pending";
import ViewPending from "./views/pending/ViewPending";
import UserManagement from "./views/user-management/UserManagement";
import ClubCards from "./views/cards/ClubCards";
import CMS from "./views/cms/CMS";
import Event from "./views/events/Event";
import News from "./views/news/News";
import Ask from "./views/ask/Ask";
import Help from "./views/help/Help";
import Support from "./views/support/Support";
import Finance from "./views/finance/Finance";
import Admins from "./views/admins/Admins";
import Settings from "./views/settings/Settings";
import AdminProfile from "./views/profile/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      //   <OpenRoutes>
      <Login />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/two-factor-auth",
    element: (
      //   <OpenRoutes>
      <TwoFactorAuth />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/email-verification",
    element: (
      //   <OpenRoutes>
      <EmailVerification />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/phone-verification",
    element: (
      //   <OpenRoutes>
      <PhoneVerification />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/code-verification",
    element: (
      //   <OpenRoutes>
      <CodeVerification />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/success",
    element: (
      //   <OpenRoutes>
      <Success />
      //   </OpenRoutes>
    ),
  },
  {
    path: "/admin",
    element: (
      //   <PrivateRoutes>
      <MainLayout />
      //   </PrivateRoutes>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "pending", element: <Pending /> },
      { path: "view-pending", element: <ViewPending /> },
      { path: "users", element: <UserManagement /> },
      { path: "cards", element: <ClubCards /> },
      { path: "cms", element: <CMS /> },
      { path: "events", element: <Event /> },
      { path: "news", element: <News /> },
      { path: "asks", element: <Ask /> },
      { path: "help", element: <Help /> },
      { path: "support", element: <Support /> },
      { path: "finance", element: <Finance /> },
      { path: "admins", element: <Admins /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <AdminProfile /> },
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
