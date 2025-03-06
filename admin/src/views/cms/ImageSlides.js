import { useState } from "react";
import { Link } from "react-router-dom";
import Background from  "../../assets/party.jpg";
import HeaderOne from "./HeaderOne";

export const ImageSlides = ({
  savedSlides = [],
  showLink = true,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // console.log(savedSlides);

  // if (!savedSlides.length) {
  //   return <div>No slides available</div>;
  // }

  const { image, title, content, path } = savedSlides[currentSlide];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div className="relative">
        <HeaderOne/>
      {savedSlides.length > 1 && (
        <div className="absolute bottom-[8%] left-1/2 z-10 flex -translate-x-1/2 flex-row gap-4">
          {savedSlides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full border-2 ${
                currentSlide === index
                  ? "border-white bg-white"
                  : "border-gray-400 bg-gray-400"
              }`}
              type="button"
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      )}
      <div
        className={`relative w-full h-[50vh] md:h-[65vh] bg-cover bg-center`}
        style={{ backgroundImage: `url(${image ? image : Background})` }}
      >
        <div className="absolute lg:pt-20 inset-0 bg-transparent flex flex-col items-center justify-center gap-3 text-white text-center p-6">
          <h1 className="text-white text-4xl mb-6 tracking-wide  lg:text-6xl lg:scale-110 md:text-5xl font-bold w-full lg:w-[60%]">
            {title}
          </h1>
          {/* <p className="text-[17px] md:text-[18px] font-[400]"> */}

          <div dangerouslySetInnerHTML={{ __html: content }} />
          {/* {text} */}
          {/* </p> */}
          {showLink && (
            <Link
              to={path}
              className="bg-[#000080] py-4 px-10 rounded-lg mt-10"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
