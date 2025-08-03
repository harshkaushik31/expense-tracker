import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.models.js"; // Import the User model

const addExpense = asyncHandler(async (req, res) => {
    const { category, amount } = req.body;
    const userId = req.user._id;

    // --- Validation ---
    if (!category || !amount) {
        throw new ApiError(400, "Category and amount are required.");
    }
    if (typeof amount !== 'number' || amount <= 0) {
        throw new ApiError(400, "Amount must be a positive number.");
    }

    // --- Create the new expense document ---
    const newExpense = await Expense.create({
        category,
        amount,
        user: userId,
    });
    
    if (!newExpense) {
        throw new ApiError(500, "Failed to create new expense entry in the database.");
    }

    // --- Add the new expense's ID to the user's expense array ---
    await User.findByIdAndUpdate(userId, {
        $push: { expense: newExpense._id },
    });

    // --- Send a success response ---
    return res.status(201).json(
        new ApiResponse(201, newExpense, "Expense added successfully.")
    );
});

// Export the function
export { addExpense };