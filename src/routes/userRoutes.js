import { Router } from 'express';
const router = Router();

import { createUser } from '../controllers/userController.js';

// Return user with credentials
router.post('/signup', createUser);

export default router;