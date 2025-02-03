"use client";
import React from "react";
import Link from "next/link"; // Import Link for navigation
import "./Footer.css";

export default function Footer() {
  const resList = [
    { text: "Premium Amount Calculator", link: "/premiumCalculator" },
    { text: "Term Completion Finder", link: "/aiprediction" }, // Add correct path when available
    { text: "Payout Lasting Calculator", link: "/yearslasting" },
    { text: "List of all life policies", link: "/listofpolicies" },
    { text: "Addon Details", link: "/addonsdetails" }, // Add correct path when available
  ];

  const resListArr = resList.map((item, index) => (
    <li className="resText" key={index}>
      <Link href={item.link}>{item.text}</Link>
    </li>
  ));

  const otherList = [
    { text: "About Us", link: "/aboutUs" },
    { text: "Privacy Policy", link: "/privacypolicy" },
    { text: "Terms and Conditions", link: "/termsandconditions" }
  ];

  const otherListArr = otherList.map((item, index) => (
    <li className="resText" key={index}>
      <Link href={item.link}>{item.text}</Link>
    </li>
  ));

  const contactInfo = [
    { text: "Kathmandu Engineering College, Kalimati", link: "/locateUs" },
    { text: "Locate Us Here", link: "/locateUs" },
    { text: "+977-9876543210", link: "#" }, // Add phone linking if needed
    { text: "Email Us at info@insurancesathinepal.com.np", link: "#" },
    { text: "Sun-Fri 9:00AM - 06:00PM", link: "#" }
  ];

  const contactInfoArr = contactInfo.map((item, index) => (
    <li className="conText" key={index}>
      <Link href={item.link}>{item.text}</Link>
    </li>
  ));

  const followList = [
    { icon: "/icons8-facebook-24.png", link: "#" },
    { icon: "/icons8-instagram-24.png", link: "#" },
    { icon: "/icons8-linkedin-24.png", link: "#" }
  ];

  const followListArr = followList.map((item, index) => (
    <Link href={item.link} key={index}>
      <img src={item.icon} alt="Social Icon" style={{ filter: "invert()" }} />
    </Link>
  ));

  return (
    <div id="footerContainer">
      <div id="upperContent">
        <div id="resources">
          <div id="resourcesCard">
            <h3 className="resText">Resources</h3>
            {resListArr}
            <h3 className="resText">Others</h3>
            {otherListArr}
          </div>
        </div>
        <div id="marginDiv"></div>
        <div id="contact">
          <div id="contactInfo" className="contactEl">
            <div id="contInfoContainer">
              <h5 className="conText">Contact Info</h5>
              {contactInfoArr}
            </div>
          </div>
          <div id="followUs" className="contactEl">
            <span>Follow us on: </span>
            {followListArr}
          </div>
        </div>
        <div></div>
      </div>
      <div id="contentBr"></div>
      <div id="lowerContent">
        <span>
          Visitors are hereby informed that their information submitted on the
          website may be shared with insurers. Product information is authentic
          and solely based on the information received from the insurers.
        </span>
        <br />
        <span>
          © Copyright 2024-2025 insurancesathinepal.com. All Rights Reserved.
        </span>
      </div>
    </div>
  );
}
