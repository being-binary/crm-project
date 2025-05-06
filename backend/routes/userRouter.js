import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .isAlphanumeric()
      .withMessage('Password must be at least 6 characters and alphanumeric'),
    body('name')
      .isLength({ min: 3 })
      .withMessage('First name should be at least 3 characters long'),
  ],
  registerUser
);

// Login route
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  loginUser
);

export default router;
