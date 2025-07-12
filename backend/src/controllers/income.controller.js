import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";

const addIncome = asyncHandler(async (req, res) => {
    const { amount, source } = req.body;

    // Validate input
    if (!amount || !source) {
        throw new ApiError(400, "All fields are required");
    }

    // Assuming req.user is set by an authentication middleware
    const userId = req.user._id;

    // Create a new income entry
    const incomeEntry = {
        userId,
        amount,
        source,
        date: new Date(date)
    };

    // Save the income entry to the database (assuming Income is a Mongoose model)
    const newIncome = await Income.create(incomeEntry);

    res.status(201).json(new ApiResponse(201, newIncome, "Income added successfully"));
})