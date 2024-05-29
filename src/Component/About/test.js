import React, { useState } from "react";
import "./About.css";

const About = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswerVisibility = (questionIndex) => {
    setActiveQuestion((prevActiveQuestion) =>
      prevActiveQuestion === questionIndex ? null : questionIndex
    );
  };

  const isQuestionActive = (questionIndex) => activeQuestion === questionIndex;

  return (
    <>
      <div className="About_back">
        <div className="About">
          <img src="./itrm/join.png"/>
          <h1>Foodify Is New Startup Online Food Ordering System</h1>
          <h3>
            Be A part of Foodify's growth journey by ordering food and supporting us
          </h3>
          <p></p>
        </div>

        <hr />

        <div className="faq">
          <h1>Exploring Foodify: Common Queries</h1>

          <div className="faq_qustion">
            {[1, 2, 3, 4, 5].map((questionIndex) => (
              <div className="q-a" key={questionIndex}>
                <div
                  className="q-wrapper"
                  onClick={() => toggleAnswerVisibility(questionIndex)}
                >
                  <h3 tabIndex="0">{getQuestionText(questionIndex)}</h3>
                  <img
                    src="./svg/down11.png"
                    style={{
                      transform: isQuestionActive(questionIndex)
                        ? "rotate(180deg)"
                        : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }}
                    alt="Toggle"
                  ></img>
                </div>
                <p
                  style={{
                    display: isQuestionActive(questionIndex) ? "block" : "none",
                  }}
                >
                  {getAnswerText(questionIndex)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const getQuestionText = (questionIndex) => {
  switch (questionIndex) {
    case 1:
      return "What is Foodify?";
    case 2:
      return "How does Foodify work?";
    case 3:
      return "Can I customize my orders?";
    case 4:
      return "How can I pay for my order?";
    case 5:
      return "Can I track my order?";
    default:
      return "";
  }
};

const getAnswerText = (questionIndex) => {
  switch (questionIndex) {
    case 1:
      return "Foodify is an online platform that allows users to browse and order food from available restaurants on the web.";
    case 2:
      return "Users can visit the Foodify website, browse through the list of foods, select their preferred dishes, and place an order online. The order is then delivered to their specified location.";
    case 3:
      return "Yes, many restaurants on Foodify allow customization of dishes. You can add special instructions or request modifications before placing your order.";
    case 4:
      return "Foodify typically accepts various payment methods, including credit/debit cards, online wallets, and other digital payment options. Check the available payment methods during the checkout process.";
    case 5:
      return "Yes, Foodify provides a tracking feature that allows you to monitor the status of your order in real-time. You'll receive updates on when the order is confirmed, in preparation, and out for delivery.";
    default:
      return "";
  }
};

export default About;
