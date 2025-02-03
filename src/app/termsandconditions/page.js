"use client";
import React from "react";
import "./page.css";

export default function TermsAndConditions() {
  return (
    <div id="overallContainer">
      <div className="termsContainer">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: August 2024</p>

        <h2>1. Information Accuracy</h2>
        <p>
          The data provided on our platform is collected from publicly available sources and was last updated in **August 2024**.
          We do not guarantee that all information remains current. Any updates made by insurance companies after this date 
          may not be reflected on our platform.
        </p>

        <h2>2. No Legal Liability</h2>
        <p>
          Our platform is for **informational purposes only**. We do not sell insurance policies or provide financial advice.
          Users should verify details with the respective insurance companies before making any decisions. We are not responsible
          for any discrepancies in policy details, premiums, or other information.
        </p>

        <h2>3. AI-Based Recommendations</h2>
        <p>
          Any **AI-generated recommendations** on our site are **not guarantees**. These are based on provided inputs and policy 
          data but do not substitute for professional financial advice. Users should use discretion when selecting policies.
        </p>

        <h2>4. No Legal Action</h2>
        <p>
          By using this platform, you agree that you **cannot hold us legally responsible** for any misinformation, missing details,
          or AI-generated suggestions. Any disputes must be taken up directly with the respective insurance providers.
        </p>

        <h2>5. Policy Changes</h2>
        <p>
          We reserve the right to modify these Terms & Conditions at any time. Continued use of the platform constitutes 
          acceptance of the latest terms.
        </p>
      </div>
    </div>
  );
}
