const router = require('express').Router();
const Listing = require('../models/Listing');
const { requireAuth, requireRole } = require('../middleware/auth');

const publicFields = 'name organization phone role';

const emit = (req, event, listing) => {
  const io = req.app.get('io');
  if (!io) return;
  io.to('listings').emit(event, listing);
  io.to(`listing:${listing._id}`).emit('listing:status', {
    id: listing._id,
    status: listing.status,
    updatedAt: listing.updatedAt,
  });
};

const populate = (q) =>
  q
    .populate('donor', publicFields)
    .populate('claimedBy', publicFields)
    .populate('volunteer', publicFields);

router.post('/', requireAuth, requireRole('donor'), async (req, res) => {
  try {
    const { title, description, category, quantityKg, expiresAt, address, lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'lat and lng (numbers) are required' });
    }
    const listing = await Listing.create({
      donor: req.user._id,
      title,
      description,
      category,
      quantityKg,
      expiresAt,
      address,
      location: { type: 'Point', coordinates: [lng, lat] },
    });
    const full = await populate(Listing.findById(listing._id));
    emit(req, 'listing:new', full);
    res.status(201).json(full);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/nearby', requireAuth, async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = parseFloat(req.query.radiusKm) || 5;
  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return res.status(400).json({ error: 'lat and lng query params are required' });
  }
  const listings = await populate(
    Listing.find({
      status: 'available',
      expiresAt: { $gt: new Date() },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000,
        },
      },
    }).limit(100)
  );
  res.json(listings);
});

router.get('/mine', requireAuth, async (req, res) => {
  const field = { donor: 'donor', receiver: 'claimedBy', volunteer: 'volunteer' }[req.user.role];
  const listings = await populate(
    Listing.find({ [field]: req.user._id }).sort({ updatedAt: -1 }).limit(100)
  );
  res.json(listings);
});


router.get('/pickups', requireAuth, requireRole('volunteer'), async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radiusKm = parseFloat(req.query.radiusKm) || 10;
  const filter = { status: 'claimed' };
  if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
    filter.location = {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: radiusKm * 1000,
      },
    };
  }
  res.json(await populate(Listing.find(filter).limit(100)));
});

// Atomic transition helper: only succeeds if the doc is still in the expected state
async function transition(req, res, filter, update) {
  const listing = await Listing.findOneAndUpdate(
    { _id: req.params.id, ...filter },
    { $set: { ...update, updatedAt: new Date() } },
    { new: true }
  );
  if (!listing) {
    return res.status(409).json({ error: 'Listing not found or not in a valid state for this action' });
  }
  const full = await populate(Listing.findById(listing._id));
  emit(req, 'listing:update', full);
  res.json(full);
}

router.post('/:id/claim', requireAuth, requireRole('receiver'), (req, res) =>
  transition(
    req,
    res,
    { status: 'available', expiresAt: { $gt: new Date() } },
    { status: 'claimed', claimedBy: req.user._id, claimedAt: new Date() }
  )
);

router.post('/:id/pickup', requireAuth, requireRole('volunteer'), (req, res) =>
  transition(
    req,
    res,
    { status: 'claimed' },
    { status: 'in_transit', volunteer: req.user._id, pickedUpAt: new Date() }
  )
);

router.post('/:id/deliver', requireAuth, requireRole('volunteer'), (req, res) =>
  transition(
    req,
    res,
    { status: 'in_transit', volunteer: req.user._id },
    { status: 'delivered', deliveredAt: new Date() }
  )
);

router.post('/:id/cancel', requireAuth, requireRole('donor'), (req, res) =>
  transition(req, res, { status: 'available', donor: req.user._id }, { status: 'cancelled' })
);

module.exports = router;
