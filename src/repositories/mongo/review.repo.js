import { Review } from '../../models/Review.js';

export const reviewRepo = {
  async listByProductId(productId) {
    return Review.find({ product_id: String(productId) }).sort({ createdAt: -1 });
  },

  async create(data) {
    return Review.create(data);
  },
};
