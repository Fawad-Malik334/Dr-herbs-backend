import { z } from 'zod';
import { HttpError } from '../lib/httpError.js';
import { getRepos } from '../repositories/getRepos.js';

const orderItemSchema = z.object({
  id: z.string().optional().default(''),
  product_id: z.string().optional().nullable().default(null),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image_url: z.string().optional().default(''),
});

const createOrderSchema = z.object({
  customer_name: z.string().min(1),
  customer_email: z.string().optional().default(''),
  customer_phone: z.string().min(1),
  shipping_address: z.string().min(1),
  city: z.string().optional().default(''),
  postal_code: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  payment_method: z.string().optional().default('cod'),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().nonnegative(),
  shipping_cost: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export const createOrder = async (req, res, next) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation error', parsed.error.flatten());
    }

    const payload = parsed.data;

    const { orderRepo } = await getRepos();
    const order = await orderRepo.create({
      ...payload,
      items: payload.items.map((i) => ({ ...i, product_id: i.product_id || null })),
      status: 'pending',
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listAdminOrders = async (_req, res, next) => {
  try {
    const { orderRepo } = await getRepos();
    const orders = await orderRepo.list();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getAdminOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderRepo } = await getRepos();
    const order = await orderRepo.getById(id);
    if (!order) {
      throw new HttpError(404, 'Order not found');
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

const statusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
});

export const updateAdminOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation error', parsed.error.flatten());
    }

    const { orderRepo } = await getRepos();
    const updated = await orderRepo.updateStatus(id, parsed.data.status);
    if (!updated) {
      throw new HttpError(404, 'Order not found');
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};
