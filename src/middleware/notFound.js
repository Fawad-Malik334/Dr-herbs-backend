import { HttpError } from '../lib/httpError.js';

export const notFound = (_req, _res, next) => {
  next(new HttpError(404, 'Route not found'));
};
