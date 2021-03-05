import { Router } from 'express';
const router = Router();

import { addItemStats } from '../controllers/itemStatsController.js';

// Add ItemStatistics
router.post('/', addItemStats);

export default router;