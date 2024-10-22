const express = require('express');
const Expense = require('../models/expense.model');
const auth = require('../middleware/auth');
const router = express.Router();
const { startOfMonth, endOfMonth, startOfDay, endOfDay } = require('date-fns');

// POST request to add a new expense
router.post('/', auth, async (req, res) => {
  try {
    const { amount, expenditureType, date } = req.body;
    
    console.log('Received data:', { amount, expenditureType, date });

    // Validate the input
    if (!amount || !expenditureType) {
      return res.status(400).json({ message: "Amount and Expenditure Type are required" });
    }

    // Create a new expense document
    const newExpense = new Expense({
      amount,
      expenditureType,
      date: date ? new Date(date) : undefined,
      user: req.user._id
    });

    // Save the expense to the database
    await newExpense.save();

    console.log('Expense added:', newExpense);

    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET request to fetch monthly expenses
router.get('/monthly-expenses', auth, async (req, res) => {
  try {
    // Get the current date
    const now = new Date();

    // Define the start and end of the current month
    const startDate = startOfMonth(now); // Beginning of the current month
    const endDate = endOfMonth(now);     // End of the current month

    // Find all expenses within the current month
    const expenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate,
      }
    });

    // Group expenses by day
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date).getDate(); // Get day of the month (1-31)
      if (!groupedExpenses[expenseDate]) {
        groupedExpenses[expenseDate] = [];
      }
      groupedExpenses[expenseDate].push(expense);
    });

    res.status(200).json(groupedExpenses);
  } catch (error) {
    console.error('Error fetching monthly expenses:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET request to fetch today's total expenses
router.get('/today-total', auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const todayExpenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: startOfToday,
        $lte: endOfToday,
      }
    });

    const total = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({ total });
  } catch (error) {
    console.error('Error fetching today\'s total expenses:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
