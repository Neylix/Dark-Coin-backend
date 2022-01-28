import { Router } from 'express';
const router = Router();

import { deleteItem, createItem, updateItem } from '../controllers/itemController.js';

// Delete an item
router.delete('/:id', deleteItem);

// Create an item and return uniqueId created
router.post('/', createItem);

// Update an item
router.put('/:id', updateItem)

export default router;