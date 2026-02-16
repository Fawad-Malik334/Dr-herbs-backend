import { Router } from 'express';
import {
  createOrder,
  getAdminOrder,
  listAdminOrders,
  updateAdminOrderStatus,
} from '../controllers/order.controller.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Website: create order
router.post('/', createOrder);

// Admin: manage orders
router.get('/admin', requireAdmin, listAdminOrders);
router.get('/admin/:id', requireAdmin, getAdminOrder);
router.put('/admin/:id/status', requireAdmin, updateAdminOrderStatus);

export default router;
