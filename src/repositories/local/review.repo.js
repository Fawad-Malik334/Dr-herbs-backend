import { readJson, writeJson } from '../../lib/fileStore.js';

const FILE = 'reviews.json';

const load = async () => readJson(FILE, []);
const save = async (items) => writeJson(FILE, items);

export const reviewRepo = {
  async listByProductId(productId) {
    const items = await load();
    return items
      .filter((r) => r.product_id === String(productId))
      .sort((a, b) => new Date(b.created_date || 0) - new Date(a.created_date || 0));
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
};
