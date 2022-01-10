import { Router } from 'express';
const router = Router();

import { deleteItem, createItem } from '../controllers/itemController.js';

// Delete an item
router.delete('/:id', deleteItem);

// Create an item and return uniqueId created
router.post('/', createItem);

export default router;