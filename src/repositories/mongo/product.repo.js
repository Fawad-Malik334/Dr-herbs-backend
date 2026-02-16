import { Product } from '../../models/Product.js';

export const productRepo = {
  async list({ featured, category, q } = {}) {
    const filter = {};
    if (featured === true) filter.featured = true;
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: 'i' };
    return Product.find(filter).sort({ createdAt: -1 });
  },

  async getById(id) {
    return Product.findById(id);
  },

  async create(data) {
    return Product.create(data);
  },

  async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  },

  async remove(id) {
    const deleted = await Product.findByIdAndDelete(id);
    return Boolean(deleted);
  },
};
