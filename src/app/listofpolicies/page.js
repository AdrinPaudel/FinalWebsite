"use client";
import React, { useEffect, useState } from "react";
import "./page.css";

import policiesData from "/data/Policies.json";
import policyDetails from "/data/policyData.json";
import policyAddons from "/data/policyAddons.json";
import addonNames from "/data/addonIndNames.json";

export default function ListOfPolicies() {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");

  const companyMapping = {
    "Himalayan Life": [1, 2, 3, 10, 11, 16, 17],
    "Life Insurance Corporation Nepal": [4, 5, 6, 12, 13, 18, 19],
    "Nepal Life": [7, 8, 9, 14, 15, 20, 21],
  };

  useEffect(() => {
    const combinedPolicies = policiesData.policies.map((policy) => {
      const details = policyDetails.find((p) => p.policyNumber === policy.policy);
      const addons = policyAddons[policy.policy] || [];

      return {
        id: policy.policy,
        name: details ? details.name : "Unknown Policy",
        csr: details ? details.csr : "N/A",
        minAmount: policy.min,
        maxAmount: policy.max,
        minEntryAge: policy.minEntry,
        maxEntryAge: policy.maxEntry,
        minYears: policy.minYears,
        maxYears: `${policy.maxYa} (or ${policy.maxYb})`,
        company: Object.keys(companyMapping).find((company) =>
          companyMapping[company].includes(policy.policy)
        ),
        type:
          policy.policy >= 1 && policy.policy <= 9
            ? "Endowment"
            : policy.policy >= 10 && policy.policy <= 15
            ? "Money Back"
            : "Term Life",
        addons: addons.map((addonId) => addonNames[addonId] || "Unknown Add-on"),
      };
    });

    setPolicies(combinedPolicies);
    setFilteredPolicies(combinedPolicies);
  }, []);

  useEffect(() => {
    let filtered = policies;

    if (selectedType !== "all") {
      filtered = filtered.filter((policy) => policy.type === selectedType);
    }

    if (selectedCompany !== "all") {
      filtered = filtered.filter((policy) => policy.company === selectedCompany);
    }

    setFilteredPolicies(filtered);
  }, [selectedType, selectedCompany, policies]);

  return (
    <div id="overallContainer">
      <div className="policyPage">
        <div className="policyListContainer">
          <h1>Available Insurance Policies</h1>

          <div className="policyGrid">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <div key={policy.id} className="policyCard">
                  <h2>{policy.name}</h2>
                  <p className="policyId">Policy ID: {policy.id}</p>
                  <p className="csr">CSR: {policy.csr}%</p>
                  <p>Company: {policy.company}</p>
                  <p>Type: {policy.type}</p>
                  <p>Insured Amount: रु {policy.minAmount} - रु {policy.maxAmount}</p>
                  <p>Entry Age: {policy.minEntryAge} - {policy.maxEntryAge} years</p>
                  <p>Policy Term: {policy.minYears} years to {policy.maxYears} years</p>

                  <div className="addons">
                    <h3>Add-ons:</h3>
                    <ul>
                      {policy.addons.length > 0 ? (
                        policy.addons.map((addon, index) => (
                          <li key={index}>{addon}</li>
                        ))
                      ) : (
                        <li>No add-ons available</li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No policies match the selected filters.</p>
            )}
          </div>
        </div>

        <aside className="filterSidebar">
          <h2>Filter Policies</h2>

          <h3>Policy Type</h3>
          <button
            className={selectedType === "all" ? "active" : ""}
            onClick={() => setSelectedType("all")}
          >
            All
          </button>
          <button
            className={selectedType === "Endowment" ? "active" : ""}
            onClick={() => setSelectedType("Endowment")}
          >
            Endowment
          </button>
          <button
            className={selectedType === "Money Back" ? "active" : ""}
            onClick={() => setSelectedType("Money Back")}
          >
            Money Back
          </button>
          <button
            className={selectedType === "Term Life" ? "active" : ""}
            onClick={() => setSelectedType("Term Life")}
          >
            Term Life
          </button>

          <h3>Company</h3>
          <button
            className={selectedCompany === "all" ? "active" : ""}
            onClick={() => setSelectedCompany("all")}
          >
            All
          </button>
          <button
            className={selectedCompany === "Himalayan Life" ? "active" : ""}
            onClick={() => setSelectedCompany("Himalayan Life")}
          >
            Himalayan Life
          </button>
          <button
            className={selectedCompany === "Life Insurance Corporation Nepal" ? "active" : ""}
            onClick={() => setSelectedCompany("Life Insurance Corporation Nepal")}
          >
            LIC Nepal
          </button>
          <button
            className={selectedCompany === "Nepal Life" ? "active" : ""}
            onClick={() => setSelectedCompany("Nepal Life")}
          >
            Nepal Life
          </button>
        </aside>
      </div>
    </div>
  );
}
