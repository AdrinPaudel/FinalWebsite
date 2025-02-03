"use client";
import React from "react";
import "./page.css";

export default function PrivacyPolicy() {
  return (
    <div id="overallContainer">
      <div className="privacyContainer">
        <h1>Privacy Policy</h1>
        <p>Last Updated: January 2025</p>

        <h2>1. Data Collection</h2>
        <p>
          Currently, we do not collect, store, or track any personal data from users.
          All information provided on this platform is processed in real-time to filter and compare policies.
          No user data is saved on our servers at this time.
        </p>

        <h2>2. Future Data Usage</h2>
        <p>
          In the future, we may collect user data for better recommendations and policy filtering.
          If data collection is introduced, users will be notified and given the option to manage their privacy settings.
        </p>

        <h2>3. Third-Party Links</h2>
        <p>
          Our platform may include links to external websites of insurance companies.
          We are not responsible for their privacy practices and recommend reviewing their privacy policies separately.
        </p>

        <h2>4. Policy Changes</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any changes will be reflected on this page.
        </p>
      </div>
    </div>
  );
}
