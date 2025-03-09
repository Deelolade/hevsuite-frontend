import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TermsOfPolicy from "./TermsOfPolicy";
import TermsOfUse from "./TermsOfUse";
import CookiePolicy from "./CookiePolicy";
import bg_image from "../../../assets/header-bg.jpg";

const Terms = ({ contents, title }) => {
  const [activeTab, setActiveTab] = useState("Terms of Policy");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Terms of Policy", "Terms of Use", "Cookies Policy"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  //   document
  //     .getElementById(tab.replace(/\s+/g, ""))
  //     .scrollIntoView({ behavior: "smooth" });
  // };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const elementId = tab.replace(/\s+/g, "").toLowerCase();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative w-fit bg-white">
      {/* Mobile View (hidden on md and larger screens) */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div className="relative text-white">
          <div className="absolute inset-0 z-0">
            <img
              src={bg_image}
              alt="background"
              className="w-full h-[200px] object-cover brightness-50"
            />
          </div>
          <div className="relative z-10">
            <div className="container mx-auto px-4 py-8 ">
              <h1 className="text-2xl font-semibold mb-4 font-secondary mt-20">
                Policies
              </h1>

              {/* Search Bar */}
              <div className="relative max-w-md mb-2">
                <input
                  type="text"
                  placeholder="Search article here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm text-gray-800 text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 flex-grow ">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-2 md:px-3 py-0.5 md:py-1 rounded-3xl text-xs md:text-sm transition-colors ${
                  activeTab === tab
                    ? "bg-[#540A26] text-white"
                    : "border border-[#540A26] text-[#540A26]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {contents[0].content !== "" &&
              contents.map((r, index) => (
                <div key={index}>
                  <div className="ql-editor bg-white rounded-lg [&_a]:text-blue-500 [&_a]:underline">
                    <div
                      dangerouslySetInnerHTML={{ __html: r.content }}
                      className="z-50 "
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Desktop View (hidden on smaller screens) */}
      <div className="hidden md:block">
        <div className="flex flex-row relative">
          {/* Left Side - Dark Background with Content */}
          <div className="sticky top-0 left-0 h-screen w-1/2">
            <div className="absolute inset-0 z-0">
              <img
                src={bg_image}
                alt="background"
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 h-full p-16 lg:p-24 xl:p-32 font-secondary text-white">
              <h2 className="title text-3xl md:mt-20 lg:text-4xl xl:text-5xl font-semibold mb-8">
                {JSON.parse(title)}
              </h2>
              <div className="content">
                {activeTab === "Terms of Policy" && (
                  <div className="terms-content">
                    {contents[0].title !== "" &&
                      contents.map((r, index) => (
                        <p
                          className={index === 0 && "text-secondary"}
                          id="termsofpolicy"
                          index={index}
                        >
                          {r.title}{" "}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - White Background with Scrollable Content */}
          <div className="w-1/2 ml-auto min-h-screen p-12 lg:p-16 xl:p-20 overflow-y-auto">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
              Policies
            </h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search article here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm"
              />
            </div>

            {/* Content */}
            <div className="pr-8">
              {/* {JSON.stringify(contents)} */}
              {contents[0].content !== "" &&
                contents.map((r, index) => (
                  <div key={index}>
                    <div className="ql-editor bg-white rounded-lg [&_a]:text-blue-500 [&_a]:underline">
                      <div
                        dangerouslySetInnerHTML={{ __html: r.content }}
                        className="z-50 "
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

<style jsx>{`
  .terms-content {
    text-align: center;
  }
  .title {
    text-align: center;
    margin-top: 20rem;
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    .terms-content p {
      font-size: 0.9rem; /* Smaller text size */
    }
  }
`}</style>;
