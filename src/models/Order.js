import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    id: { type: String, default: '' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image_url: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    customer_email: { type: String, default: '' },
    customer_phone: { type: String, required: true },
    ad_code: { type: String, default: '' },
    shipping_address: { type: String, required: true },
    city: { type: String, default: '' },
    postal_code: { type: String, default: '' },
    notes: { type: String, default: '' },
    payment_method: { type: String, default: 'cod' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    items: { type: [orderItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    shipping_cost: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

orderSchema.virtual('created_date').get(function () {
  return this.createdAt?.toISOString?.();
});

orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

export const Order = mongoose.model('Order', orderSchema);
