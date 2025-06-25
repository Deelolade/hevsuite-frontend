import { useRouteError, useLocation } from "react-router-dom";
import { MdError } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();

  const is404 = !error && location.pathname !== "/";

  const errorInfo = error
    ? {
        status: error.status || 500,
        statusText: error.statusText || "Internal Server Error",
        message:
          error.message || "Something went wrong. Please try again later.",
      }
    : is404
    ? {
        status: 404,
        statusText: "Page Not Found",
        message: "The page you're looking for doesn't exist or has been moved.",
      }
    : {
        status: 500,
        statusText: "Unknown Error",
        message: "An unexpected error occurred.",
      };

  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <MdError className="w-12 h-12 text-red-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {errorInfo.statusText}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              {errorInfo.message}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoBack}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
