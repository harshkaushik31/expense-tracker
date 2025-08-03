import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// commonly used middlewares
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from './routes/user.routes.js'
import incomeRouter from './routes/income.routes.js' // <-- ADD THIS
import expenseRouter from './routes/expense.routes.js'; // <-- ADD THIS

app.use('/api/v1/user',userRouter)
app.use("/api/v1/income", incomeRouter);   // <-- ADD THIS
app.use("/api/v1/expense", expenseRouter); // <-- ADD THIS

export { app }