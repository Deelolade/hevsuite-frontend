import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    },
    {
      number: 2,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    },
    {
      number: 3,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    },
    {
      number: 4,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    },
    {
      number: 5,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    },
    {
      number: 6,
      title: "Become a Member",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum feugiat odio, non tempor sem sagittis sed. Proin consectetur turpis finibus sapien mollis, a porta felis cursus."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-[#540A26] to-[#1F4F46] mb-16">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl font-semibold text-white">How Hevsuite Club Works?</h1>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#540A26] text-white flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">{step.number}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-r from-[#540A26] to-[#1F4F46] py-12 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <img src="/faq-icon.png" alt="FAQ" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-medium text-white mb-2">Have Question in mind?</h3>
              <p className="text-white/80">We'll help you in everything you need.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90 transition-colors">
            Check our FAQs
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
