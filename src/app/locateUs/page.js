"use client";
import React from "react";
import "./page.css";

export default function LocateUs() {
  return (
    <div id="overallContainer">
      <div className="locateUsContainer">
        <h1>Locate Us</h1>
        <p>
          We are located at **Kathmandu Engineering College, Kalimati, Nepal**.
          This is a student project designed to make life insurance policy comparisons easier.
        </p>

        <h2>Our Location</h2>
        <p><strong>Kathmandu Engineering College</strong></p>
        <p>Kalimati, Kathmandu, Nepal</p>

        <h2>Find Us on Google Maps</h2>
        <div className="mapContainer">
          <iframe
            title="Google Maps - KEC"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5671464036137!2d85.297365!3d27.699005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196e6fbb7e97%3A0x8a7e021f78c39b6a!2sKathmandu%20Engineering%20College!5e0!3m2!1sen!2snp!4v1700000000000"
            width="100%"
            height="300"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <h2>Need Assistance?</h2>
        <p>
          If you have any queries, feel free to visit us at our college or check out our <a href="/aboutUs">About Us</a> page.
        </p>
      </div>
    </div>
  );
}
