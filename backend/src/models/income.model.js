import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
},{timestamps: true});

export const Income = mongoose.model("Income", incomeSchema);