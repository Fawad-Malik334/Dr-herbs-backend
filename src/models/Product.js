import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    short_description: { type: String, default: '' },
    price: { type: Number, required: true },
    original_price: { type: Number, default: null },
    category: { type: String, default: '' },
    image_url: { type: String, default: '' },
    images: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    review_count: { type: Number, default: 0 },
    benefits: { type: [String], default: [] },
    ingredients: { type: String, default: '' },
  },
  { timestamps: true }
);

productSchema.virtual('created_date').get(function () {
  return this.createdAt?.toISOString?.();
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

export const Product = mongoose.model('Product', productSchema);
