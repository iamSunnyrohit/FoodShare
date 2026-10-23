import React, { useState } from 'react';
import './PostSurplus.css';

export default function PostSurplus({ onPublishSuccess }) {
  const [formData, setFormData] = useState({
    title: '20 Organic Vegetable Grain Bowls with Roasted Tahini',
    category: 'Prepared Meals',
    volume: '12.5',
    unit: 'kg',
    holdingTemp: 'Refrigerated (<4°C)',
    pickupDate: '2026-05-18',
    pickupTime: '20:00',
    address: 'GreenBistro Kitchens - 442 Elm St, Suite 2B',
    instructions: 'Enter through back alley gate code #4412. Speak to Chef Carlos.',
    vehicleSize: 'Bicycle / Walker',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onPublishSuccess) onPublishSuccess();
  };

  return (
    <div className="post-surplus-container">
      <div className="post-header">
        <h1>Post Surplus Food</h1>
        <p>Connect safe surplus meals to local shelters and community kitchens in under 2 minutes.</p>
        <div className="dispatch-badge">
          ⚡ Immediate Dispatch Matching: Matched instantly across 14 verified receivers within 5km.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        {/* Step 1 */}
        <div className="form-step-card">
          <div className="step-tag">Step 1 of 4</div>
          <h2>1. Basic Food Details</h2>

          <div className="field-group">
            <label>Listing Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label>Category Classification *</label>
            <div className="category-selector">
              {['Produce & Fruit', 'Bakery', 'Prepared Meals', 'Dairy & Chilled', 'Frozen', 'Dry Pantry'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`cat-btn ${formData.category === cat ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, category: cat })}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="field-group flex-1">
              <label>Estimated Volume / Quantity *</label>
              <input
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
              />
            </div>
            <div className="field-group flex-1">
              <label>Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="kg">kg</option>
                <option value="portions">portions / meals</option>
                <option value="boxes">boxes / crates</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="form-step-card">
          <div className="step-tag">Step 2 of 4</div>
          <h2>2. Pickup Timing & Urgency</h2>

          <div className="form-row">
            <div className="field-group flex-1">
              <label>Latest Pickup Date</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
              />
            </div>
            <div className="field-group flex-1">
              <label>Pickup Closes At</label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="form-step-card">
          <div className="step-tag">Step 3 of 4</div>
          <h2>3. Pickup Location & Logistics</h2>

          <div className="field-group">
            <label>Dispatch Location</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="field-group">
            <label>Access & Handover Instructions</label>
            <textarea
              rows="3"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* Step 4 */}
        <div className="form-step-card">
          <div className="step-tag">Step 4 of 4</div>
          <h2>4. Photo & Safety Verification</h2>

          <div className="photo-upload-box">
            <span className="material-symbols-outlined text-3xl">cloud_upload</span>
            <p>Upload Batch Photos or Labels</p>
            <small>Supports JPG, PNG up to 10MB</small>
          </div>

          <button type="submit" className="publish-submit-btn">
            🚀 Publish Surplus Listing
          </button>
        </div>
      </form>
    </div>
  );
}