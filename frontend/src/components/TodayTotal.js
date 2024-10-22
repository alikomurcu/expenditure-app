import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://expenditure-app-backend.onrender.com';

const TodayTotal = ({ refreshKey }) => {
  const [todayTotal, setTodayTotal] = useState(0);

  useEffect(() => {
    const fetchTodayTotal = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/expenses/today-total`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTodayTotal(response.data.total);
      } catch (error) {
        console.error('Error fetching today\'s total:', error);
      }
    };

    fetchTodayTotal();
  }, [refreshKey]);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold text-center">Today's Total Expenses</h2>
      <p className="text-4xl font-extrabold text-center mt-2">
        ${todayTotal.toFixed(2)}
      </p>
    </div>
  );
};

export default TodayTotal;
