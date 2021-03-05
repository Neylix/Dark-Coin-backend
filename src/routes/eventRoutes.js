import { Router } from 'express';
const router = Router();

import { getEventItems, getEventRoles} from '../controllers/eventController.js';

// Get event's items
router.get('/:id/items', getEventItems);

// Get event's roles
router.get('/:id/roles', getEventRoles);

export default router;