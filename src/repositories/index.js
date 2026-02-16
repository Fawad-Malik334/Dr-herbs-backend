import { isMongoEnabled } from '../lib/config.js';
import { connectDb } from '../lib/db.js';

const load = async () => {
  if (isMongoEnabled) {
    try {
      const ok = await connectDb();
      if (ok) {
        const admin = await import('./mongo/admin.repo.js');
        const product = await import('./mongo/product.repo.js');
        const order = await import('./mongo/order.repo.js');
        return { adminRepo: admin.adminRepo, productRepo: product.productRepo, orderRepo: order.orderRepo };
      }
    } catch {
      // Fall back to local repositories.
    }
  }

  const admin = await import('./local/admin.repo.js');
  const product = await import('./local/product.repo.js');
  const order = await import('./local/order.repo.js');
  return { adminRepo: admin.adminRepo, productRepo: product.productRepo, orderRepo: order.orderRepo };
};

export const reposPromise = load();
