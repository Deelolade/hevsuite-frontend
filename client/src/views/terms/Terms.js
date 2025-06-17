import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TermsOfPolicy from "./TermsOfPolicy";
import TermsOfUse from "./TermsOfUse";
import CookiePolicy from "./CookiePolicy";
import bg_image from "../../assets/header-bg.jpg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../../features/footerSlice";
import CodeOfConduct from "./CodeOfConduct";

const Terms = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  // const tabs = ["Privacy Policy", "Terms of Use", "Cookies Policy"];

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  //   document
  //     .getElementById(tab.replace(/\s+/g, ""))
  //     .scrollIntoView({ behavior: "smooth" });
  // };
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (item) => {
    setActiveTab(item);
    setActiveIndex(0);
    const elementId = item.title.replace(/\s+/g, "").toLowerCase();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { footerData, loading, error } = useSelector((state) => state.footer);
  console.log(footerData);

  const policies = footerData?.data?.find((data) =>
    data.title.toLowerCase().includes("policies")
  );

  console.log(policies);

  const [activeTab, setActiveTab] = useState(policies?.items?.[0] || null);

  const scrollToSection = (index) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (policies?.items?.length > 0 && !activeTab) {
      setActiveTab(policies.items[0]);
    }
  }, [policies?.items, activeTab]);

  useEffect(() => {
    if (!footerData && !loading) {
      dispatch(fetchFooterData());
    }
  }, [dispatch, footerData, loading]);

  return (
    <div className="min-h-screen bg-none ">
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
            <Header />
            <div className="container mx-auto px-4 py-8 ">
              <h1 className="text-2xl font-semibold mb-4 font-secondary mt-20">
                {policies?.title}
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
            {policies?.items?.map((item) => (
              <button
                key={item._id}
                onClick={() => handleTabClick(item)}
                className={`px-2 md:px-3 py-0.5 md:py-1 rounded-3xl text-xs md:text-sm transition-colors ${
                  activeTab?._id === item._id
                    ? "bg-[#540A26] text-white"
                    : "border border-[#540A26] text-[#540A26]"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab?.title === "Privacy Policy" && (
              <TermsOfPolicy policyData={activeTab} searchQuery={searchQuery} />
            )}
            {activeTab?.title === "Term and Conditions" && (
              <TermsOfUse policyData={activeTab} searchQuery={searchQuery} />
            )}
            {activeTab?.title === "Cookie Policy" && (
              <CookiePolicy policyData={activeTab} searchQuery={searchQuery} />
            )}
            {activeTab.title === "Code of Conduct" && (
              <CodeOfConduct policyData={activeTab} searchQuery={searchQuery} />
            )}
          </div>
        </div>

        <Footer />
      </div>

      {/* Desktop View (hidden on smaller screens) */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Header className="absolute top-0 left-0 w-full z-50" />
        </motion.div>

        <div className="flex">
          {/* Left Side - Dark Background with Content */}
          <motion.div
            className="sticky top-0 left-0 h-screen"
            initial={{ width: "100%" }}
            animate={{ width: "50%" }}
            transition={{
              width: { duration: 2, type: "spring" },
            }}
          >
            {/* <div className="w-full sticky top-0 left-0 h-screen"> */}
            <div className="absolute inset-0 z-0">
              <img
                src={bg_image}
                alt="background"
                className="w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <motion.div
              className="relative z-10 min-h-screen p-16 lg:p-24 xl:p-32 font-secondary text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="title text-3xl md:mt-20 lg:text-4xl xl:text-5xl font-semibold mb-8">
                {activeTab?.title}
              </h2>
              <hr className=" border-gray-300 my-5" />
              <div className="content">
                {activeTab?.title === "Privacy Policy" && (
                  <div className="terms-content text-xl md:text-3xl space-y-4 ">
                    {activeTab?.content.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`cursor-pointer ${
                          activeIndex === index ? "text-secondary" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}
                {activeTab?.title === "Term and Conditions" && (
                  <div className="terms-content text-xl md:text-3xl space-y-4">
                    {activeTab?.content.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`cursor-pointer ${
                          activeIndex === index ? "text-secondary" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}
                {activeTab?.title === "Cookie Policy" && (
                  <div className="terms-content text-xl md:text-3xl space-y-4">
                    {activeTab?.content.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`cursor-pointer ${
                          activeIndex === index ? "text-secondary" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}
                {activeTab?.title === "Code of Conduct" && (
                  <div className="terms-content text-xl md:text-3xl space-y-4">
                    {activeTab?.content.map((item, index) => (
                      <p
                        key={index}
                        onClick={() => scrollToSection(index)}
                        className={`cursor-pointer ${
                          activeIndex === index ? "text-secondary" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            {/* </div> */}
          </motion.div>

          {/* Right Side - White Background with Content */}
          <motion.div
            className="absolute top-0 right-0 h-full z-30 bg-white overflow-y-auto p-16 xl:p-20 "
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, width: "50%" }}
            transition={{
              x: { delay: 0.2, duration: 1 },
              opacity: { delay: 0.4, duration: 0.3 },
            }}
          >
            {/* <div className="w-1/2 absolute hidden min-h-screen p-12 lg:p-16 xl:p-20 sm:mt-12 "> */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">
              {policies?.title}
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

            {/* Navigation Tabs */}
            <div className="flex flex-row items-center flex-wrap gap-4 mb-8 mt-12">
              {policies?.items?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handleTabClick(item)}
                  className={`px-4 md:px-4 md:text-lg py-1.5 md:py-2 rounded-3xl transition-colors ${
                    activeTab?._id === item._id
                      ? "bg-[#540A26] text-white"
                      : "border border-[#540A26] text-[#540A26]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Content */}
            <motion.div
              className="pr-8 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {activeTab?.title === "Privacy Policy" && (
                <TermsOfPolicy
                  policyData={activeTab}
                  searchQuery={searchQuery}
                />
              )}
              {activeTab?.title === "Term and Conditions" && (
                <TermsOfUse policyData={activeTab} searchQuery={searchQuery} />
              )}
              {activeTab?.title === "Cookie Policy" && (
                <CookiePolicy
                  policyData={activeTab}
                  searchQuery={searchQuery}
                />
              )}
              {activeTab?.title === "Code of Conduct" && (
                <CodeOfConduct
                  policyData={activeTab}
                  searchQuery={searchQuery}
                />
              )}
            </motion.div>
            {/* </div> */}
          </motion.div>
        </div>
        {/* <Footer/> */}
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
