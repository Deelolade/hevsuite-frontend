// import Footer from "@/components/shared/HomeLayout/footer_new";
// import Header from "@/components/shared/HomeLayout/header";
// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
// import { Button, Tooltip } from "antd";
// import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageSlides } from "./ImageSlides";
import Profile from "../../components/Profile";
import { BiArrowBack } from "react-icons/bi";
import HeaderOne from "./HeaderOne";
import Terms from "./terms-system/Terms";

export default function PageSystemPreview() {
  const navigate = useNavigate();
  const image = sessionStorage.getItem("uploadedImage") || "";
  const title = sessionStorage.getItem("mainText") || "";

  const editorContent = sessionStorage.getItem("editorContent") || "";
  const savedMembers = JSON.parse(sessionStorage.getItem("members")) || [];
  const savedContent = JSON.parse(sessionStorage.getItem("contents")) || [];
  const savedSlides = JSON.parse(sessionStorage.getItem("slides")) || [];
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative md:p-6 md:-mr-10">
      <div className="flex items-center mb-4 justify-between">
        <div
          className="p-2 rounded-full flex items-center gap-2  px-6 border border-gray-500 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack /> Back
        </div>
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative"></div>
        </div>
        <Profile />
      </div>

      {/* <Header /> */}
      {/* <HeaderOne /> */}
      {savedSlides.length > 0 && (
        <ImageSlides
          // title={savedSlides[0].title}
          // text={savedSlides[0].content}
          // path="/auth"
          showLink={false}
          // img={image}
          nullify={true}
          savedSlides={savedSlides}
        />
      )}

      {savedSlides.length === 0 && <div className="pt-20"></div>}
      <div className="mt-10"></div>
      <Terms contents={savedContent} title={title}/>
      {/* {savedContent !== "" &&
        savedContent.map((r, index) => (
          <div key={index}>
            <div className="ql-editor bg-white rounded-lg [&_a]:text-blue-500 [&_a]:underline">
              <div
                dangerouslySetInnerHTML={{ __html: r.content }}
                className="z-50 "
              />
            </div>
          </div>
        ))} */}

      <div className="mt-10"></div>
      {/* <Footer /> */}
    </div>
  );
}
