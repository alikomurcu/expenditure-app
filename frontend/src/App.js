import React, { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [expenditureType, setExpenditureType] = useState("Food");

  const expenditureOptions = ["Food", "Rent", "Transport", "Entertainment", "Miscellaneous"];

  // Updated handleSubmit with API call
  const handleSubmit = () => {
    if (amount && expenditureType) {
      // API call to the backend to store the expenditure data
      fetch("http://localhost:3001/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, expenditureType }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Reset form
          setAmount("");
          setExpenditureType("Food");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add1 Your Expenditure</h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        {/* Expenditure Type Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="type">Expenditure Type</label>
          <select
            id="type"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={expenditureType}
            onChange={(e) => setExpenditureType(e.target.value)}
          >
            {expenditureOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md focus:outline-none"
          onClick={handleSubmit}
        >
          Add Expenditure
        </button>
      </div>
    </div>
  );
}

export default App;
