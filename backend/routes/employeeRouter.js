import express from 'express';
import { createEmployee, getAllEmployees } from '../controllers/employeeController.js';
import checkToken from '../middleware/checktoken.js';

const router = express.Router();
router.post('/create', checkToken, createEmployee);
router.get('/get', checkToken, getAllEmployees);

export default router;
