import { Admin } from '../../models/Admin.js';

export const adminRepo = {
  async findByEmail(email) {
    return Admin.findOne({ email });
  },

  async create({ email, passwordHash }) {
    return Admin.create({ email, passwordHash });
  },

  async ensureSeedAdmin({ email, passwordHash }) {
    const existing = await this.findByEmail(email);
    if (existing) return existing;
    return this.create({ email, passwordHash });
  },
};
