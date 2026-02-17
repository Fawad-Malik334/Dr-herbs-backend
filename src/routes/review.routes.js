import { Router } from 'express';
import { createReview, listReviews } from '../controllers/review.controller.js';

const router = Router();

router.get('/', listReviews);
router.post('/', createReview);

export default router;
