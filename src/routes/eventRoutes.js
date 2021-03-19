import { Router } from 'express';
const router = Router();

import { getEventItems, getEventRoles, getEventDatas } from '../controllers/eventController.js';

// Get event's items
router.get('/:id/items', getEventItems);

// Get event's roles
router.get('/:id/roles', getEventRoles);

// Get all event's data (user, items, roles, items/role)
router.get('/:id/datas', getEventDatas);

export default router;