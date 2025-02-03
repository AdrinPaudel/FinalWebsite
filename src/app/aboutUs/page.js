"use client";
import React from "react";
import "./page.css";

export default function AboutUs() {
  return (
    <div id="Container">
    <div className="aboutUsContainer">
      <h1>About Us</h1>
      <p>
        Welcome to Insurance Sathi Nepal, a platform designed to help you easily compare  
        life insurance policies from different companies in one place.
      </p>

      <h2>What We Do</h2>
      <p>
        We provide detailed comparisons of life insurance plans, including pricing,  
        available add-ons, and policy details, so you can make informed decisions without  
        visiting multiple company websites.
      </p>

      <h2>Why Use Our Platform?</h2>
      <ul>
        <li>✔ Compare insurance policies from multiple companies in one place</li>
        <li>✔ See detailed breakdowns of pricing and available add-ons</li>
        <li>✔ Easily filter policies based on your needs</li>
      </ul>

      <h2>Important Note</h2>
      <p>
        Our platform provides information based on publicly available data.  
        We do not sell insurance policies or guarantee recommendations—our AI-based  
        suggestions are just a tool to help you compare options effectively.
      </p>

      <h2>Contact & Location</h2>
      <p>
        If you’d like to visit us or need assistance, check our <a href="/locateUs">Locate Us</a> page.
      </p>
    </div>
    </div>
  );
}
