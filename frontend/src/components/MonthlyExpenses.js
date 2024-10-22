import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonthlyExpenses = ({ refreshKey }) => {
  const [expenses, setExpenses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/expenses/monthly-expenses', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching monthly expenses:', error);
        setLoading(false);
      });
  }, [refreshKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Create table rows based on expenses data
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const expenditureTypes = ["Food", "Rent", "Transport", "Entertainment", "Miscellaneous"];

  const rows = Array.from({ length: daysInMonth }, (_, day) => {
    const dayExpenses = expenses[day + 1] || [];

    const dailyTotals = expenditureTypes.map(type => {
      const totalForType = dayExpenses
        .filter(exp => exp.expenditureType === type)
        .reduce((sum, exp) => sum + exp.amount, 0);
      return totalForType;
    });

    const dailyTotal = dailyTotals.reduce((sum, total) => sum + total, 0);

    return (
      <tr key={day}>
        <td>{day + 1}</td>
        {dailyTotals.map((total, index) => (
          <td key={index}>{total.toFixed(2)}</td>
        ))}
        <td>{dailyTotal.toFixed(2)}</td>
      </tr>
    );
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-200 text-sm font-semibold text-gray-700">Date</th>
              {expenditureTypes.map((type) => (
                <th key={type} className="px-4 py-2 border border-gray-200 text-sm font-semibold text-gray-700">{type}</th>
              ))}
              <th className="px-4 py-2 border border-gray-200 text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {React.Children.map(row.props.children, (cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 border border-gray-200 text-sm text-gray-700">
                    {cell.props.children}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyExpenses;
