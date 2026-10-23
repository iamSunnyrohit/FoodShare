const mongoose = require('mongoose');

const STATUSES = ['available', 'claimed', 'in_transit', 'delivered', 'cancelled'];

const listingSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      enum: ['cooked', 'bakery', 'produce', 'packaged', 'dairy', 'other'],
      default: 'cooked',
    },
    quantityKg: { type: Number, required: true, min: 0.1 },
    expiresAt: { type: Date, required: true },
    address: { type: String, trim: true },
    // GeoJSON Point: [longitude, latitude]
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    status: { type: String, enum: STATUSES, default: 'available', index: true },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    claimedAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

listingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Listing', listingSchema);
module.exports.STATUSES = STATUSES;
