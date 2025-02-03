"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "./page.css";

export default function YearsLasting() {
  const searchParams = useSearchParams();
  const initialIncome = parseFloat(searchParams.get("income")) || 1000000;
  const initialInsuredAmount = parseFloat(searchParams.get("insured_amount")) || 10000000;
  const defaultExpensePercentage = 50;

  const [income, setIncome] = useState(initialIncome);
  const [insuredAmount, setInsuredAmount] = useState(initialInsuredAmount);
  const [expensePercentage, setExpensePercentage] = useState(defaultExpensePercentage);
  const [yearsData, setYearsData] = useState([]);

  useEffect(() => {
    calculateYears();
  }, [income, insuredAmount, expensePercentage]);

  function calculateYears() {
    let year = 0;
    let expense = (expensePercentage / 100) * income;
    let totalAmount = insuredAmount;
    let interestRate = 0.1;
    let tempYearsData = [];

    while (totalAmount > 0 && year < 50) {
      let interest = interestRate * totalAmount;
      totalAmount += interest;
      totalAmount -= expense;
      expense += 0.6 * expense; // Increasing yearly expenses

      tempYearsData.push({
        year: year + 1,
        startingBalance: totalAmount.toFixed(2),
        assumedReturns: interest.toFixed(2),
        yearlyExpense: expense.toFixed(2),
        remainingBalance: totalAmount.toFixed(2),
      });

      year++;
    }
    setYearsData(tempYearsData);
  }

  return (
    <div className="yearsLastingContainer">
      <h1>Years Lasting Calculation</h1>
      <div className="inputSection">
        <label>Annual Income:</label>
        <input type="number" value={income} onChange={(e) => setIncome(parseFloat(e.target.value) || 0)} />
        <label>Insured Amount:</label>
        <input type="number" value={insuredAmount} onChange={(e) => setInsuredAmount(parseFloat(e.target.value) || 0)} />
        <label>Expense Percentage:</label>
        <input type="number" value={expensePercentage} onChange={(e) => setExpensePercentage(parseFloat(e.target.value) || 0)} />%
      </div>

      <table className="yearsTable">
        <thead>
          <tr>
            <th>Year</th>
            <th>Starting Balance</th>
            <th>Assumed Returns</th>
            <th>Yearly Expense</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {yearsData.map((row, index) => (
            <tr key={index}>
              <td>{row.year}</td>
              <td>रु {row.startingBalance}</td>
              <td className="positive">+ रु {row.assumedReturns}</td>
              <td className="negative">- रु {row.yearlyExpense}</td>
              <td>रु {row.remainingBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
