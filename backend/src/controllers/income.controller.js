import { asyncHandler } from "../util/asyncHandler.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { Income } from "../models/income.model.js";
import { User } from "../models/user.models.js"; // Import the User model

const addIncome = asyncHandler(async (req, res) => {
    const { source, amount } = req.body;
    const userId = req.user._id; // From 'protect' middleware

    // --- Validation ---
    if (!source || !amount) {
        throw new ApiError(400, "Source and amount fields are required.");
    }
    if (typeof amount !== 'number' || amount <= 0) {
        throw new ApiError(400, "Amount must be a positive number.");
    }

    // --- Create the new income document ---
    const newIncome = await Income.create({
        source,
        amount,
        user: userId,
    });

    if (!newIncome) {
        throw new ApiError(500, "Failed to create new income entry in the database.");
    }

    // --- Add the new income's ID to the user's income array ---
    await User.findByIdAndUpdate(userId, {
        $push: { income: newIncome._id },
    });

    // --- Send a success response ---
    return res.status(201).json(
        new ApiResponse(201, newIncome, "Income added successfully.")
    );
});

// Export the function so the router can use it
export { addIncome };