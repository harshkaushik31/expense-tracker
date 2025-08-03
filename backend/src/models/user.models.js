import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    income: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income'
    }],
    expense: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);