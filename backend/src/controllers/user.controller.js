import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d' })
}


const healthCheck = asyncHandler( async (req , res) => {
    res.status(200).json(new ApiResponse(200,"OK"))
} )

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // If email already exists, throw an error
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(newUser._id.toString());


    res.status(201).json(new ApiResponse(201, token, "User registered successfully"));
});

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id.toString());

    res.status(200).json(new ApiResponse(200, token, "Login successful"));
});


const getUserProfile = asyncHandler( async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

const getUserExpenses = asyncHandler( async (req, res) => {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });
    if (!expenses) {
        throw new ApiError(404, "No expenses found");
    }

    res.status(200).json(new ApiResponse(200, expenses, "User expenses retrieved successfully"));
});

const updateUserProfile = asyncHandler( async (req, res) => {
    const userId = req.user._id;
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
        throw new ApiError(400, "Name and email are required");
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "User profile updated successfully"));
});

const getIncome = asyncHandler( async (req, res) => {
    const userId = req.user._id;

    const income = await Income.find({ user: userId });
    if (!income) {
        throw new ApiError(404, "No income found");
    }

    res.status(200).json(new ApiResponse(200, income, "User income retrieved successfully"));
});

export { healthCheck, getUserProfile, getUserExpenses, updateUserProfile, getIncome , registerUser, loginUser };