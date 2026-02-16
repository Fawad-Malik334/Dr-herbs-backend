export const isMongoEnabled = Boolean(process.env.MONGODB_URI);

export const jwtSecret = process.env.JWT_SECRET || 'dev_secret_change_me';

export const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

export const adminEmail = (process.env.ADMIN_EMAIL || 'admin@drherbs.com').toLowerCase().trim();
export const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
