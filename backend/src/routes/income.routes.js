import { Router } from 'express';
import { addIncome } from '../controllers/income.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

// This line creates the /add endpoint
// It will be protected, so only logged-in users can add income
router.route('/add').post(protect, addIncome);

export default router;