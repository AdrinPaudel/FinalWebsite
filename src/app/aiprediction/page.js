"use client";

import React, { useState } from "react";
import { runPythonScript } from "../api/runai";
import "./page.css";

export default function AIPredictionPage() {
  const [formData, setFormData] = useState({
    income: "",
    age: "",
    insuredAmount: "",
    insuredTerm: "",
    term: "1", 
    type: "1",
  });

  const [premiumValue, setPremiumValue] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePremiumChange = (e) => {
    setPremiumValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // First update the premium using updatePremium API
      console.log("AI", premiumValue, formData)
      await fetch('/api/updatePremium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, premium: parseFloat(premiumValue) }),
      });

      // Then run the Python script with "data1" parameter
      const floatPrediction = parseFloat(await runPythonScript("data1"));
      const finalPrediction = Number(floatPrediction.toFixed(3));
      setPrediction(finalPrediction);
    } catch (err) {
      console.error("Error while running AI prediction:", err);
      setError("Failed to get prediction. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fullcontainer">
      <div className="ai-prediction-container">
        <h1>AI Prediction</h1>
        <form onSubmit={handleSubmit} className="ai-prediction-form">
          <div className="form-group">
            <label htmlFor="income">Income:</label>
            <input 
              type="number" 
              id="income" 
              name="income" 
              value={formData.income} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input 
              type="number" 
              id="age" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="insuredAmount">Insured Amount:</label>
            <input 
              type="number" 
              id="insuredAmount" 
              name="insuredAmount" 
              value={formData.insuredAmount} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="insuredTerm">Insured Term (years):</label>
            <input 
              type="number" 
              id="insuredTerm" 
              name="insuredTerm" 
              value={formData.insuredTerm} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="premium">Insurance Premium:</label>
            <input 
              type="number" 
              id="premium" 
              name="premium" 
              value={premiumValue} 
              onChange={handlePremiumChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="term">Payment Term:</label>
            <select 
              id="term" 
              name="term" 
              value={formData.term} 
              onChange={handleChange} 
              required
            >
              <option value="1">Yearly</option>
              <option value="0.5">Half-Yearly</option>
              <option value="0.25">Quarterly</option>
              <option value="0.083">Monthly</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Getting Prediction..." : "Get Prediction"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {prediction !== null && (
          <div className="prediction-result">
            <h2>Prediction Result:</h2>
            <p>{prediction}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
