import React, { useState } from 'react';
import './NearbyFeed.css';

export default function NearbyFeed({ onSelectListing }) {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const listings = [
    {
      id: 'FS-8492',
      title: 'Artisan Sourdough & French Baguettes',
      donor: 'The Daily Loaf Bakery',
      distance: '0.8 km away',
      volume: '14 kg (~28 loaves)',
      pickupTime: 'Today by 18:30',
      status: 'available',
      timeLeft: '48m left',
      tags: ['Vegetarian', 'Contains Gluten', 'Paper Packaged'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
      inspected: true,
    },
    {
      id: 'FS-8493',
      title: 'Organic Romaine, Heirloom Tomatoes & Cucumbers',
      donor: 'Valley Green Market',
      distance: '1.4 km away',
      volume: '22 kg crate',
      condition: 'Freshly Harvested',
      status: 'available',
      timeLeft: '2h 15m left',
      tags: ['Organic', 'Vegan', 'Refrigerated'],
      image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop',
      coldStorage: true,
    },
    {
      id: 'FS-8494',
      title: 'Individual Gourmet Grain Bowls & Salads',
      donor: 'Harvest Kitchen Catering',
      distance: '2.1 km away',
      volume: '18 portions (9 kg)',
      claimedBy: 'St. Jude Shelter',
      status: 'claimed',
      timeLeft: '35m left',
      tags: ['Nut Free', 'Plant Based', 'Compostable Tray'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'FS-8495',
      title: 'Oat Milk & Greek Yogurt Cases',
      donor: 'Green Grocer Co-op',
      distance: '3.2 km away',
      volume: '16 kg carton',
      logisticsState: 'Courier en route',
      status: 'in_transit',
      timeLeft: '5h left',
      tags: ['Vegetarian', 'Dairy & Plant-based', 'Sealed Cartons'],
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop',
      volunteer: 'Maya L.',
    },
  ];

  return (
    <div className="nearby-container">
      {/* Search & Filter Bar */}
      <div className="search-filter-section">
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search bread, produce, pantry staples, hot meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="radius-control">
            <span className="material-symbols-outlined">near_me</span>
            <span>Search Radius</span>
            <span className="pill-badge">5 km radius</span>
          </div>

          <div className="sort-control">
            <span>Distance: Nearest first</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-row">
        <button
          className={`cat-pill ${category === 'all' ? 'active' : ''}`}
          onClick={() => setCategory('all')}
        >
          All Surplus <span className="cat-count">24</span>
        </button>
        <button
          className={`cat-pill ${category === 'produce' ? 'active' : ''}`}
          onClick={() => setCategory('produce')}
        >
          🥬 Fresh Produce <span className="cat-count">8</span>
        </button>
        <button
          className={`cat-pill ${category === 'bakery' ? 'active' : ''}`}
          onClick={() => setCategory('bakery')}
        >
          🍞 Bakery & Bread <span className="cat-count">6</span>
        </button>
        <button
          className={`cat-pill ${category === 'prepared' ? 'active' : ''}`}
          onClick={() => setCategory('prepared')}
        >
          🍱 Prepared Meals <span className="cat-count">5</span>
        </button>
        <button
          className={`cat-pill ${category === 'dairy' ? 'active' : ''}`}
          onClick={() => setCategory('dairy')}
        >
          🥛 Dairy & Eggs <span className="cat-count">3</span>
        </button>
        <button
          className={`cat-pill ${category === 'pantry' ? 'active' : ''}`}
          onClick={() => setCategory('pantry')}
        >
          🥫 Pantry Staples <span className="cat-count">2</span>
        </button>
      </div>

      <div className="live-status-bar">
        <span className="pulse-dot"></span>
        Live feed active • 3 added in last 15m
      </div>

      {/* Main Content Layout */}
      <div className="feed-grid">
        {/* Left Column: Feed Cards */}
        <div className="listings-column">
          {listings.map((item) => (
            <div
              key={item.id}
              className={`feed-card ${item.status}`}
              onClick={() => onSelectListing && onSelectListing(item.id)}
            >
              <div className="card-image-wrap">
                <img src={item.image} alt={item.title} />
                <span className={`status-badge ${item.status}`}>
                  {item.status === 'available' && '✓ Available'}
                  {item.status === 'claimed' && '🤝 Claimed'}
                  {item.status === 'in_transit' && '🚲 In Transit'}
                </span>
                <span className="time-badge">⏱ {item.timeLeft}</span>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="donor-info">
                      {item.donor} • <span>📍 {item.distance}</span>
                    </p>
                  </div>
                  <button className="bookmark-btn">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>

                <div className="card-details-box">
                  <div>
                    <span className="box-label">Surplus Volume</span>
                    <strong className="box-value">{item.volume}</strong>
                  </div>
                  <div>
                    <span className="box-label">
                      {item.claimedBy ? 'Claimed By' : item.logisticsState ? 'Logistics State' : 'Pickup Time'}
                    </span>
                    <strong className="box-value highlight">
                      {item.claimedBy || item.logisticsState || item.pickupTime || item.condition}
                    </strong>
                  </div>
                </div>

                <div className="tags-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="card-footer">
                  {item.inspected && (
                    <span className="trust-note">
                      <span className="material-symbols-outlined text-sm">verified</span> Inspected safe
                    </span>
                  )}
                  {item.coldStorage && (
                    <span className="trust-note">
                      <span className="material-symbols-outlined text-sm">ac_unit</span> Cold storage till pickup
                    </span>
                  )}
                  {item.volunteer && (
                    <span className="trust-note">
                      <span className="material-symbols-outlined text-sm">directions_bike</span> Volunteer courier {item.volunteer}
                    </span>
                  )}

                  <button className={`action-btn ${item.status}`}>
                    {item.status === 'available' && 'Claim Food →'}
                    {item.status === 'claimed' && 'Claimed by Shelter'}
                    {item.status === 'in_transit' && 'View Route ↗'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Map & Pulse Panel */}
        <div className="map-column">
          <div className="map-card">
            <div className="map-search-overlay">
              <button className="map-pill">
                <span className="material-symbols-outlined">search</span> Search this area
              </button>
              <span className="map-count">📍 18 active within 5km</span>
            </div>

            <div className="mock-map">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                alt="Interactive Map View"
              />
              <div className="map-pin pin-1">
                <span className="pin-label">The Daily Loaf</span>
              </div>
              <div className="map-pin pin-2">
                <span className="pin-badge">Claimed</span>
              </div>
            </div>

            <div className="map-legend">
              <span><span className="dot available"></span> Available</span>
              <span><span className="dot urgent"></span> &lt;1h left</span>
              <span><span className="dot transit"></span> In Transit</span>
            </div>
          </div>

          <div className="impact-pulse-card">
            <div className="pulse-icon">
              <span className="material-symbols-outlined">eco</span>
            </div>
            <div className="pulse-info">
              <h4>Neighborhood Impact Pulse</h4>
              <p>Active 5km zone • Mission District</p>
            </div>
            <div className="pulse-metrics">
              <div>
                <strong>61 kg</strong>
                <span>available now</span>
              </div>
              <div>
                <strong>124</strong>
                <span>meals prevented</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}