import bcrypt from 'bcryptjs';
import { readJson, writeJson } from '../../lib/fileStore.js';

const FILE = 'admins.json';

const load = async () => readJson(FILE, []);
const save = async (items) => writeJson(FILE, items);

export const adminRepo = {
  async findByEmail(email) {
    const admins = await load();
    return admins.find((a) => a.email === email) || null;
  },

  async create({ email, passwordHash }) {
    const admins = await load();
    const created = {
      id: String(Date.now()),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    admins.push(created);
    await save(admins);
    return created;
  },

  async ensureSeedAdmin({ email, password }) {
    const existing = await this.findByEmail(email);
    if (existing) return existing;
    const passwordHash = await bcrypt.hash(password, 10);
    return this.create({ email, passwordHash });
  },
};
