import React, { useState, useEffect } from "react";
import axios from "axios";
import MonthlyExpenses from "./components/MonthlyExpenses";
import TodayTotal from "./components/TodayTotal";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState("add");
  const [amount, setAmount] = useState("");
  const [expenditureType, setExpenditureType] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with today's date
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/expenses", {
        amount: parseFloat(amount),
        expenditureType,
        date: date.toISOString(),
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAmount("");
      setExpenditureType("");
      setDate(new Date());
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  if (!isAuthenticated) {
    return showLogin ? 
      <Login onLogin={handleLogin} switchToSignup={() => setShowLogin(false)} /> :
      <Signup onSignup={handleLogin} switchToLogin={() => setShowLogin(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <button
          onClick={handleLogout}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
        <TodayTotal refreshKey={refreshKey} />
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 ${activeTab === "add" ? "bg-blue-500 text-white" : "bg-gray-300"} rounded-l-lg`}
            onClick={() => setActiveTab("add")}
          >
            Add Expenditure
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "monthly" ? "bg-blue-500 text-white" : "bg-gray-300"} rounded-r-lg`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly Expenses
          </button>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "add" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Expenditure Type:</label>
              <select
                value={expenditureType}
                onChange={(e) => setExpenditureType(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Date:</label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md focus:outline-none"
            >
              Add Expenditure
            </button>
          </form>
        ) : (
          <MonthlyExpenses />
        )}
      </div>
    </div>
  );
}

export default App;
