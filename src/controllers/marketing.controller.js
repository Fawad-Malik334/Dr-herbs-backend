import { HttpError } from '../lib/httpError.js';
import { getRepos } from '../repositories/getRepos.js';

export const getFacebookPixelReport = async (req, res, next) => {
  try {
    const adCode = String(req.query?.ad_code || '').trim();
    if (!adCode) {
      throw new HttpError(400, 'ad_code is required');
    }

    const { orderRepo } = await getRepos();
    const orders = await orderRepo.list();

    const matched = (Array.isArray(orders) ? orders : []).filter((o) => {
      return String(o?.ad_code || '').trim() === adCode;
    });

    const totalOrders = matched.length;
    const totalRevenue = matched.reduce((sum, o) => sum + Number(o?.total || 0), 0);

    res.json({
      ad_code: adCode,
      total_orders: totalOrders,
      total_revenue: totalRevenue,
      orders: matched,
    });
  } catch (err) {
    next(err);
  }
};
