import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-up">
      <section className="hero-grid">
        <div className="card hero-card">
          <span className="hero-eyebrow">AI-powered travel planning</span>
          <h1 className="hero-title">
            Plan a trip you’ll actually <span style={{
              background: 'linear-gradient(135deg, #7aa7ff, #6df0c2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>want to take</span>
          </h1>

          <p className="hero-subtitle">
            Scoop finds destinations based on your dates, budget, and interests—then helps you compare flights, weather, and stays in one place.
          </p>

          <div className="cta-row" style={{ marginBottom: '8px' }}>
            <Link to="/register" className="btn btn-primary">
              Start Planning Free
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>

          <div className="hero-proof">
            <span className="proof-pill">No credit card required</span>
            <span className="proof-pill">Personalized matches</span>
            <span className="proof-pill">Save favorites instantly</span>
          </div>
        </div>

        <div className="card hero-panel">
          <h3>How Scoop helps you decide faster</h3>
          <p className="muted">Use one flow from discovery to shortlist—no tab switching, no manual comparison sheets.</p>

          <div className="hero-panel-list">
            <div className="hero-panel-item">1. Enter your travel dates and preferences</div>
            <div className="hero-panel-item">2. Review destination matches with reasons</div>
            <div className="hero-panel-item">3. Compare flights, weather, and hotels</div>
          </div>

          <div className="hero-stats">
            <div className="stat-tile">
              <div className="stat-value">Top 10</div>
              <div className="stat-label">AI-ranked destinations</div>
            </div>
            <div className="stat-tile">
              <div className="stat-value">1 search</div>
              <div className="stat-label">for flights + weather + stays</div>
            </div>
            <div className="stat-tile">
              <div className="stat-value">Saved</div>
              <div className="stat-label">favorites for quick comparison</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="section-heading">
          <h2>Everything you need to choose with confidence</h2>
          <p>Clear recommendations, practical travel details, and a workflow designed for real trip planning.</p>
        </div>

        <div className="grid grid-2">
          <div className="card feature-card">
            <h3>🎯 Smart destination matching</h3>
            <p>Get recommendations tuned to your month, budget range, and travel style—not generic lists.</p>
          </div>
          <div className="card feature-card">
            <h3>✈️ Built-in travel context</h3>
            <p>See flights, weather outlook, hotels, and local highlights in the same planning view.</p>
          </div>
          <div className="card feature-card">
            <h3>❤️ Shortlist and compare</h3>
            <p>Save options as favorites and return anytime to compare your best trip candidates.</p>
          </div>
          <div className="card feature-card">
            <h3>⚡ Fast planning workflow</h3>
            <p>Go from idea to actionable options in minutes with fewer clicks and cleaner decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
