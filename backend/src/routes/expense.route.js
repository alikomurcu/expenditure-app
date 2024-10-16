const express = require('express');
const Expense = require('../models/expense.model');
const router = express.Router();

// POST request to add a new expense
router.post('/', async (req, res) => {
  try {
    const { amount, expenditureType } = req.body;
    
    console.log('Received data:', { amount, expenditureType });

    // Validate the input
    if (!amount || !expenditureType) {
      return res.status(400).json({ message: "Amount and Expenditure Type are required" });
    }

    // Create a new expense document
    const newExpense = new Expense({
      amount,
      expenditureType,
    });

    // Save the expense to the database
    await newExpense.save();

    console.log('Expense added:', newExpense);

    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
