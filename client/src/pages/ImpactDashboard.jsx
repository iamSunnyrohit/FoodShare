import React from 'react';
import './ImpactDashboard.css';

export default function ImpactDashboard() {
  return (
    <div className="impact-container">
      <div className="impact-header">
        <div>
          <span className="zone-tag">METRO DISTRICT NODE #04 • Verified Live Data</span>
          <h1>Community Impact & Rescue Metrics</h1>
          <p>Real-time collective footprint of FoodShare network in Metro District.</p>
        </div>
        <button className="download-pdf-btn">📄 Download Impact PDF / ESG Report</button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">MEALS SAVED</span>
          <strong className="kpi-value">14,820</strong>
          <span className="kpi-sub green">+18.4% vs last month</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">SURPLUS RESCUED</span>
          <strong className="kpi-value">6,240 kg</strong>
          <span className="kpi-sub">Equivalent to 6.2 metric tons</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">CO₂ AVOIDED</span>
          <strong className="kpi-value">15.6 tons</strong>
          <span className="kpi-sub">≈ 34 car trips across US saved</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">DELIVERIES COMPLETED</span>
          <strong className="kpi-value">1,142 runs</strong>
          <span className="kpi-sub green">98.6% on-time pickup rate</span>
        </div>
      </div>

      {/* Charts / Data Grid */}
      <div className="impact-charts-grid">
        <div className="chart-card">
          <h3>Daily Rescue Trends</h3>
          <div className="mock-area-chart">
            <span>📈 [ Daily volume in kg rescued trend line visualization ]</span>
          </div>
        </div>

        <div className="chart-card">
          <h3>Category Breakdown</h3>
          <div className="breakdown-list">
            <div className="b-item"><span>🥬 Fresh Produce</span> <strong>38% (2,371 kg)</strong></div>
            <div className="b-item"><span>🍞 Bakery & Grains</span> <strong>28% (1,747 kg)</strong></div>
            <div className="b-item"><span>🍱 Prepared Meals</span> <strong>20% (1,248 kg)</strong></div>
            <div className="b-item"><span>🥛 Dairy & Pantry</span> <strong>14% (874 kg)</strong></div>
          </div>
        </div>
      </div>

      {/* Leaderboards */}
      <div className="leaderboards-grid">
        <div className="leaderboard-card">
          <h3>Top Donors & Contributing Partners</h3>
          <ul className="rank-list">
            <li><span>1. Metro Fresh Market</span> <strong>1,420 kg</strong></li>
            <li><span>2. The Daily Loaf Bakery</span> <strong>980 kg</strong></li>
            <li><span>3. Green Harvest Kitchens</span> <strong>760 kg</strong></li>
          </ul>
        </div>

        <div className="leaderboard-card">
          <h3>Top Receiver Organizations</h3>
          <ul className="rank-list">
            <li><span>1. St. Jude Community Shelter</span> <strong>840 meals</strong></li>
            <li><span>2. Downtown Youth Pantry</span> <strong>620 meals</strong></li>
            <li><span>3. Eastside Family Kitchen</span> <strong>510 meals</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}