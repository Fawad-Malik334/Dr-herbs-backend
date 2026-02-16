import jwt from 'jsonwebtoken';
import { HttpError } from '../lib/httpError.js';
import { jwtSecret } from '../lib/config.js';

export const requireAdmin = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Unauthorized'));
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.admin = payload;
    return next();
  } catch {
    return next(new HttpError(401, 'Unauthorized'));
  }
};
