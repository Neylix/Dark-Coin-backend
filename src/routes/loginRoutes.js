import { Router } from 'express';
const router = Router();

import { login } from '../controllers/loginController.js';

// Return all users for debug
router.post('/', login);

export default router;