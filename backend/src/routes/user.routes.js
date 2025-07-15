import { Router } from 'express'
import { getUserProfile, healthCheck, registerUser, loginUser, updateUserImage } from '../controllers/user.controller.js'
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';

const router = Router();

router.route('/healthCheck').get(healthCheck)
router.route('/userData').get(protect,getUserProfile)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update-image').post(protect,upload.single('image'),updateUserImage);

export default router