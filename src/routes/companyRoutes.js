import { Router } from 'express';
const router = Router();

import { getCompanyEvents } from '../controllers/companyController.js';

// Get company's events
router.get('/:id/events', getCompanyEvents);

export default router;