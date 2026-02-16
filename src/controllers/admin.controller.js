import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { HttpError } from '../lib/httpError.js';
import { jwtSecret } from '../lib/config.js';
import { getRepos } from '../repositories/getRepos.js';

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new HttpError(400, 'Email and password are required');
    }

    const { adminRepo } = await getRepos();
    const admin = await adminRepo.findByEmail(String(email).toLowerCase().trim());
    if (!admin) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const ok = await bcrypt.compare(String(password), admin.passwordHash);
    if (!ok) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const token = jwt.sign({ adminId: admin.id, email: admin.email }, jwtSecret, { expiresIn: '7d' });

    res.json({ token, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    next(err);
  }
};
