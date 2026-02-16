import { Order } from '../../models/Order.js';

export const orderRepo = {
  async create(data) {
    return Order.create(data);
  },

  async list() {
    return Order.find().sort({ createdAt: -1 });
  },

  async getById(id) {
    return Order.findById(id);
  },

  async updateStatus(id, status) {
    return Order.findByIdAndUpdate(id, { status }, { new: true });
  },
};
