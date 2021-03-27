import { Router } from 'express';
const router = Router();

import { getEventDatas } from '../controllers/eventController.js';

// Get all event's data (user, items, roles, items/role)
router.get('/:id/datas', getEventDatas);

export default router;