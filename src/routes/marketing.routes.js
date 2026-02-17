import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.js';
import { getFacebookPixelReport } from '../controllers/marketing.controller.js';

const router = Router();

router.get('/facebook-pixel', requireAdmin, getFacebookPixelReport);

export default router;
