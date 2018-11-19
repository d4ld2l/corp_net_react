import express from 'express'

import * as AuthController from '../controllers/auth'

const router = express.Router()

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.post('/generate_new_password_email', AuthController.generateNewPass)
router.post('/reset_password', AuthController.resetNewPass)
router.post('/logout', AuthController.logout)
router.get('/login_settings', AuthController.loginSettings)

export default router
