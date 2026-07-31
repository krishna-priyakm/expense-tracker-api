const expenseService = require("../services/expenseService");

// Get all expenses
async function getExpenses(req, res) {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch expenses"
        });
    }
}

// Add expense
async function createExpense(req, res) {
    try {
        const { title, amount, category, date } = req.body;

        // Basic validation
        if (!title || !amount || !category || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newExpense = await expenseService.addExpense({
            title,
            amount,
            category,
            date
        });

        res.status(201).json(newExpense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to add expense"
        });
    }
}

module.exports = {
    getExpenses,
    createExpense, 
    removeExpense,
    filterExpenses,
    totalExpenses
};

// Delete expense
async function removeExpense(req, res) {
    try {
        const { id } = req.params;

        const deleted = await expenseService.deleteExpense(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete expense"
        });
    }
}

// Filter by category
async function filterExpenses(req, res) {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({
                message: "Category is required"
            });
        }

        const expenses = await expenseService.getExpensesByCategory(category);

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: "Failed to filter expenses"
        });
    }
}

// Get total expenses
async function totalExpenses(req, res) {
    try {
        const { category } = req.query;

        const total = await expenseService.getTotalExpenses(category);

        res.status(200).json({
            total
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to calculate total"
        });
    }
}