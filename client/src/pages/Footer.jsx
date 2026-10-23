import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <span className="text-lg" aria-hidden="true">🌿</span>
              <span className="footer-brand-title">FoodShare</span>
            </Link>
            <p className="footer-brand-desc">
              Connecting local neighborhood surpluses, community kitchens, and mindful households to eliminate edible food waste and promote accessible nutrition.
            </p>
            <div className="footer-stats-group">
              <div className="footer-stat-item">
                <span className="material-symbols-outlined footer-stat-icon">eco</span>
                <span>48.2k kg CO₂ avoided</span>
              </div>
              <div className="footer-stat-item">
                <span className="material-symbols-outlined footer-stat-icon">volunteer_activism</span>
                <span>19,410 meals shared</span>
              </div>
            </div>
          </div>

          {/* Rescue Network Column */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Rescue Network</h4>
            <Link to="/" className="footer-link">Home Overview</Link>
            <a href="#roles" className="footer-link">Neighborhood Feed</a>
            <Link to="/register" className="footer-link">Donate Food</Link>
          </div>

          {/* Nutrition & Trust Column */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Nutrition &amp; Trust</h4>
            <a href="#" className="footer-link">Food Safety Protocols</a>
            <a href="#" className="footer-link">Dietary Guidelines</a>
            <a href="#" className="footer-link">Community Guidelines</a>
          </div>

          {/* Open Platform Column */}
          <div className="footer-info-col">
            <h4 className="footer-heading">Open Platform</h4>
            <p className="footer-brand-desc">
              Built on open data standards and volunteer community governance. Free forever for local recipients.
            </p>
            <div className="pt-2">
              <span className="verified-badge">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                Safe Handling Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 FoodShare Community Collective. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}