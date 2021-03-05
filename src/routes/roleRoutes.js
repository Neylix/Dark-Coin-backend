import { Router } from 'express';
const router = Router();

import { getRoleItems } from '../controllers/roleController.js';

// Get role's items
router.get('/:id/items', getRoleItems);

export default router;