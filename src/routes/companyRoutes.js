import { Router } from 'express';
const router = Router();

import { getCommpanyUsers, getCompanyEvents } from '../controllers/companyController.js';

// Get company's events
router.get('/:id/events', getCompanyEvents);

router.get('/:id/users', getCommpanyUsers);

export default router;