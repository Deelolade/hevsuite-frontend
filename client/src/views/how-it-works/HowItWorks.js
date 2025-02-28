import React from "react";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import Footer from "../../components/Footer";
import email_camp from "../../assets/email_camp.png";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 2,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 3,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 4,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 5,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
    {
      number: 6,
      title: "Become a Member",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus.",
    },
  ];

  return (
    <div>
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="relative z-10 text-center py-16">
            <p className="text-gray-200 font-secondary text-4xl">
              How Hevsuite Club Works?
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-24">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#540A26] text-primary font-bold flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-[#540A26] to-[#1F4F46] py-6 px-4 max-w-4xl rounded-2xl mx-auto mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <img src={email_camp} alt="FAQ" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-white mb-2">
                Have Question in mind?
              </h3>
              <p className="text-white/80">
                We'll help you in everything you need.
              </p>
            </div>
          </div>
          <button className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#1F4F46] text-white rounded-3xl ">
            Check our FAQs
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
