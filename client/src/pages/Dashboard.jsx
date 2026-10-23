import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from './Footer.jsx';
import NearbyFeed from './NearbyFeed.jsx';
import ListingDetail from './ListingDetail.jsx';
import PostSurplus from './PostSurplus.jsx';
import ImpactDashboard from './ImpactDashboard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedListingId, setSelectedListingId] = useState(null);

  const handleSelectListing = (id) => {
    setSelectedListingId(id);
    setActiveTab('detail');
  };

  return (
    <div className="dash-layout">
      <Navbar />

      {/* Sub-Header Navigation Tabs */}
      <div className="dash-subnav">
        <div className="dash-subnav-container">
          <div className="live-counter-pill">
            <span className="pulse-ring"></span>
            Live 12 rescued today
          </div>

          <nav className="tabs-nav">
            <button
              className={`tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
              onClick={() => setActiveTab('feed')}
            >
              Nearby Feed
            </button>
            <button
              className={`tab-btn ${activeTab === 'detail' ? 'active' : ''}`}
              onClick={() => setActiveTab('detail')}
            >
              Listing Detail
            </button>
            <button
              className={`tab-btn ${activeTab === 'post' ? 'active' : ''}`}
              onClick={() => setActiveTab('post')}
            >
              Post Surplus
            </button>
            <button
              className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
              onClick={() => setActiveTab('impact')}
            >
              Impact Dashboard
            </button>
          </nav>

          <div className="role-switcher">
            <span className={`role-pill ${user?.role === 'receiver' ? 'active' : ''}`}>Receiver</span>
            <span className={`role-pill ${user?.role === 'donor' ? 'active' : ''}`}>Donor</span>
            <span className={`role-pill ${user?.role === 'volunteer' ? 'active' : ''}`}>Volunteer</span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="dash-main-content">
        {activeTab === 'feed' && <NearbyFeed onSelectListing={handleSelectListing} />}
        {activeTab === 'detail' && (
          <ListingDetail listingId={selectedListingId} onBack={() => setActiveTab('feed')} />
        )}
        {activeTab === 'post' && (
          <PostSurplus onPublishSuccess={() => setActiveTab('feed')} />
        )}
        {activeTab === 'impact' && <ImpactDashboard />}
      </main>

      <Footer />
    </div>
  );
}