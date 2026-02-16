import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { seedAdminIfNeeded } from './seed/seedAdmin.js';
import { corsOrigin } from './lib/config.js';

import adminRoutes from './routes/admin.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'backend-ecomarce' });
});

app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 5005);

const start = async () => {
  await seedAdminIfNeeded();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});
module.exports = app;