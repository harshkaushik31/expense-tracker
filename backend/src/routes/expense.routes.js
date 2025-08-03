import { Router } from 'express';
import { addExpense } from '../controllers/expense.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// Creates the /add endpoint for expenses
router.route('/add').post(protect, addExpense);

export default router;