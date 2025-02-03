"use client"
import React, { useState, useRef, useEffect } from "react";
import "./Faq.css";

const faqData1 = [
  {
    question: "Is Insurance Sathi an insurance provider?",
    answer: "Insurance Sathi is not an insurance provider. We are a comparison platform that helps you compare different life insurance plans available in Nepal."
  },
  {
    question: "Does Insurance Sathi recommend which insurance plan to buy?",
    answer: "No, Insurance Sathi does not recommend specific insurance plans. We provide unbiased comparisons to help you make informed decisions based on your needs and preferences."
  },
  {
    question: "How does Insurance Sathi make money?",
    answer: "Insurance Sathi earns money from the Adverts displayed on the website currently."
  },
];

const faqData2 = [
  {
    question: "Is my personal information safe on Insurance Sathi?",
    answer: "Yes, we take your privacy seriously. Your personal information is encrypted and securely stored. We only use it to provide you with accurate insurance comparisons and do not sell your data to third parties."
  },
  {
    question: "How accurate are the AI predictions on Insurance Sathi?",
    answer: "Our AI tools provide estimates based on historical data and mathematical models. While they can offer valuable insights, actual outcomes may vary based on individual circumstances and market conditions."
  }
];

export default function Faq() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const refs = useRef([]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="heading">
        Frequently Asked Questions
      </div>
      <div className="faq">
        <div className="faqContainer">
          {faqData1.map((item, index) => (
            <div key={index} className="faqItem" onClick={() => toggleExpand(index)}>
              <div className="faqHeader">
                <div className="faqQuestion">
                  {item.question}
                </div>
                <div className={`arrow ${expandedIndex === index ? 'expanded' : ''}`}>
                  ꜜ
                </div>
              </div>
              <div
                ref={(el) => (refs.current[index] = el)}
                className="faqAnswer"
                style={{
                  height: expandedIndex === index ? `${refs.current[index]?.scrollHeight}px` : "0",
                  overflow: "hidden",
                  transition: "height 0.5s ease-in-out"
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
        <div className="faqContainer">
          {faqData2.map((item, index) => (
            <div key={index + faqData1.length} className="faqItem" onClick={() => toggleExpand(index + faqData1.length)}>
              <div className="faqHeader">
                <div className="faqQuestion">
                  {item.question}
                </div>
                <div className={`arrow ${expandedIndex === index + faqData1.length ? 'expanded' : ''}`}>
                  ꜜ
                </div>
              </div>
              <div
                ref={(el) => (refs.current[index + faqData1.length] = el)}
                className="faqAnswer"
                style={{
                  height: expandedIndex === index + faqData1.length ? `${refs.current[index + faqData1.length]?.scrollHeight}px` : "0",
                  overflow: "hidden",
                  transition: "height 0.5s ease-in-out"
                }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
