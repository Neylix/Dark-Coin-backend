import { Router } from 'express';
const router = Router();

import { addTransfertStats } from '../controllers/transfertStatsController.js';

// Add TransfertStatistics
router.post('/', addTransfertStats);

export default router;