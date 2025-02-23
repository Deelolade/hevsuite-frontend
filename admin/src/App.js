import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/auth/Login";
import MainLayout from "./views/MainLayout";
import Dashboard from "./views/Dashboard";
import Success from "./views/auth/Success";
import CodeVerification from "./views/auth/CodeVerification";
import PhoneVerification from "./views/auth/PhoneVerification";
import EmailVerification from "./views/auth/EmailVerification";
import TwoFactorAuth from "./views/auth/TwoFactorAuth";

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
      //   { path: "profile", element: <Profile /> },
      //   { path: "users", element: <Users /> },
      //   { path: "managers", element: <Manager /> },
      //   { path: "printers", element: <Printers /> },
      //   { path: "riders", element: <Riders /> },
      //   { path: "products", element: <Products /> },
      //   { path: "product-types", element: <ProductTypes /> },
      //   { path: "product-categories", element: <ProductCategories /> },
      //   { path: "countries", element: <Country /> },
      //   { path: "regions", element: <Region /> },
      //   { path: "subregions", element: <SubRegion /> },
      //   { path: "locations", element: <Location /> },
      //   { path: "colors", element: <Colors /> },
      //   { path: "images", element: <Images /> },
      //   { path: "image-types", element: <ImageTypes /> },
      //   { path: "image-categories", element: <ImageCategories /> },
      //   { path: "map", element: <MapComponent /> },
      //   { path: "coupons", element: <Coupon /> },
      //   { path: "sizes", element: <Size /> },
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
