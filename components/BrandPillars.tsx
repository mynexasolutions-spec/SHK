import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

interface BrandPillarsProps {
  onOpenQuote?: (productName?: string) => void;
}

export function BrandPillars({ onOpenQuote }: BrandPillarsProps) {
  return (
    <section className="section brands-section" id="brands">
      <div className="container">
        <div className="section-header">
          <span className="pill-tag">Two Brands. One Standard of Excellence.</span>
          <h2 className="section-title">Engineered For Everyday Dominance</h2>
          <p className="section-desc">
            We partner exclusively with verified manufacturing specialists to supply mechanics and dealers with components that eliminate breakdown risks.
          </p>
        </div>

        <div className="brands-split">
          {/* Pillar 1: Nexcolle */}
          <article className="brand-pillar-card">
            <div className="brand-pillar-header battery-theme">
              <span className="pillar-tagline">Advanced Power Systems</span>
              <h3 className="pillar-name">
                Nexcolle&trade; <small>Two-Wheeler Batteries</small>
              </h3>
              <p className="pillar-desc">
                Engineered with high cold-cranking amps (CCA), ultra-dense calcium alloy grids, and spill-proof VRLA-AGM design for instantaneous starts in all seasons.
              </p>
            </div>

            <div className="brand-pillar-body">
              <ul className="feature-check-list">
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>High Cold Cranking Amperage (CCA)</strong>
                    <p>Instant engine ignition even during freezing winter mornings.</p>
                  </div>
                </li>
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>Zero-Maintenance VRLA Technology</strong>
                    <p>Hermetically factory-sealed — no acid leaks, no water top-ups required.</p>
                  </div>
                </li>
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>Heavy Vibration &amp; Pothole Resistance</strong>
                    <p>Reinforced polypropylene casing built for rugged Indian terrain.</p>
                  </div>
                </li>
              </ul>

              <div className="pillar-media-box">
                <img src="/images/battery.jpg" alt="Nexcolle Battery Showcase" />
              </div>

              {onOpenQuote ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenQuote("Nexcolle Batteries")}
                >
                  Inquire Nexcolle Range
                </button>
              ) : (
                <Link href="/contact" className="btn btn-primary" style={{ textAlign: "center" }}>
                  Inquire Nexcolle Range
                </Link>
              )}
            </div>
          </article>

          {/* Pillar 2: FUJI Spares */}
          <article className="brand-pillar-card">
            <div className="brand-pillar-header spares-theme">
              <span className="pillar-tagline">Precision Internal Engine Spares</span>
              <h3 className="pillar-name">
                FUJI&trade; <small>Engine Spare Parts</small>
              </h3>
              <p className="pillar-desc">
                Micron-accurate cylinder liners, forged pistons, stellite-faced valves, and multi-layer gaskets designed to restore factory compression and thermal stability.
              </p>
            </div>

            <div className="brand-pillar-body">
              <ul className="feature-check-list">
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>Centrifugal Cast Iron Liners</strong>
                    <p>Plateau-honed internal bore for rapid oil retention and zero scuffing.</p>
                  </div>
                </li>
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>Heat-Treated Hypereutectic Pistons</strong>
                    <p>Minimal thermal expansion prevents engine seizure under high load.</p>
                  </div>
                </li>
                <li className="feature-check-item">
                  <div className="check-circle">
                    <Icon name="check" />
                  </div>
                  <div>
                    <strong>Multi-Layer Steel (MLS) Head Gaskets</strong>
                    <p>Absolute blow-out resistance under high combustion pressure.</p>
                  </div>
                </li>
              </ul>

              <div className="parts-grid-preview">
                <img src="/images/piston-conrod.jpg" alt="Piston Assembly" />
                <img src="/images/cylinder-liner.jpg" alt="Cylinder Liner" />
                <img src="/images/valves.jpg" alt="Valves" />
                <img src="/images/head-gasket.jpg" alt="Head Gasket" />
                <img src="/images/gasket-set.jpg" alt="Gasket Set" />
                <img src="/images/gasket-cloth.jpg" alt="Gasket Cloth" />
              </div>

              {onOpenQuote ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenQuote("FUJI Engine Spares")}
                >
                  Inquire FUJI Components
                </button>
              ) : (
                <Link href="/contact" className="btn btn-primary" style={{ textAlign: "center" }}>
                  Inquire FUJI Components
                </Link>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

