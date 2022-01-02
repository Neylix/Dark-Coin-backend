import { Router } from 'express';
const router = Router();

import { deleteItem } from '../controllers/itemController.js';

// Get all event's data (user, items, roles, items/role)
router.delete('/:id', deleteItem);

export default router;