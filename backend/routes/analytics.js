const router = require('express').Router();
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const { requireAuth } = require('../middleware/auth');

const CO2_PER_KG = parseFloat(process.env.CO2_PER_KG) || 2.5;
const KG_PER_MEAL = parseFloat(process.env.KG_PER_MEAL) || 0.4;

// Impact dashboard. Optional ?scope=me limits to the caller's own listings.
router.get('/impact', requireAuth, async (req, res) => {
  const match = { status: 'delivered' };
  if (req.query.scope === 'me') {
    const field = { donor: 'donor', receiver: 'claimedBy', volunteer: 'volunteer' }[req.user.role];
    match[field] = new mongoose.Types.ObjectId(req.user._id);
  }
  const days = Math.min(parseInt(req.query.days, 10) || 30, 365);
  const since = new Date(Date.now() - days * 86400000);

  const [result] = await Listing.aggregate([
    { $match: match },
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: null,
              deliveries: { $sum: 1 },
              totalKg: { $sum: '$quantityKg' },
            },
          },
        ],
        byCategory: [
          { $group: { _id: '$category', kg: { $sum: '$quantityKg' }, count: { $sum: 1 } } },
          { $sort: { kg: -1 } },
        ],
        daily: [
          { $match: { deliveredAt: { $gte: since } } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$deliveredAt' } },
              kg: { $sum: '$quantityKg' },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ],
        topDonors: [
          { $group: { _id: '$donor', kg: { $sum: '$quantityKg' }, count: { $sum: 1 } } },
          { $sort: { kg: -1 } },
          { $limit: 5 },
          { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'donor' } },
          { $unwind: '$donor' },
          { $project: { _id: 0, name: { $ifNull: ['$donor.organization', '$donor.name'] }, kg: 1, count: 1 } },
        ],
        byReceiver: [
          { $group: { _id: '$claimedBy', kg: { $sum: '$quantityKg' }, count: { $sum: 1 } } },
          { $sort: { kg: -1 } },
          { $limit: 5 },
          { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'receiver' } },
          { $unwind: '$receiver' },
          { $project: { _id: 0, name: { $ifNull: ['$receiver.organization', '$receiver.name'] }, kg: 1, count: 1 } },
        ],
      },
    },
  ]);

  const t = result.totals[0] || { deliveries: 0, totalKg: 0 };
  res.json({
    deliveries: t.deliveries,
    totalKg: round(t.totalKg),
    mealsSaved: Math.round(t.totalKg / KG_PER_MEAL),
    co2AvoidedKg: round(t.totalKg * CO2_PER_KG),
    assumptions: { CO2_PER_KG, KG_PER_MEAL },
    byCategory: result.byCategory,
    daily: result.daily,
    topDonors: result.topDonors,
    topReceivers: result.byReceiver,
  });
});

const round = (n) => Math.round(n * 10) / 10;

module.exports = router;
