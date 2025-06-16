import React, { useEffect, useState } from "react";
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

  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    // Re-parse savedContent here to ensure showInToc is included
    const latestSavedContent = JSON.parse(sessionStorage.getItem("contents") || "[]");
    console.log("Saved Content from sessionStorage:", latestSavedContent);
    const filteredTableOfContents = latestSavedContent.filter(content => content.showInToc);
    console.log("Filtered Table of Contents:", filteredTableOfContents);
    setTableOfContents(filteredTableOfContents);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative md:p-6 md:-mr-10">
      <div className="flex items-center mb-4 justify-between">
        <div
          className="p-2 rounded-full flex items-center gap-2 px-6 border border-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
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
          showLink={false}
          nullify={true}
          savedSlides={savedSlides}
        />
      )}

      {savedSlides.length === 0 && <div className="pt-20"></div>}
      <div className="mt-10"></div>

      {/* Table of Contents */}
      {/* {tableOfContents.length > 0 && (
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {tableOfContents.map((content, index) => (
              <li key={content.id || index} className="text-gray-700 hover:text-primary">
                <a href={`#content-${content.id || index}`} className="flex items-center gap-2">
                  <span className="text-primary">{index + 1}.</span>
                  {content.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )} */}

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
