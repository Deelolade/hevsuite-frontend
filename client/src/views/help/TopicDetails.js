import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsBell } from 'react-icons/bs';

const TopicDetails = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(1);

  const questions = [
    {
      id: 1,
      question: "What is Hazor Hevsuite (HH) Club?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet, erat id mattis eleifend, justo libero suscipit mi, eu posuere ex quam sed lectus. Donec ultrices laoreet diam eget bibendum. Cras at luctus nisi, in euismod nisi. Nullam ut nunc vehicula, condimentum mi sit amet, pretium dui. Nulla placerat metus lacus, vel sollicitudin ipsum facilisis a. Duis scelerisque egestas nibh, non faucibus metus ornare sit amet. Cras nisi enim, rutrum ut dapibus a, euismod id leo. Aenean sit amet enim enim. Pellentesque eu faucibus magna.`
    },
    {
      id: 2,
      question: "What is Hazor Hevsuite (HH) Club?",
      answer: "Answer text here..."
    },
    {
      id: 3,
      question: "What is Hazor Hevsuite (HH) Club?",
      answer: "Answer text here..."
    },
    {
      id: 4,
      question: "What is Hazor Hevsuite (HH) Club?",
      answer: "Answer text here..."
    },
    {
      id: 5,
      question: "What is Hazor Hevsuite (HH) Club?",
      answer: "Answer text here..."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black py-4 px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-white">h</Link>
          <div className="flex items-center space-x-6 text-white">
            <Link to="/how-it-works">How it works</Link>
            <Link to="/help-centre">Help centre</Link>
            <Link to="/ask">Ask</Link>
            <div className="relative">
              <BsBell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">2</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/avatar.jpg" alt="User" className="w-8 h-8 rounded-full" />
              <span>Goodluck</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-black text-white px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/help-centre" className="text-gray-400">Popular Topics</Link>
          <span className="text-gray-400">›</span>
          <span>About Hazor Hevsuite (HH) Club</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#540A26] rounded-lg text-white flex items-center justify-center text-2xl">
            h
          </div>
          <h1 className="text-2xl font-bold">About Hazor Hevsuite (HH) Club</h1>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setExpandedQuestion(expandedQuestion === item.id ? null : item.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-[#540A26] rounded-full flex items-center justify-center text-white text-sm">
                    {item.id}
                  </span>
                  <span className="font-semibold">{item.question}</span>
                </div>
                <span className="text-2xl">{expandedQuestion === item.id ? '−' : '+'}</span>
              </button>
              {expandedQuestion === item.id && (
                <div className="p-4 pt-0">
                  <p className="text-gray-600 ml-10">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Follow us</span>
            <Link to="#" className="text-gray-600">Facebook</Link>
            <Link to="#" className="text-gray-600">Twitter</Link>
            <Link to="#" className="text-gray-600">Instagram</Link>
            <Link to="#" className="text-gray-600">LinkedIn</Link>
          </div>
          <div className="flex gap-8">
            <Link to="/policies" className="text-gray-600">Policies</Link>
            <Link to="/about" className="text-gray-600">HH Club & Founder</Link>
          </div>
          <div className="text-gray-600">
            2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TopicDetails;