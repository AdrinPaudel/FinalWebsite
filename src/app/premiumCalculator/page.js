"use client";
import React, { useState } from "react";
import "./page.css";

export default function PremiumCalculator() {
  const [formData, setFormData] = useState({
    tabRate: "",
    insuredAmount: "",
    policyTerm: "",
    paymentMode: "",
    loadingCharge: "",
    rebate: "",
  });

  const [calculationSteps, setCalculationSteps] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculatePremium = () => {
    const {
      tabRate,
      insuredAmount,
      policyTerm,
      paymentMode,
      loadingCharge,
      rebate,
    } = formData;

    const parsedTabRate = parseFloat(tabRate);
    const parsedInsuredAmount = parseFloat(insuredAmount);
    const parsedPolicyTerm = parseInt(policyTerm);
    const parsedLoadingCharge = parseFloat(loadingCharge);
    const parsedRebate = parseFloat(rebate);

    if (
      isNaN(parsedTabRate) ||
      isNaN(parsedInsuredAmount) ||
      isNaN(parsedPolicyTerm) ||
      isNaN(parsedLoadingCharge) ||
      isNaN(parsedRebate) ||
      paymentMode === ""
    ) {
      alert("Please enter valid numeric values and select a payment mode.");
      return;
    }

    // Step 1: Start with Tab Rate
    let premium = parsedTabRate;

    // Step 2: Apply User-Provided Loading Charge
    premium *= parsedLoadingCharge;

    // Step 3: Subtract Rebate
    premium -= parsedRebate;

    // Step 4: Multiply by (Insured Amount / 1000)
    premium *= parsedInsuredAmount / 1000;

    // Step 5: Divide Based on Payment Mode
    let paymentFrequency = 1; // Default: Yearly
    if (paymentMode === "Half-Yearly") paymentFrequency = 2;
    else if (paymentMode === "Quarterly") paymentFrequency = 4;
    else if (paymentMode === "Monthly") paymentFrequency = 12;

    const premiumPerTerm = premium / paymentFrequency;

    // Setting Calculation Steps
    setCalculationSteps([
      `Step 1: Start with Tab Rate: रु${parsedTabRate.toFixed(2)}`,
      `Step 2: Multiply by Loading Charge: रु${parsedTabRate.toFixed(
        2
      )} × ${parsedLoadingCharge} = रु${(
        parsedTabRate * parsedLoadingCharge
      ).toFixed(2)}`,
      `Step 3: Subtract Rebate: रु${(
        parsedTabRate * parsedLoadingCharge
      ).toFixed(2)} - रु${parsedRebate} = रु${premium.toFixed(2)}`,
      `Step 4: Multiply by (Insured Amount ÷ 1000): रु${premium.toFixed(
        2
      )} × (${parsedInsuredAmount} ÷ 1000) = रु${(
        premium *
        (parsedInsuredAmount / 1000)
      ).toFixed(2)}`,
      `Step 5: Premium Per ${paymentMode}: रु${premium.toFixed(
        2
      )} ÷ ${paymentFrequency} = रु${premiumPerTerm.toFixed(2)}`,
    ]);
  };

  return (
    <div id="calculatorContainer">
      <div className="premiumCalculatorContainer">
        <h1>Premium Calculator</h1>
        <div className="formContainer">
          <input
            type="number"
            name="tabRate"
            placeholder="Tab Rate (per रु1000 SA)"
            onChange={handleChange}
          />
          <input
            type="number"
            name="insuredAmount"
            placeholder="Insured Amount (रु)"
            onChange={handleChange}
          />
          <input
            type="number"
            name="policyTerm"
            placeholder="Policy Term (Years)"
            onChange={handleChange}
          />

          <select name="paymentMode" onChange={handleChange}>
            <option value="">Select Payment Mode</option>
            <option value="Yearly">Yearly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <input
            type="number"
            name="loadingCharge"
            placeholder="Loading Charge (Multiplier)"
            step="0.01"
            onChange={handleChange}
          />
          <input
            type="number"
            name="rebate"
            placeholder="Rebate (रु)"
            onChange={handleChange}
          />

          <button className="mainButton" onClick={calculatePremium}>
            Calculate Premium
          </button>
        </div>

        {calculationSteps && (
          <div className="calculationSteps">
            <h2>Calculation Steps</h2>
            <ul>
              {calculationSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
