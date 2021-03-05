import { Router } from 'express';
const router = Router();

import { getUser } from '../controllers/userController.js';

// Return user with credentials
router.post('/', getUser);

export default router;