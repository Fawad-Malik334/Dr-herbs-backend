import { readJson, writeJson } from '../../lib/fileStore.js';

const FILE = 'products.json';

const load = async () => readJson(FILE, []);
const save = async (items) => writeJson(FILE, items);

export const productRepo = {
  async list({ featured, category, q } = {}) {
    const items = await load();
    return items
      .filter((p) => {
        if (featured === true && p.featured !== true) return false;
        if (category && p.category !== category) return false;
        if (q && !String(p.name || '').toLowerCase().includes(String(q).toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
  },

  async getById(id) {
    const items = await load();
    return items.find((p) => p.id === id) || null;
  },

  async create(data) {
    const items = await load();
    const created = {
      ...data,
      id: String(Date.now()),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    };
    items.unshift(created);
    await save(items);
    return created;
  },

  async update(id, data) {
    const items = await load();
    const index = items.findIndex((p) => p.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...data, updated_date: new Date().toISOString() };
    await save(items);
    return items[index];
  },

  async remove(id) {
    const items = await load();
    const next = items.filter((p) => p.id !== id);
    if (next.length === items.length) return false;
    await save(next);
    return true;
  },
};
