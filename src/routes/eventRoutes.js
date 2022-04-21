import { Router } from 'express';
const router = Router();

import { getEventDatas, updateEvent, createEvent } from '../controllers/eventController.js';

// Get all event's data (user, items, roles, items/role)
router.get('/:id/datas', getEventDatas);

// Update an event
router.put('/:id', updateEvent)

// Create an event and return uniqueId
router.post('/', createEvent)

export default router;