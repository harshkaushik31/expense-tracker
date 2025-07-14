import { ApiError } from "../util/ApiError";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";

import Expense from "../models/Expense.js";

const addExpense = asyncHandler(async (req, res) => {
    const { amount, category, date } = req.body;

    // Validate input
    if (!amount || !category || !date) {
        throw new ApiError(400, "All fields are required");
    }

    // Assuming req.user is set by an authentication middleware
    const userId = req.user._id;

    // Create a new expense entry
    const expenseEntry = {
        userId,
        amount,
        category,
        date: new Date(date)
    };

    const newExpense = await Expense.create(expenseEntry);

    res.status(201).json(new ApiResponse(201, newExpense, "Expense added successfully"));
});

export { addExpense };