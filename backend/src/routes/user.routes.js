import { Router } from 'express'
import { getUserProfile, healthCheck, registerUser, loginUser } from '../controllers/user.controller.js'


const router = Router();

router.route('/healthCheck').get(healthCheck)
router.route('/userData').get(getUserProfile)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

export default router