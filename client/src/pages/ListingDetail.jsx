import React from 'react';
import './ListingDetail.css';

export default function ListingDetail({ onBack }) {
  return (
    <div className="listing-detail-page">
      {/* Expiry Banner */}
      <div className="urgency-banner">
        <div>
          <strong>⏱ Expiring soon! Pickup required within 48 minutes</strong>
          <span> (Window closes 19:30 today)</span>
        </div>
        <span className="badge-high">🔥 HIGH PERISHABLE DEMAND</span>
      </div>

      {/* Breadcrumbs & Header Actions */}
      <div className="detail-top-bar">
        <button className="back-link" onClick={onBack}>
          ← Nearby Feed / Bakery & Grains / <strong>Artisan Sourdough & Baguettes</strong>
        </button>
        <div className="bar-actions">
          <button className="icon-btn"><span className="material-symbols-outlined">share</span></button>
          <button className="icon-btn"><span className="material-symbols-outlined">bookmark</span></button>
          <span className="listing-id-tag">Listing ID #FS-8492</span>
        </div>
      </div>

      {/* Two-Column Detail Grid */}
      <div className="detail-grid">
        {/* Left Main Content */}
        <div className="detail-main">
          <div className="detail-hero-card">
            <div className="detail-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan Sourdough"
              />
              <div className="image-overlay-badges">
                <span className="hero-pill">Zero-Waste Batch</span>
                <span className="hero-pill">Freshly Baked 4h Ago</span>
              </div>
            </div>

            <div className="donor-profile-bar">
              <div className="donor-avatar">🥖</div>
              <div>
                <h3>The Daily Loaf Bakery ✓</h3>
                <p>⭐ 4.9 (142 pickups) • Verified Artisan Partner</p>
              </div>
              <button className="profile-btn">Profile</button>
            </div>
          </div>

          {/* Rescue Flow Timeline */}
          <div className="timeline-card">
            <div className="timeline-header">
              <h4>🛤 Rescue Flow Timeline</h4>
              <span className="live-state">Live State: Step 2 of 4</span>
            </div>
            <div className="timeline-steps">
              <div className="step-box complete">
                <span className="step-icon">✓</span>
                <div>
                  <strong>1. Available</strong>
                  <p>Posted 16:15 • Inspected</p>
                </div>
              </div>
              <div className="step-box active">
                <span className="step-icon">🤝</span>
                <div>
                  <strong>2. Claimed</strong>
                  <p>Awaiting Claim • Holding spot ready</p>
                </div>
              </div>
              <div className="step-box disabled">
                <span className="step-icon">🚲</span>
                <div>
                  <strong>3. In Transit</strong>
                  <p>Courier Matching</p>
                </div>
              </div>
              <div className="step-box disabled">
                <span className="step-icon">🏁</span>
                <div>
                  <strong>4. Delivered</strong>
                  <p>Temp Signoff</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Location & Map */}
          <div className="location-card">
            <h4>📍 Pickup Location & Instructions</h4>
            <span className="dist-tag">0.8 km from you</span>

            <div className="location-map">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                alt="Location Map"
              />
              <button className="open-maps-btn">📍 Open in Maps</button>
            </div>

            <div className="address-grid">
              <div className="addr-box">
                <span className="box-sub">STREET ADDRESS</span>
                <strong>442 Elm Street, Suite 2B</strong>
                <p>Downtown Market District, West End</p>
              </div>
              <div className="addr-box">
                <span className="box-sub">ACCESS / LOADING BAY</span>
                <strong>Ring 02 for Back Kitchen Door</strong>
                <p>Wide cargo door. Dolly & cart accessible.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="detail-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-meta-top">
              <span className="cat-tag">BAKERY & GRAINS</span>
              <span className="storage-tag">Ambient / Dry Storage</span>
            </div>

            <h1 className="item-title">Artisan Sourdough & Fresh Baguettes</h1>
            <p className="item-desc">
              Surplus evening bake crafted from heritage stoneground flours. Mixed bundle includes country loaves, olive ciabatta, and rustic seeded French baguettes baked this afternoon.
            </p>

            <div className="metrics-triplet">
              <div>
                <span>Quantity</span>
                <strong>14.2 kg</strong>
                <small>~32 meals</small>
              </div>
              <div>
                <span>Expires</span>
                <strong className="urgent-text">00:00:00</strong>
                <small>Strict window</small>
              </div>
              <div>
                <span>Value</span>
                <strong>$115</strong>
                <small>Rescued cost</small>
              </div>
            </div>

            <div className="allergens-block">
              <h5>DIETARY PROFILE & ALLERGENS</h5>
              <div className="allergen-pills">
                <span className="a-pill green">Vegetarian</span>
                <span className="a-pill green">No Preservatives</span>
                <span className="a-pill red">Contains Wheat / Gluten</span>
                <span className="a-pill green">Nut-Free Facility</span>
              </div>
            </div>

            <div className="certified-box">
              <span className="material-symbols-outlined text-lg">verified</span>
              <div>
                <strong>Food Safety & Handling Certified</strong>
                <p>Packaged in food-grade perforated bakery crates with wax liners.</p>
              </div>
            </div>

            <div className="claim-action-card">
              <div className="claim-header">
                <span>🔒 Claim reservation hold: 30 minutes</span>
                <strong>No Cost • Community Resource</strong>
              </div>
              <div className="claim-btn-row">
                <button className="primary-claim-btn">🍴 Claim This Food</button>
                <button className="courier-btn">🚲 Need Courier</button>
              </div>
              <p className="claim-disclaimer">
                Claiming reserves this package exclusively for your designated food kitchen or household. Please confirm prompt pickup before 19:30.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}