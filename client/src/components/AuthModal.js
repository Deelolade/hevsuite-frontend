import Logo from "../assets/logo_white.png";

const AuthModal = ({ open, description, title, loading }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Card */}
      <div className="relative z-10 w-full max-w-xl py-10 px-6 bg-white  shadow-xl">
        <div className="flex flex-col gap-6">
          {/* image */}
          <div className="flex w-full justify-center">
            <img src={Logo} alt="HevSuite Logo" />
          </div>
          {/* body */}
          <div className="flex flex-col gap-4 w-full items-center">
            <h1 className="text-2xl font-semibold"> {title} </h1>
            <p className="text-gray-600 text-lg">{description}</p>
            {loading && (
              <div className=" max-w-xl m-auto w-full flex justify-center items-center mt-2">
                <div className="w-12 h-12 border-l border-[#540A26] rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
