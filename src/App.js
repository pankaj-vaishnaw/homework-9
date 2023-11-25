// App.js

import React, { useState, useEffect } from "react";
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import './App.css'; // Import your CSS file

function App() {
  const [homeValue, setHomeValue] = useState(5000);
  const [downPayment, setDownPayment] = useState(2000);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [interestRate, setInterestRate] = useState(4);
  const [tenure, setTenure] = useState(15); // Default tenure of 15 years
  const [chartData, setChartData] = useState({
    labels: ["Principle", "Interest"],
    datasets: [
      {
        data: [0, 0], // Initial values
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  });

  useEffect(() => {
    // Update chart data whenever any input changes
    updateChartData();
  }, [homeValue, downPayment, loanAmount, interestRate, tenure]);

  const updateChartData = () => {
    const principle = loanAmount - downPayment;
    const monthlyInterest = (interestRate / 100) / 12;
    const numberOfPayments = tenure * 12;

    // Calculate monthly payment
    const monthlyPayment =
      (principle * monthlyInterest) /
      (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

    // Calculate total payment
    const totalPayment = monthlyPayment * numberOfPayments;

    // Calculate interest
    const totalInterest = totalPayment - principle;

    console.log("Principle:", principle);
    console.log("Monthly Payment:", monthlyPayment);
    console.log("Total Payment:", totalPayment);
    console.log("Total Interest:", totalInterest);

    // Update chart data
    setChartData({
      labels: ["Principle", "Interest"],
      datasets: [
        {
          data: [principle, totalInterest],
          backgroundColor: ["#36A2EB", "#FFCE56"],
        },
      ],
    });
  };

  return (
    <div className="app-container">
   
      <div className="sliders-container">
        <div className="slider-wrapper">
          <label>Home Value</label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="1000"
            value={homeValue}
            onChange={(e) => setHomeValue(parseInt(e.target.value))}
            className="slider"
          />
          <span>${homeValue}</span>
        </div>
        <div className="slider-wrapper">
          <label>Down Payment</label>
          <input
            type="range"
            min="0"
            max={homeValue}
            step="1000"
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value))}
            className="slider"
          />
          <span>${downPayment}</span>
        </div>
        <div className="slider-wrapper">
          <label>Loan Amount</label>
          <input
            type="range"
            min="0"
            max={homeValue - downPayment}
            step="1000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            className="slider"
          />
          <span>${loanAmount}</span>
        </div>
        <div className="slider-wrapper">
          <label>Interest Rate (%)</label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            className="slider"
          />
          <span>{interestRate}%</span>
        </div>
        <div className="slider-wrapper">
          <label>Tenure (Years)</label>
          <select value={tenure} onChange={(e) => setTenure(parseInt(e.target.value))} className="slider">
            {[5, 10, 15, 20, 25].map((year) => (
              <option key={year} value={year}>
                {year} years
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="pie-chart-container" style={{ width: "80%", margin: "auto" }}>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'right',
              },
            },
          }}
          height={400} // Set your desired height here
        />
      </div>
    </div>
  );
}

export default App;