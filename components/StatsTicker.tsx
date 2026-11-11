import React from "react";

export function StatsTicker() {
  return (
    <section className="stats-ticker">
      <div className="container">
        <div className="ticker-grid">
          <div className="ticker-item">
            <div className="ticker-number">
              500<span>+</span>
            </div>
            <div className="ticker-label">Active SKUs In Ready Stock</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-number">
              120<span>+</span>
            </div>
            <div className="ticker-label">Authorized Dealers Across India</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-number">
              15,000<span>+</span>
            </div>
            <div className="ticker-label">Engines Rebuilt &amp; Running Strong</div>
          </div>
          <div className="ticker-item">
            <div className="ticker-number">
              99.8<span>%</span>
            </div>
            <div className="ticker-label">Cranking &amp; Fitment Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
}

