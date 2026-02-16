import bcrypt from 'bcryptjs';
import { adminEmail, adminPassword } from '../lib/config.js';
import { getRepos } from '../repositories/getRepos.js';

export const seedAdminIfNeeded = async () => {
  const { adminRepo } = await getRepos();

  const existing = await adminRepo.findByEmail(adminEmail);
  if (existing) return;

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await adminRepo.create({ email: adminEmail, passwordHash });
};
