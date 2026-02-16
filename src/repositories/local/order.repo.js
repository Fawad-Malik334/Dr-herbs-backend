import { readJson, writeJson } from '../../lib/fileStore.js';

const FILE = 'orders.json';

const load = async () => readJson(FILE, []);
const save = async (items) => writeJson(FILE, items);

export const orderRepo = {
  async create(data) {
    const items = await load();
    const created = {
      ...data,
      id: String(Date.now()),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
      status: data.status || 'pending',
    };
    items.unshift(created);
    await save(items);
    return created;
  },

  async list() {
    const items = await load();
    return items.sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
  },

  async getById(id) {
    const items = await load();
    return items.find((o) => o.id === id) || null;
  },

  async updateStatus(id, status) {
    const items = await load();
    const index = items.findIndex((o) => o.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], status, updated_date: new Date().toISOString() };
    await save(items);
    return items[index];
  },
};
