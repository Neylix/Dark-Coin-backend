import { Router } from 'express';
const router = Router();

import { createUser, getUsers } from '../controllers/userController.js';

// Return user with credentials
router.post('/', createUser);

// Return all users for debug
router.get('/', getUsers);

export default router;