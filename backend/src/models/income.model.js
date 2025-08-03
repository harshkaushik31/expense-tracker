import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

export const Income = mongoose.model('Income', incomeSchema);