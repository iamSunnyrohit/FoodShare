import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; 
import Footer from './Footer';
import './Landing.css';

export default function Landing() {
  const [mealsSaved, setMealsSaved] = useState(14820);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setMealsSaved((prev) => prev + 1);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FAF8F3] text-[#131e18] text-base antialiased min-h-screen flex flex-col">
      <Navbar showAnchors={true} />

      <main className="w-full pt-20 flex-1 bg-[#FAF8F3]">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden">
            <div className="hero-glow-bg"></div>

            <section className="hero-section">
              <div className="hero-grid">
                <div className="hero-left">
                  <div className="overline-tag">
                    <span className="flex h-2 w-2 rounded-full bg-[#0d6438] animate-pulse"></span>
                    <span className="overline-text">Hyperlocal Mutual Aid • Zero Waste</span>
                  </div>

                  <h1 className="hero-title">
                    Rescue Good Food.<br />
                    <span style={{ color: '#0d6438' }}>Feed Your Neighborhood.</span>
                  </h1>

                  <p className="hero-subtitle">
                    Connect surplus wholesome meals from artisan bakeries, markets, and kitchens directly with neighborhood pantries, local shelters, and everyday families before it ever goes to waste.
                  </p>

                  <div className="hero-cta-group">
                    <a href="/register" className="btn-primary">
                      <span>Explore Nearby Feed</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                    <a href="/register" className="btn-secondary">
                      <span className="material-symbols-outlined text-lg">volunteer_activism</span>
                      <span>Donate Surplus</span>
                    </a>
                  </div>

                  <div className="counter-card">
                    <div className="counter-card-header">
                      <div className="flex items-center gap-2">
                        <span className="pulse-dot">
                          <span className="pulse-ring"></span>
                          <span className="pulse-core"></span>
                        </span>
                        <span className="text-xs text-[#46655a] font-semibold uppercase tracking-wide">
                          Live Community Counter
                        </span>
                      </div>
                      <span className="text-xs text-[#3f4941] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-[#0d6438]">sync</span> Updated 3m ago
                      </span>
                    </div>
                    <div className="counter-grid">
                      <div className="counter-box">
                        <div className="counter-number text-[#0d6438]">{mealsSaved.toLocaleString()}+</div>
                        <div className="counter-label">Meals Rescued</div>
                      </div>
                      <div className="counter-box">
                        <div className="counter-number text-[#46655a]">
                          6,240 <span className="text-xs font-normal">kg</span>
                        </div>
                        <div className="counter-label">Surplus This Month</div>
                      </div>
                      <div className="col-span-2 sm:col-span-1 counter-box">
                        <div className="counter-number text-[#a65c0d]">
                          32 <span className="text-xs font-normal">min</span>
                        </div>
                        <div className="counter-label">Avg Handover Time</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Visual Bento */}
                <div className="hero-right">
                  <div className="bento-card">
                    <div className="bento-media">
                      <img
                        alt="Artisan sourdough and organic vegetables"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUKJu7pMl7gW5SGgspv98AcMQxb8HIrkCHuGlDny-oeoVJdNZQW7Tk62pOyzOyabpEfvzrrpkONfi5l5BYKUGIIUXRPUbHTmfdbmp_qBYq9L5dHlnJJx60iP8UJmahGwIP6yIn5acZZ5Q3-p_SEZK_CY1iK65lr2jZmdyDo3l-GnkcebhWfKfHzkRO7epBNe0uBQSof2saNKLL-VmUX1TT-j_lnBklBqF8pMiKs-1e3kdWnCPZlg9cww"
                      />
                      <div className="bento-gradient"></div>

                      {/* Cleanly tucked floating verification pill */}
                      <div className="floating-pill">
                        <div className="w-9 h-9 rounded-full bg-[#c8eadc] flex items-center justify-center text-[#2f7d4f]">
                          <span className="material-symbols-outlined text-xl">verified</span>
                        </div>
                        <div>
                          <p className="text-xs text-[#131e18] font-semibold">100% Food Safe Verified</p>
                          <p className="text-[11px] text-[#3f4941]">Cold-chain tracked arrivals</p>
                        </div>
                      </div>

                      <div className="bento-overlay">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2f7d4f] text-white text-xs font-medium mb-1">
                            <span className="material-symbols-outlined text-xs">local_shipping</span> Active Dropoff
                          </div>
                          <p className="font-semibold text-white drop-shadow-sm">Green Fork Deli • 24 Pack Box</p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xs opacity-90">Remaining</span>
                          <span className="text-sm font-bold text-[#fff0e7] bg-[#a65c0d]/90 px-2 py-0.5 rounded-full">
                            18m left
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#eaf7ed] flex items-center justify-center text-[#0d6438] flex-shrink-0">
                        <span className="material-symbols-outlined">eco</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[#131e18] font-semibold truncate">34.8 kg CO₂ Offset Just Now</p>
                        <p className="text-xs text-[#3f4941] truncate">
                          Harvest Pantry picked up 18 organic loaves from Daily Grain
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section id="roles" className="role-section">
            <div className="section-container">
              <div className="role-header">
                <div>
                  <span className="text-xs text-[#0d6438] font-bold uppercase tracking-wider block mb-1">
                    Tailored for Every Contributor
                  </span>
                  <h2 className="font-headline font-semibold text-3xl text-[#131e18] tracking-tight">
                    How You Can Participate
                  </h2>
                </div>
                <p className="text-sm text-[#3f4941] max-w-md">
                  Whether you have prepared surplus, run a social pantry, or have 20 minutes to transport food across town, there is a dedicated pathway for you.
                </p>
              </div>

              <div className="role-grid">
                <div className="role-card">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="role-icon-box">
                        <span className="material-symbols-outlined text-2xl">storefront</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#e4f1e7] text-xs text-[#46655a] font-semibold">
                        Restaurants • Grocers
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-[#131e18] mb-2">Food Donors</h3>
                    <p className="text-sm text-[#3f4941] mb-6">
                      Post surplus fresh meals or wholesale produce in under 2 minutes. Prevent dumpster loss, reclaim tax-deductible receipts, and fulfill ESG waste reduction goals automatically.
                    </p>
                    <div className="metric-bar-container">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#3f4941]">Listing Speed</span>
                        <span className="font-semibold text-[#0d6438]">&lt; 120 Seconds</span>
                      </div>
                      <div className="metric-progress-bg">
                        <div className="metric-progress-fill w-11/12"></div>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#3f4941]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Automated pickup verification photos
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Instant printable IRS 501(c)(3) receipts
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Zero dumpster surcharge penalties
                      </li>
                    </ul>
                  </div>
                  <a href="/register" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#2f7d4f] text-white text-sm font-semibold hover:bg-[#0d6438] transition-colors">
                    <span>Start Donating</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>

                {/* Receivers */}
                <div className="role-card">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="role-icon-box">
                        <span className="material-symbols-outlined text-2xl">soup_kitchen</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#e4f1e7] text-xs text-[#46655a] font-semibold">
                        Pantries • Families
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-[#131e18] mb-2">Receivers &amp; Shelters</h3>
                    <p className="text-sm text-[#3f4941] mb-6">
                      Claim safe, high-grade organic produce, ready-to-eat hot entrees, and staples. Get automated neighborhood proximity notifications within 5km radius with temperature certificates.
                    </p>
                    <div className="metric-bar-container">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#3f4941]">Cost to Claim</span>
                        <span className="font-semibold text-[#0d6438]">Free Forever</span>
                      </div>
                      <div className="metric-progress-bg">
                        <div className="metric-progress-fill w-full"></div>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#3f4941]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Allergen and dietary tagging (Vegan, Halal)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Real-time push alerts within 5km
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Guaranteed cold-chain temperature logs
                      </li>
                    </ul>
                  </div>
                  <a href="/register" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#eaf7ed] text-[#0d6438] text-sm font-semibold hover:bg-[#dfebe2] transition-colors">
                    <span>Browse Food Feed</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>

                {/* Volunteers */}
                <div className="role-card">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="role-icon-box">
                        <span className="material-symbols-outlined text-2xl">directions_bike</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#e4f1e7] text-xs text-[#46655a] font-semibold">
                        Couriers • Cyclists
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-[#131e18] mb-2">Volunteer Couriers</h3>
                    <p className="text-sm text-[#3f4941] mb-6">
                      Rescue food on your schedule. Accept micro-missions that take 20–30 minutes by bike, foot, or car. Turn an evening stroll or daily commute into direct neighborhood hunger relief.
                    </p>
                    <div className="metric-bar-container">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#3f4941]">Typical Rescue Run</span>
                        <span className="font-semibold text-[#0d6438]">18-24 Mins</span>
                      </div>
                      <div className="metric-progress-bg">
                        <div className="metric-progress-fill w-4/5"></div>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6 text-xs text-[#3f4941]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Built-in step-by-step turn navigation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Contactless pin code dropoff handovers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-[#0d6438]">check_circle</span> Personal CO₂ savings badge tracker
                      </li>
                    </ul>
                  </div>
                  <a href="/register" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#eaf7ed] text-[#0d6438] text-sm font-semibold hover:bg-[#dfebe2] transition-colors">
                    <span>Become a Courier</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how" className="section-container py-16 lg:py-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs text-[#0d6438] font-bold uppercase tracking-wider block mb-2">
                Simplicity by Design
              </span>
              <h2 className="font-headline font-semibold text-3xl text-[#131e18] tracking-tight mb-3">
                Rescue in Three Frictionless Steps
              </h2>
              <p className="text-sm text-[#3f4941]">
                No bureaucratic red tape. Our real-time dispatch engine links donors, couriers, and pantries seamlessly.
              </p>
            </div>

            <div className="steps-grid">
              {[
                {
                  step: '1',
                  stepLabel: 'One',
                  title: 'Post & Match',
                  desc: 'A bakery or caterer posts surplus with safe handling notes, dietary tags, pickup window, and temperature requirements in under 2 minutes.',
                  progress: '1:45 min avg',
                  width: 'w-4/5',
                },
                {
                  step: '2',
                  stepLabel: 'Two',
                  title: 'Claim & Dispatch',
                  desc: 'Nearby food banks, community fridges, or families claim instantly. Smart geo-fencing triggers a notification to verified neighborhood couriers.',
                  progress: '94% within 6 min',
                  width: 'w-11/12',
                },
                {
                  step: '3',
                  stepLabel: 'Three',
                  title: 'Deliver & Measure',
                  desc: 'Contactless QR pickup and drop-off verification. Impact telemetry logs saved kilograms, tax deduction data, and avoided greenhouse gases.',
                  progress: '100% Logged',
                  width: 'w-full',
                },
              ].map((item) => (
                <div key={item.step} className="step-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="step-number">{item.step}</div>
                    <span className="text-xs text-[#46655a] font-semibold uppercase tracking-wider">
                      Step {item.stepLabel}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-[#131e18] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#3f4941] mb-6">{item.desc}</p>
                  <div className="mt-auto rounded-lg overflow-hidden bg-[#eaf7ed] p-3">
                    <div className="flex items-center justify-between text-xs font-medium text-[#3f4941] mb-2">
                      <span>Performance</span>
                      <span className="text-[#0d6438] font-bold">{item.progress}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#d9e6dc] overflow-hidden">
                      <div className={`bg-[#0d6438] h-full rounded-full ${item.width}`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TRUST & TESTIMONIALS */}
          <section className="trust-wrapper">
            <div className="section-container">
              <div className="trust-card">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="text-xs text-[#0d6438] font-bold uppercase tracking-wider block mb-1">
                    Guaranteed Integrity
                  </span>
                  <h3 className="font-semibold text-2xl text-[#131e18]">Strict Safety &amp; Trust Standards</h3>
                </div>
                <div className="trust-grid">
                  {[
                    {
                      icon: 'sanitizer',
                      title: 'Safe Handling Certified',
                      desc: 'Compliant with Bill Emerson Good Samaritan Act protocols',
                    },
                    {
                      icon: 'ac_unit',
                      title: 'Cold-Chain Tracking',
                      desc: 'Continuous insulated logs for perishables and prepared dishes',
                    },
                    {
                      icon: 'receipt_long',
                      title: 'Tax-Compliant Auditing',
                      desc: 'Instant, IRS-compliant value receipts for corporate reporting',
                    },
                    {
                      icon: 'nest_eco_leaf',
                      title: 'Zero-Waste Certified',
                      desc: 'Accredited municipal landfill diversion certification',
                    },
                  ].map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center p-3">
                      <div className="h-12 w-12 rounded-full bg-[#eaf7ed] flex items-center justify-center text-[#0d6438] mb-3">
                        <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#131e18] mb-1">{badge.title}</h4>
                      <p className="text-xs text-[#3f4941]">{badge.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="testimonial-grid">
                <div className="testimonial-card">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-[#a65c0d] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined filled text-sm">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[#131e18] italic">
                      “As an artisan sourdough bakery, seeing unsold loaves thrown away at 8 PM broke our hearts every evening. FoodShare turned closing time into an empowering 5-minute task. Local pantries pick up directly, and our tax team loves the instant quarterly summary.”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover bg-[#dfebe2]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2buWnswu2tXboHG0EJjl5zhuJlwXgECr9BmUbJWeG2Jd0oLzTK_ULuVkKbp9_GObwWjn_P-vTV_Fu5M5lxFKnvapDpafYsDfsrltHOL6hU62dsKOdoZIEDxlv6_mziooxgp3RKUO9_ucLGGmHTh6HbUPeH0NgSDEwsauVYVHkMrAx4k5AZa58IRqqvrrSD6dDvUA_pn6Vosk6tGwlcVC8tnE22ddcIdQBJ6HuSMOziph8Cb7SgirBCw"
                      alt="Julian Morales"
                    />
                    <div>
                      <h5 className="text-sm text-[#131e18] font-semibold">Julian Morales</h5>
                      <p className="text-xs text-[#3f4941]">Head Baker, The Daily Loaf Co.</p>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-[#a65c0d] mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined filled text-sm">
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[#131e18] italic">
                      “Our emergency shelter kitchen serves 180 dinner plates every evening. With FoodShare alerts, we consistently receive high-protein, chef-prepared surplus from caterers that would normally never reach us. The temperature tags give complete peace of mind.”
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover bg-[#dfebe2]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9yhem5mVosF-IGPaRa1AAZbhoWmuEFqQuNwF10EiFOsoE7QS4dxKUYkXId_8A3WTaTjCMraEqyYb4uobK4iJM5IDeR5urn2AoYA_CQQMfQETO80NbusnVpcTD1DXuGBpjAet-yYHLlLOPebWdEvnfMO-403qpuSg-zhkK04ATTaMPnCq3PtHLRYGUq1PnxOMBUg1dQWAn-kDJNWaC-KkTePtdTutPPLpPkvXmKVwCyN3lyYOznLqzBg"
                      alt="Eleanor Vance"
                    />
                    <div>
                      <h5 className="text-sm text-[#131e18] font-semibold">Eleanor Vance</h5>
                      <p className="text-xs text-[#3f4941]">Operations Lead, St. Jude Community Shelter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="section-container py-16 lg:py-24 w-full">
            <div className="cta-banner">
              <div className="cta-glow-accent"></div>
              <div className="cta-grid">
                <div className="cta-content">
                  <span className="text-xs text-[#ceffd9] font-semibold uppercase tracking-widest block mb-2">
                    Build a Resilient Neighborhood
                  </span>
                  <h2 className="font-headline font-bold text-3xl lg:text-4xl text-white tracking-tight mb-4">
                    Ready to ensure no good meal goes to waste in your city?
                  </h2>
                  <p className="text-lg text-[#ceffd9] max-w-2xl opacity-90">
                    Join over 1,200 local businesses, food pantries, and volunteer responders. Sign up takes less than 60 seconds and zero software fees.
                  </p>
                </div>
                <div className="cta-actions">
                  <a href="/register" className="btn-cta-light">
                    <span>Get Started for Free</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                  <a href="/register" className="btn-cta-dark">
                    <span>Register as a Food Donor</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}