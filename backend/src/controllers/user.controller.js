import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import imagekit from "../../configs/imagekit.js";
import fs from "fs";

import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";

const generateToken = (userId) => {
    const payload = { userId };
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, "OK"))
})

const registerUser = asyncHandler(async (req, res) => {
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

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(newUser._id.toString());


    res.status(201).json(new ApiResponse(201, token, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
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

    res.status(200).json(new ApiResponse(
  200,
  {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  },
  "Login successful"
));

});


const getUserProfile = asyncHandler(async (req, res) => {
    // 👇 STEP 2: WRAP THE LOGIC IN A TRY...CATCH BLOCK FOR DETAILED LOGGING
    try {
        // Log the user ID to make sure middleware is working
        console.log("Fetching profile for user ID:", req.user?._id);

        if (!req.user?._id) {
            throw new ApiError(401, "User not authenticated");
        }

        const userId = req.user._id;

        const user = await User.findById(userId)
            .select("-password")
            .populate("income")
            .populate("expense");

        if (!user) {
            throw new ApiError(404, "User not found in database");
        }

        return res.status(200).json(new ApiResponse(200, user, "User profile retrieved successfully"));

    } catch (error) {
        // Log the detailed error to your backend terminal
        console.error("🔴 ERROR IN getUserProfile:", error);

        // Throw a generic error to the frontend
        throw new ApiError(500, "Error fetching user profile.", error.message);
    }
});


const getUserExpenses = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });
    if (!expenses) {
        throw new ApiError(404, "No expenses found");
    }

    res.status(200).json(new ApiResponse(200, expenses, "User expenses retrieved successfully"));
});

const updateUserProfile = asyncHandler(async (req, res) => {
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

const updateUserImage = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const imageFile = req.file;

        if (!imageFile) {
            throw new ApiError(400, "No image uploaded");
        }

        const fileBuffer = fs.readFileSync(imageFile.path); 

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/users",
        });

        fs.unlink(imageFile.path, (err) => {
  if (err) console.error("Failed to delete temp file:", err);
});



        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" },
            ],
        });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: optimizedImageURL },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        res.status(200).json(
            new ApiResponse(200, updatedUser, "User image updated successfully")
        );
    } catch (error) {
    
        res.status(500).json({
            success: false,
            message: "Failed to update user image",
            error: error.message,
        });
    }
});


const getIncome = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const income = await Income.find({ user: userId });
    if (!income) {
        throw new ApiError(404, "No income found");
    }

    res.status(200).json(new ApiResponse(200, income, "User income retrieved successfully"));
});

export { healthCheck, getUserProfile, getUserExpenses, updateUserProfile, getIncome, registerUser, loginUser, updateUserImage };