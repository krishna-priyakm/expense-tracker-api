const { v4: uuidv4 } = require("uuid");
const { readExpenses, writeExpenses } = require("../utils/fileHelper");

// Get all expenses
async function getAllExpenses() {
    return await readExpenses();
}

// Add expense
async function addExpense(expenseData) {
    const expenses = await readExpenses();

    const newExpense = {
        id: uuidv4(),
        ...expenseData,
    };

    expenses.push(newExpense);

    await writeExpenses(expenses);

    return newExpense;
}

module.exports = {
    getAllExpenses,
    addExpense,
    deleteExpense, 
    getExpensesByCategory,
    getTotalExpenses
    
};

// Delete expense
async function deleteExpense(id) {
    const expenses = await readExpenses();

    const filteredExpenses = expenses.filter(expense => expense.id !== id);

    if (filteredExpenses.length === expenses.length) {
        return null;
    }

    await writeExpenses(filteredExpenses);

    return true;
}

// Filter expenses by category
async function getExpensesByCategory(category) {
    const expenses = await readExpenses();

    return expenses.filter(
        expense => expense.category.toLowerCase() === category.toLowerCase()
    );
}

// Calculate total expenses
async function getTotalExpenses(category) {
    const expenses = await readExpenses();

    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = expenses.filter(
            expense => expense.category.toLowerCase() === category.toLowerCase()
        );
    }

    const total = filteredExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    return total;
}