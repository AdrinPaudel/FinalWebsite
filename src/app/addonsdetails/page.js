"use client";

import { useState } from "react";
import addonData from "/data/addonsdetails.json";
import "./page.css";

export default function AddonDetails() {
  const [selectedAddon, setSelectedAddon] = useState(addonData.free_addons[0]);

  const handleAddonClick = (addonName) => {
    const allAddons = [...addonData.free_addons, ...addonData.paid_addons];
    const addon = allAddons.find((item) => item.name === addonName);
    if (addon) {
      setSelectedAddon(addon);
    }
  };

  return (
    <div id="Container">
      <div className="addonDetailsContainer">
        <h1 className="heading">Add-on Details</h1>
        <div className="addonBlock">
          {/* Left side: Add-on details */}
          <div className="addonDetails">
            <h2>{selectedAddon.name}</h2>
            <p>{selectedAddon.description}</p>
            <div className="detailsSection">
              <h3>Benefits:</h3>
              <ul>
                {selectedAddon.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="detailsSection">
              <h3>Conditions:</h3>
              <ul>
                {selectedAddon.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
            <div className="detailsSection">
              <h3>Eligibility:</h3>
              <p>{selectedAddon.eligibility}</p>
            </div>
            <div className="detailsSection">
              <h3>Cost:</h3>
              <p>{selectedAddon.cost}</p>
            </div>
          </div>

          {/* Right side: Add-on list */}
          <div className="addonList">
            <h3>Free Add-ons</h3>
            {addonData.free_addons.map((addon, index) => (
              <div
                key={index}
                className={`addonItem ${
                  selectedAddon.name === addon.name ? "active" : ""
                }`}
                onClick={() => handleAddonClick(addon.name)}
              >
                {addon.name}
              </div>
            ))}
            <h3>Paid Add-ons</h3>
            {addonData.paid_addons.map((addon, index) => (
              <div
                key={index}
                className={`addonItem ${
                  selectedAddon.name === addon.name ? "active" : ""
                }`}
                onClick={() => handleAddonClick(addon.name)}
              >
                {addon.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
