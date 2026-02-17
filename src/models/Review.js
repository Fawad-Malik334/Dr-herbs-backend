import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, index: true },
    reviewer_name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

reviewSchema.virtual('created_date').get(function () {
  return this.createdAt?.toISOString?.();
});

reviewSchema.set('toJSON', { virtuals: true });
reviewSchema.set('toObject', { virtuals: true });

export const Review = mongoose.model('Review', reviewSchema);
