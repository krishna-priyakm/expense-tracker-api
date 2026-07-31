const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../../expenses.json");

// Read expenses from JSON file
async function readExpenses() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write expenses to JSON file
async function writeExpenses(expenses) {
    await fs.writeFile(
        filePath,
        JSON.stringify(expenses, null, 2)
    );
}

module.exports = {
    readExpenses,
    writeExpenses,
};