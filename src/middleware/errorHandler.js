import { HttpError } from '../lib/httpError.js';

export const errorHandler = (err, _req, res, _next) => {
  const status = err instanceof HttpError ? err.status : (err.status || 500);

  const payload = {
    message: err.message || 'Internal Server Error',
  };

  if (err instanceof HttpError && err.details != null) {
    payload.details = err.details;
  }

  res.status(status).json(payload);
};
