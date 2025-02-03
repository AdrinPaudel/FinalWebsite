"use client";

import "./page.css";
import { runPythonScript } from "../api/runai";
import papa from "papaparse";
import { useEffect, useState, useRef } from "react";
import DataFilter from "./DataFilter";
import Calculator from "../components/calculator/calculator";
import hardcodedData from "/data/hardcodedData.json";
import addonIndNames from "/data/addonIndNames.json";
import policyAddons from "/data/policyAddons";
import policyData from "/data/policyData.json";
import addonCosts from "/data/addonCosts.json";
import companyPolicies from "/data/companyPolicies.json";
import paymentMethods from "/data/paymentMethods.json";
import rebateBrackets from "/data/rebateBrackets.json";
import policiesData from "/data/Policies.json";
// import { filter } from "mathjs"; // (if needed)

const company1Policies = [1, 2, 3, 10, 11, 16, 17];
const company2Policies = [4, 5, 6, 12, 13, 18, 19];
const company3Policies = [7, 8, 9, 14, 15, 20, 21];

export default function Compare() {
  // ------------------
  // COMPONENT STATE
  // ------------------
  const [showComparisonPage, setShowComparisonPage] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [addonData, setAddonData] = useState([]);
  const [comparisonResult, setComparisonResult] = useState([]);// These two states control whether policy details or add-ons are visible.
  const [addonDisplay, setAddonDisplay] = useState(false);
  const [detailsDisplay, setDetailsDisplay] = useState(false);
  const [showLoading, setShowLoadingPage] = useState(false) // useRefs for toggling DOM classes for each policy card
  const policyAddonsRef = useRef({});
  const policyDetailsRef = useRef({});

  // Form data state – note that not every field is mandatory.
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    insuredAmount: "",
    income: "",
    insuredTerm: "",
    // other optional fields: type, gender, phoneNumber, occupation
  });

  // ------------------
  // FORM HANDLING & VIEW TOGGLING
  // ------------------
  // When the user clicks the "Compare" button, we toggle the view and grab the form values.
  function handleButtonClick(e) {
    setShowComparisonPage((prev) => !prev);
    setShowLoadingPage(true);
    getData();
  }

  // Extract form values from the DOM and update state.
  function getData() {
    const nameElement = document.getElementById("nameField");
    const insuredTerm = nameElement.parentElement.children[1].value;
    const insuredAmount = nameElement.parentElement.children[2].value;
    const income = nameElement.parentElement.children[3].value;
    const term = document.querySelector('input[name="term"]:checked')?.value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const type = document.querySelector('input[name="type"]:checked')?.value;
    const age =
      nameElement.parentElement.parentElement.children[1].children[3].value;

    if (
      nameElement.value !== "" &&
      age !== "" &&
      insuredAmount !== "" &&
      income !== "" &&
      insuredTerm !== "" &&
      gender !== ""
    ) {
      // Optionally retrieve phone number and occupation (if provided)
      const phoneNumber = nameElement.parentElement.children[4].value;
      const occupation =
        nameElement.parentElement.parentElement.children[1].children[4].value;

      setFormData({
        name: nameElement.value,
        insuredTerm, // e.g., 10, 15...
        insuredAmount,
        income,
        // Use type if it is one of the expected values; otherwise default to 0.
        type: (type == 1) | (type == 2) | (type == 3) ? type : 0,
        gender,
        phoneNumber,
        age,
        term, // e.g., yearly, monthly, etc.
        occupation,
      });
    }
  }

  // ------------------
  // INITIALIZATION & UI TOGGLES
  // ------------------
  // On component mount, load the add-on data and preselect the default payment term.
  useEffect(() => {
    setAddonData(hardcodedData);
    const term = document.getElementById("preselect");
    if (term) term.click();
  }, []);

  // When addonDisplay changes, update the add-on section class on each policy card.
  useEffect(() => {
    Object.keys(policyAddonsRef.current).forEach((policyKey) => {
      if (policyAddonsRef.current[policyKey]) {
        if (addonDisplay) {
          policyAddonsRef.current[policyKey].classList.remove("hiddenAddons");
        } else {
          policyAddonsRef.current[policyKey].classList.add("hiddenAddons");
        }
      }
    });
  }, [addonDisplay]);

  // When detailsDisplay changes, update the details section class on each policy card.
  useEffect(() => {
    Object.keys(policyDetailsRef.current).forEach((policyKey) => {
      if (policyDetailsRef.current[policyKey]) {
        if (detailsDisplay) {
          policyDetailsRef.current[policyKey].classList.remove("hiddenDetails");
        } else {
          policyDetailsRef.current[policyKey].classList.add("hiddenDetails");
        }
      }
    });
  }, [detailsDisplay]);

  // ------------------
  // PROCESSING & DISPLAYING POLICIES
  // ------------------
  // When formData (or selected add-ons) changes, filter and process policies.
  // ...
useEffect(() => {
  if (formData.name !== "") {
    // Show the loading indicator immediately when formData or selectedAddons change.
    setShowLoadingPage(true);
    // Optionally clear the previous results
    setComparisonResult([]);

    async function processPolicies() {
      // Your existing processing code...
      let policiesExist = true;

      // Filter policies based on form data.
      let filteredData = DataFilter(formData);
      policiesExist = filteredData.length === 0 ? false : true;

      // Process each policy asynchronously.
      const processedPolicies = await Promise.all(
        filteredData.map(async (policyData) => {
          const policyNumber = policyData.policy;
          // Check if this policy has all selected add-ons.
          const hasAllAddons = selectedAddons.every((addon) =>
            hasAddonForPolicy(policyNumber, parseFloat(addon))
          );
          if (!hasAllAddons) return null;

          // Calculate premium (using CSV tab rates, loading charge, and rebate).
          const premium = await calculatePremium(formData, policyNumber);
          // Calculate total add-on cost.
          const addonCost = calculateTotalAddonsCost(selectedAddons, formData);
          // Retrieve CSR and Policy Name from policyData.
          const csr = getCsrByPolicyNumber(policyNumber);
          const policyName = getPolicyNameByPolicyNumber(policyNumber);
          // Determine the company name.
          let companyName = "";
          if (company1Policies.includes(policyNumber)) {
            companyName = "Himalayan Life";
          } else if (company2Policies.includes(policyNumber)) {
            companyName = "LIC Nepal";
          } else if (company3Policies.includes(policyNumber)) {
            companyName = "Nepal Life";
          }
          return {
            ...policyData,
            premium,
            addonCost,
            csr,
            policyName,
            companyName,
          };
        })
      );

      // Remove any null entries (policies that did not have the required add-ons).
      const validPolicies = processedPolicies.filter(Boolean);
      // Sort by premium (lowest first).
      validPolicies.sort((a, b) => a.premium - b.premium);

      const finalCards = [];
      if (validPolicies.length === 0) {
        finalCards.push(
          <div className="noPolicies" key="no-policies">
            Sorry, No Policies Available in the current Parameters
            <br />
            <br />
            Please Fill Different Data or Choose Different Addons
          </div>
        );
      } else {
        for (const policy of validPolicies) {
          // Update the premium via an API call.
          await fetch("/api/updatePremium", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ formData, premium: policy.premium }),
          });
          // Run the AI prediction script.
          const floatprediction = parseFloat(await runPythonScript("data1"));
          const prediction = Number(floatprediction.toFixed(3));

          // Retrieve additional details from policiesData.
          const policyDetails = policiesData.policies.find(
            (p) => p.policy === policy.policy
          );
          const minAmount = policyDetails?.min || "N/A";
          const maxAmount = policyDetails?.max || "N/A";
          const minEntryAge = policyDetails?.minEntry || "N/A";
          const maxEntryAge = policyDetails?.maxEntry || "N/A";
          const minYears = policyDetails?.minYears || "N/A";
          const maxYearsA = policyDetails?.maxYa || "N/A";
          const maxYearsB = policyDetails?.maxYb || "N/A";

          // Build a description based on the policy type.
          let policyTypeDetails = "";
          if (policy.policy >= 1 && policy.policy <= 9) {
            policyTypeDetails =
              "The return of the money with premium and additional profit is at the end of the term, and the amount depends on the market rate.";
          } else if ([10, 12, 14].includes(policy.policy)) {
            policyTypeDetails =
              "This policy returns 15% at 5 years, 25% at 10 years, and 60% at 15 years for a 15-year plan. For 20- and 25-year plans, the return rates adjust accordingly.";
          } else if ([11, 13, 15].includes(policy.policy)) {
            policyTypeDetails =
              "This policy returns 25% at 5 years, 25% at 10 years, and 50% at 15 years for a 15-year plan. Adjusted percentages for longer plans.";
          } else if (policy.policy >= 16 && policy.policy <= 21) {
            policyTypeDetails =
              "This is a term life insurance plan with no maturity benefit.";
          }

          finalCards.push(
            <div key={policy.policy} className="filteredPolicies">
              <h1>
                {policy.policyName}
                <span className="cardPolicyId">{policy.policy}</span>
              </h1>
              <div className="cardCSR">CSR: {policy.csr || "N/A"}</div>
              <div className="cardCost">
                <div className="cardPremiumCost">
                  Premium: रु {policy.premium || "0"}
                </div>
              </div>
              <div className="cardCost">
                <div className="cardAddonCost">
                  AddonCost: रु {policy.addonCost || "0"}
                </div>
              </div>
              <div className="cardCost">Prediction is: {prediction}</div>
              <h3
                className="detailsTitle"
                style={{ cursor: "pointer" }}
                onClick={() => setDetailsDisplay((prev) => !prev)}
              >
                Policy Details
              </h3>
              <div
                ref={(el) => (policyDetailsRef.current[policy.policy] = el)}
                className="policyDetails hiddenDetails"
              >
                <p>
                  This {policy.policyName} is offered by {policy.companyName}.
                </p>
                <p>
                  The minimum insured amount for this plan is रु{minAmount} with a
                  maximum of रु{maxAmount}.
                </p>
                <p>
                  The minimum entry age is {minEntryAge} years with a maximum entry
                  age of {maxEntryAge} years.
                </p>
                <p>
                  The policy term ranges from {minYears} years to {maxYearsA} (or{" "}
                  {maxYearsB}) years.
                </p>
                <p>{policyTypeDetails}</p>
                <p>
                  This plan can be taken by visiting any closest{" "}
                  {policy.companyName} branch or contacting agents of{" "}
                  {policy.companyName}.
                </p>
              </div>
              <h3
                className="addonsTitle"
                style={{ cursor: "pointer" }}
                onClick={() => setAddonDisplay((prev) => !prev)}
              >
                Policy Add-ons
              </h3>
              <div
                ref={(el) => (policyAddonsRef.current[policy.policy] = el)}
                className="cardAddons hiddenAddons"
              >
                <div className="cardAddonsContent">
                  {policyAddons[policy.policy]?.length > 0 ? (
                    policyAddons[policy.policy].map((element, index) => {
                      if (element < 65) {
                        return (
                          <div key={index} className="addonsNamesPaid">
                            {addonIndNames[element] || "Unknown Add-on"}
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="addonsNamesFree">
                            {addonIndNames[element] || "Unknown Add-on"}
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div>No Add-ons Available</div>
                  )}
                </div>
              </div>
            </div>
          );
        }
      }
      // Once processing is done, update the UI.
      setComparisonResult(finalCards);
      setShowLoadingPage(false);
    }
    processPolicies();
  }
}, [formData, selectedAddons]);


  // ------------------
  // HANDLE ADD-ON SELECTION CHANGES
  // ------------------
  const handleAddonChange = (event) => {
    const addonNumber = event.target.id;
    setSelectedAddons((prevSelectedAddons) =>
      event.target.checked
        ? [...prevSelectedAddons, addonNumber]
        : prevSelectedAddons.filter((addon) => addon !== addonNumber)
    );
  };

  // ------------------
  // RENDER THE UI
  // ------------------
  return (
    <>
      {showComparisonPage ? (
        <div id="compareContainer">
          <div className="compareContents" id="searchPlans">
            <h1>
              <span id="searchSpan">Search</span>
              <span id="planSpan">Plans</span>
            </h1>
            <p className="fattext">
              Choosing the right plan can be a crucial decision for your needs,
              whether you’re an individual, a small business, or a large enterprise.
              To help you make the best choice, we’ve outlined the key features and
              benefits of each of our plans below. Compare and select the plan that suits you best.
            </p>
          </div>

          <div className="surrounddatafields">
            <form className="compareContents" id="endowmentdatafields">
              <div id="datafieldLeft">
                <input
                  type="text"
                  placeholder="Name"
                  id="nameField"
                  className="optional"
                />
                <input
                  type="text"
                  placeholder="Insured Term"
                  id="insuredTermField"
                />
                <input
                  type="text"
                  placeholder="Insured Amount"
                  id="insuredAmmountField"
                />
                <input type="text" placeholder="Income" id="incomeField" />
                <input
                  type="text"
                  placeholder="Phone Number(optional)"
                  id="phoneField"
                  className="optional"
                />
              </div>
              <div id="datafieldRight">
                <span id="gender">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="optional"
                  />{" "}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="optional"
                  />{" "}
                  Female
                </span>
                <span id="type">
                  <input type="radio" name="type" value="1" /> Endowment
                  <input type="radio" name="type" value="3" /> Term Life
                  <input type="radio" name="type" value="2" /> Money Back
                  <input type="radio" name="type" value="0" /> All
                </span>
                <span id="term">
                  <input type="radio" name="term" value="0.083" /> Monthly
                  <input type="radio" name="term" value="0.25" /> Quarterly
                  <input type="radio" name="term" value="0.5" /> Half-Yearly
                  <input
                    id="preselect"
                    type="radio"
                    name="term"
                    value="1"
                    aria-checked="true"
                  />{" "}
                  Yearly
                </span>
                <input type="text" placeholder="Age" id="ageField" />
                <input
                  type="text"
                  placeholder="Occupation(optional)"
                  id="occupationField"
                  className="optional"
                />
                <button
                  className="mainButton"
                  onClick={handleButtonClick}
                  type="button"
                >
                  Compare
                </button>
              </div>
            </form>
          </div>

          <div id="chooseBreak"></div>
        </div>
      ) : (
        <div className="comparisonView">
          <div id="policyCards">{
              (showLoading)?<>
              <div className="noPolicies">
                Loading ...
              </div>
              </>:comparisonResult}</div>
          <div id="majorView">
            <h1> Choose an Add-on </h1>
            <div
              id="filterinfoicon"
              onClick={() => (window.location.href = "/addonsdetails")}
            >
              ⓘ
              <span id="filterinfo">Click here to see addon details
              </span>
              <br/>
              <br/>
              (Please wait for some time before pressing another addon do not select and unselect multiple addons at once)
            </div>
            <h3> Free Add-on </h3>
            <div id="filterFree" className="filter">
              {addonData.map((addon, index) => {
                if (addon["Add-on Number"] > 60) {
                  return (
                    <div key={index} className="filterAddons">
                      <input
                        type="checkbox"
                        name={addon["Add-on Name"]}
                        id={addon["Add-on Number"]}
                        onChange={handleAddonChange}
                      />
                      <label htmlFor={addon["Add-on Number"]}>
                        {addon["Add-on Name"]}
                      </label>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <h3> Paid Add-on </h3>
            <div id="filterFree" className="filter">
              {addonData.map((addon, index) => {
                if (addon["Add-on Number"] < 64) {
                  return (
                    <div key={index} className="filterAddons">
                      <input
                        type="checkbox"
                        name={addon["Add-on Name"]}
                        id={addon["Add-on Number"]}
                        onChange={handleAddonChange}
                      />
                      <label htmlFor={addon["Add-on Number"]}>
                        {addon["Add-on Name"]}
                      </label>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <a
              href="/yearslasting"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <Calculator
                income={formData.income}
                insured_amount={formData.insuredAmount}
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// =============================================================================
// UTILITY FUNCTIONS (Calculation, CSV parsing, and Lookup Helpers)
// =============================================================================

function calculateLoadingCharge(policyNumber, formData) {
  // Determine which company the policy belongs to.
  let companyId = null;
  for (let company in companyPolicies) {
    if (companyPolicies[company].includes(policyNumber)) {
      companyId = parseInt(company);
      break;
    }
  }
  if (!companyId) {
    console.error("Company not found for this policy.");
    return 0;
  }
  // Get loading factors based on the payment term.
  const loadingFactors = paymentMethods[formData.term];
  if (!loadingFactors) {
    console.error("Invalid term value.");
    return 0;
  }
  let loadingCharge;
  if (companyId === 1) {
    loadingCharge = loadingFactors.loading1;
  } else if (companyId === 2) {
    loadingCharge = loadingFactors.loading2;
  } else if (companyId === 3) {
    loadingCharge = loadingFactors.loading3;
  }
  return loadingCharge;
}

function calculateRebate(policyNumber, formData) {
  let companyId = null;
  for (let company in companyPolicies) {
    if (companyPolicies[company].includes(policyNumber)) {
      companyId = parseInt(company);
      break;
    }
  }
  let rebate = 0;
  for (let bracket of rebateBrackets) {
    if (
      formData.insuredAmount >= bracket.min &&
      formData.insuredAmount <= bracket.max
    ) {
      if (companyId === 1) {
        rebate = bracket.rebate1;
      } else if (companyId === 2) {
        rebate = bracket.rebate2;
      } else if (companyId === 3) {
        rebate = bracket.rebate3;
      }
      break;
    }
  }
  // For certain policy numbers, adjust the rebate.
  if ([10, 11, 12, 13, 14, 15].includes(policyNumber)) {
    rebate = rebate / 20;
  }
  return rebate;
}

function calculateTotalAddonsCost(selectedAddons, formData) {
  let totalAddonCost = 0;
  selectedAddons.forEach((addon) => {
    if (addonCosts[addon]) {
      totalAddonCost += addonCosts[addon];
    }
  });
  let calculatedAddonCost = (totalAddonCost * formData.insuredAmount) / 10000;
  calculatedAddonCost = calculatedAddonCost / formData.term;
  return calculatedAddonCost;
}

async function calculatePremium(formData, policyNumber) {
  // Get the tab rate from the CSV data.
  let tabRate = await calculateTabRate(
    policyNumber,
    formData.age,
    formData.insuredTerm
  );
  // Get the loading charge and rebate.
  const loadingCharge = calculateLoadingCharge(policyNumber, formData);
  const rebate = calculateRebate(formData.insuredAmount, policyNumber);
  // Calculate the base premium.
  const premiumBase = (((tabRate * loadingCharge) - rebate) * formData.insuredAmount) / 1000;
  // Divide by the term (to get the premium per term).
  const premiumPerTerm = premiumBase * formData.term;
  return Math.round(premiumPerTerm * 100) / 100;
}

function findTabRateForEndowment(tabRateData, age, insuredTerm) {
  const toplessTabRateData = tabRateData.slice(1);
  const ageRow = toplessTabRateData.find(
    (row) => parseInt(row[0]) === parseInt(age)
  )?.slice(1);
  if (!ageRow) {
    console.error(`Age ${age} not found in the tab rate data for Endowment.`);
    return null;
  }
  // Use a copy of the header row and remove the first element.
  let termList = [...tabRateData[0]];
  termList.splice(0, 1);
  const insuredTermPosition = Object.keys(termList).find(
    (val) => parseInt(termList[val]) === parseInt(insuredTerm)
  );
  if (insuredTermPosition === undefined) {
    console.error(
      `Insured term ${insuredTerm} not found in the tab rate data for Endowment.`
    );
    return null;
  }
  return parseFloat(ageRow[insuredTermPosition]);
}

function findTabRateForMoneyBack(tabRateData, age, insuredTerm) {
  const toplessTabRateData = tabRateData.slice(1);
  const ageRow = toplessTabRateData.find(
    (row) => parseInt(row[0]) === parseInt(age)
  )?.slice(1);
  if (!ageRow) {
    console.error(`Age ${age} not found in the tab rate data for Money Back.`);
    return null;
  }
  let termList = [...tabRateData[0]];
  termList.splice(0, 1);
  const insuredTermPosition = Object.keys(termList).find(
    (val) => parseInt(termList[val]) === parseInt(insuredTerm)
  );
  if (insuredTermPosition === undefined) {
    console.error(
      `Insured term ${insuredTerm} not found in the tab rate data for Money Back.`
    );
    return null;
  }
  return parseFloat(ageRow[insuredTermPosition]);
}

function findTabRateForTermLife(tabRateData, rowVal, columnVal) {
  const toplessTabRateData = tabRateData.slice(1);
  const ageRow = toplessTabRateData.find(
    (row) => parseInt(row[0]) === parseInt(rowVal)
  )?.slice(1);
  if (!ageRow) {
    console.error(`Age ${rowVal} not found in the tab rate data for Term Life.`);
    return null;
  }
  let termList = [...tabRateData[0]];
  termList.splice(0, 1);
  const insuredTermPosition = Object.keys(termList).find(
    (val) => parseInt(termList[val]) === parseInt(columnVal)
  );
  if (insuredTermPosition === undefined) {
    console.error(
      `Insured term ${columnVal} not found in the tab rate data for Term Life.`
    );
    return null;
  }
  return parseFloat(ageRow[insuredTermPosition]);
}

async function calculateTabRate(policyNumber, age, insuredTerm) {
  const tabRateData = await fetchTabRateData(policyNumber);
  if (!tabRateData) {
    return null;
  }
  if (policyNumber >= 1 && policyNumber <= 9) {
    return findTabRateForEndowment(tabRateData, age, insuredTerm);
  } else if (policyNumber >= 10 && policyNumber <= 15) {
    return findTabRateForMoneyBack(tabRateData, age, insuredTerm);
  } else if (policyNumber >= 16 && policyNumber <= 21) {
    return findTabRateForTermLife(tabRateData, age, policyNumber);
  } else {
    console.error(`Invalid policy number ${policyNumber}.`);
    return null;
  }
}

async function fetchTabRateData(policyNumber) {
  let url = `/AllPolicy/${policyNumber}.csv`;
  try {
    const response = await fetch(url);
    const csvData = await response.text();
    const parsedData = papa.parse(csvData, { skipEmptyLines: true });
    return parsedData.data;
  } catch (error) {
    console.error(
      `Failed to fetch data for policy number ${policyNumber}:`,
      error
    );
    return null;
  }
}

const hasAddonForPolicy = (policyNumber, addonId) => {
  const addons = policyAddons[policyNumber];
  return addons && addons.includes(addonId) ? 1 : 0;
};

const getCsrByPolicyNumber = (policyNumber) => {
  const policy = policyData.find((p) => p.policyNumber === policyNumber);
  return policy ? policy.csr : null;
};

const getPolicyNameByPolicyNumber = (policyNumber) => {
  const policy = policyData.find((p) => p.policyNumber === policyNumber);
  return policy ? policy.name : null;
};
