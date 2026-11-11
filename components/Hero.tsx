import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

interface HeroProps {
  onOpenQuote: (productName?: string) => void;
}

export function Hero({ onOpenQuote }: HeroProps) {
  return (
    <section className="hero-indusfoto" id="home">
      {/* CNC Gear Industrial Background from User Image */}
      <div className="hero-indusfoto-bg" />
      {/* High-contrast smooth gradient overlay for crystal-clear readability */}
      <div className="hero-indusfoto-overlay" />

      <div className="container hero-indusfoto-container">
        <div className="hero-indusfoto-grid">
          {/* Left Column: Headlines, Subtext, Buttons & Trust metrics */}
          <div className="hero-indusfoto-content">
            <div className="hero-kicker-wrap" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)" }} />
              <span
                style={{
                  color: "var(--primary)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                OEM-GRADE ENGINEERING &amp; SPARES
              </span>
            </div>

            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(2.45rem, 3.8vw, 3.45rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginBottom: "18px",
              }}
            >
              Power Every Ride.
              <br />
              Engineered to{" "}
              <span className="highlight" style={{ color: "var(--primary)" }}>
                Last.
              </span>
            </h1>

            <p
              className="hero-desc"
              style={{
                color: "#94a3b8",
                fontSize: "0.98rem",
                lineHeight: 1.65,
                maxWidth: "480px",
                marginBottom: "28px",
              }}
            >
              Genuine <strong>Nexcolle&trade;</strong> high-CCA motorcycle batteries and <strong>FUJI&trade;</strong> precision engine components. Built for extreme heat, heavy duty, and maximum reliability.
            </p>

            <div className="hero-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
              <Link
                href="/products"
                className="btn btn-primary"
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "13px 34px",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  boxShadow: "0 8px 24px rgba(249, 87, 22, 0.45)",
                  background: "linear-gradient(135deg, #f95716, #e04a0e)",
                  border: "none",
                }}
              >
                Explore Catalog
              </Link>
            </div>

            {/* Industrial Trust Bar: Clean inline icons, no boxy containers, no cutting border */}
            <div
              className="hero-trust-bar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                flexWrap: "wrap",
                borderTop: "none",
                paddingTop: "0",
              }}
            >
              <div className="hero-trust-item" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="shield-check" style={{ width: "22px", height: "22px", color: "var(--primary)", flexShrink: 0 }} />
                <div className="trust-text">
                  <strong style={{ fontSize: "0.86rem", color: "#ffffff", display: "block", lineHeight: 1.25, fontWeight: 700 }}>
                    100% Genuine OEM
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Certified JIS &amp; DIN Specs</span>
                </div>
              </div>

              <div className="hero-trust-item" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="truck" style={{ width: "22px", height: "22px", color: "var(--primary)", flexShrink: 0 }} />
                <div className="trust-text">
                  <strong style={{ fontSize: "0.86rem", color: "#ffffff", display: "block", lineHeight: 1.25, fontWeight: 700 }}>
                    Pan-India Dispatch
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>24–48h Air &amp; Freight</span>
                </div>
              </div>

              <div className="hero-trust-item" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon name="bolt" style={{ width: "22px", height: "22px", color: "var(--primary)", flexShrink: 0 }} />
                <div className="trust-text">
                  <strong style={{ fontSize: "0.86rem", color: "#ffffff", display: "block", lineHeight: 1.25, fontWeight: 700 }}>
                    Zero-Defect Fitment
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>36-Month Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating White 4-Card Strip directly at bottom-right over CNC gear */}
          <div className="hero-indusfoto-right">
            <div className="hero-parts-card-float">
              <Link href="/products?category=battery" className="hero-float-col" title="Nexcolle™ AGM Batteries">
                <div className="hero-float-thumb">
                  <img src="/images/hero-card-battery.jpg" alt="Nexcolle™ AGM Battery" />
                </div>
                <span className="hero-float-label">Nexcolle™ AGM</span>
              </Link>

              <Link href="/products?category=piston" className="hero-float-col" title="FUJI™ Forged Pistons">
                <div className="hero-float-thumb">
                  <img src="/images/hero-card-piston.jpg" alt="FUJI™ Piston Kit" />
                </div>
                <span className="hero-float-label">FUJI™ Pistons</span>
              </Link>

              <Link href="/products?category=liner" className="hero-float-col" title="FUJI™ Centrifugal Liners">
                <div className="hero-float-thumb">
                  <img src="/images/hero-card-liner.jpg" alt="Centrifugal Cylinder Liner" />
                </div>
                <span className="hero-float-label">Centrifugal Liners</span>
              </Link>

              <Link href="/products?category=valves" className="hero-float-col" title="FUJI™ Valve Sets">
                <div className="hero-float-thumb">
                  <img src="/images/hero-card-valves.jpg" alt="High-Heat Engine Valves" />
                </div>
                <span className="hero-float-label">Valve Sets</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
