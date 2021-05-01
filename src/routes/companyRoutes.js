import { Router } from 'express';
const router = Router();

import { getCompany, getCompanyEvents } from '../controllers/companyController.js';
import authorization from '../middlewares/authorization.js';
import roles from '../models/roles.js';

// Get company's events
router.get('/events', getCompanyEvents);

router.get('/', authorization(roles.COMPANY), getCompany);

export default router;