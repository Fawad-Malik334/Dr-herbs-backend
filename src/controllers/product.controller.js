import { z } from 'zod';
import { HttpError } from '../lib/httpError.js';
import { getRepos } from '../repositories/getRepos.js';

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(''),
  short_description: z.string().optional().default(''),
  price: z.number().nonnegative(),
  original_price: z.number().nonnegative().nullable().optional().default(null),
  category: z.string().optional().default(''),
  image_url: z.string().optional().default(''),
  images: z.array(z.string()).optional().default([]),
  stock: z.number().int().nonnegative().optional().default(0),
  featured: z.boolean().optional().default(false),
  rating: z.number().nonnegative().optional().default(0),
  review_count: z.number().int().nonnegative().optional().default(0),
  benefits: z.array(z.string()).optional().default([]),
  ingredients: z.string().optional().default(''),
});

export const listProducts = async (req, res, next) => {
  try {
    const { featured, category, q } = req.query;

    const { productRepo } = await getRepos();
    const products = await productRepo.list({
      featured: featured === 'true' ? true : undefined,
      category: typeof category === 'string' && category ? category : undefined,
      q: typeof q === 'string' && q ? q : undefined,
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { productRepo } = await getRepos();
    const product = await productRepo.getById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const parsed = productSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation error', parsed.error.flatten());
    }

    const { productRepo } = await getRepos();
    const created = await productRepo.create(parsed.data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const parsed = productSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation error', parsed.error.flatten());
    }

    const { productRepo } = await getRepos();
    const updated = await productRepo.update(id, parsed.data);
    if (!updated) {
      throw new HttpError(404, 'Product not found');
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { productRepo } = await getRepos();
    const ok = await productRepo.remove(id);
    if (!ok) {
      throw new HttpError(404, 'Product not found');
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
