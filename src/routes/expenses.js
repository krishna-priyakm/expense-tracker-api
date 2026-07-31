const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");

// Get all expenses
router.get("/", expenseController.getExpenses);

// Add expense
router.post("/", expenseController.createExpense);

// Delete expense
router.delete("/:id", expenseController.removeExpense);

module.exports = router;

// Filter Expense
router.get("/filter", expenseController.filterExpenses);

// Total Expense
router.get("/total", expenseController.totalExpenses);