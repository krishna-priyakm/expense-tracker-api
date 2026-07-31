const express = require("express");

const expenseRoutes = require("./routes/expenses");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Expense Tracker API is running"
    });
});

module.exports = app;