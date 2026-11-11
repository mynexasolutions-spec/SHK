import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

export function WorkshopSpotlight() {
  return (
    <section className="section workshop-spotlight-section">
      <div className="container">
        <div className="workshop-spotlight-grid">
          {/* Left Column: Image */}
          <div className="workshop-spotlight-media">
            <div className="workshop-image-wrapper">
              <img
                src="/images/workshop.jpg"
                alt="Two-Wheeler Workshop Mechanics Rebuilding Engines with SHK Spares"
                className="workshop-spotlight-img"
              />
              <div className="workshop-media-badge">
                <div className="badge-stat">15,000+</div>
                <div className="badge-label">Engines Rebuilt Nationwide</div>
              </div>
            </div>
          </div>

          {/* Right Column: Text */}
          <div className="workshop-spotlight-content">
            <span className="pill-tag">Direct Workshop Partnership</span>
            <h2 className="workshop-spotlight-title">
              Built For Mechanics Who Refuse To Compromise On Quality
            </h2>
            <p className="workshop-spotlight-desc">
              When an engine is open on your bay, you cannot afford parts that seize, burn oil, or trigger customer comebacks. We supply authentic <strong>Nexcolle&trade;</strong> high-crank AGM batteries and <strong>FUJI&trade;</strong> precision engine components directly to independent garages and reconditioners with guaranteed OEM clearances.
            </p>

            <div className="workshop-spotlight-points">
              <div className="spotlight-point">
                <div className="spotlight-point-icon">
                  <Icon name="check" />
                </div>
                <div>
                  <strong>Zero-Defect Fitment &amp; Clearances</strong>
                  <span>Micron-accurate CNC machining strictly matching Japanese JIS tolerances.</span>
                </div>
              </div>

              <div className="spotlight-point">
                <div className="spotlight-point-icon">
                  <Icon name="truck" />
                </div>
                <div>
                  <strong>24–48h Priority Workshop Dispatch</strong>
                  <span>Orders confirmed before 2:00 PM leave our central hub on the same day.</span>
                </div>
              </div>

              <div className="spotlight-point">
                <div className="spotlight-point-icon">
                  <Icon name="shield-check" />
                </div>
                <div>
                  <strong>Flexible MOQs &amp; Wholesale Slabs</strong>
                  <span>Order starter rebuild kits or bulk battery crates without heavy upfront lock-ins.</span>
                </div>
              </div>
            </div>

            <div className="workshop-spotlight-actions">
              <Link href="/products" className="btn btn-primary">
                Explore Spare Parts Catalog
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20SHK%20Auto%2C%20I%20am%20a%20mechanic%20inquiring%20about%20parts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

