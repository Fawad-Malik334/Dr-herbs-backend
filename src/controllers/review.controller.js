import { z } from 'zod';
import { HttpError } from '../lib/httpError.js';
import { getRepos } from '../repositories/getRepos.js';

const createReviewSchema = z.object({
  product_id: z.string().min(1),
  reviewer_name: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
});

export const listReviews = async (req, res, next) => {
  try {
    const { product_id } = req.query;
    if (typeof product_id !== 'string' || !product_id) {
      throw new HttpError(400, 'product_id is required');
    }

    const { reviewRepo } = await getRepos();
    const reviews = await reviewRepo.listByProductId(product_id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const parsed = createReviewSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation error', parsed.error.flatten());
    }

    const { reviewRepo } = await getRepos();
    const created = await reviewRepo.create(parsed.data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
