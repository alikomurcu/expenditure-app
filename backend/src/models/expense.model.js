const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  expenditureType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically store the date when the expense is created
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
