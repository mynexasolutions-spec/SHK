"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "./SvgSprite";

interface FeatureShowcaseProps {
  onSelectCategory?: (category: string) => void;
}

export function FeatureShowcase({ onSelectCategory }: FeatureShowcaseProps) {
  const features = [
    {
      id: "battery",
      title: "Nexcolle™ AGM Batteries",
      desc: "Ultra-low resistance AGM matrix with 400+ cold-cranking amps for instantaneous ignition in all seasons.",
      image: "/images/hero-card-battery.jpg",
      icon: "bolt",
    },
    {
      id: "piston",
      title: "FUJI™ Forged Pistons",
      desc: "High-silicon AC8A Japanese alloy with micro-tin skirt coating ensuring zero scuffing at 10,000+ RPM.",
      image: "/images/hero-card-piston.jpg",
      icon: "gear",
    },
    {
      id: "liner",
      title: "Centrifugal Liners",
      desc: "Centrifugally cast grey iron sleeves with diamond-honed plateau crosshatching for optimal oil film retention.",
      image: "/images/hero-card-liner.jpg",
      icon: "shield-check",
    },
    {
      id: "valves",
      title: "Precision Valve Sets",
      desc: "SUH-35 bimetallic friction-welded valves with stellite-coated faces resisting 850°C exhaust gas heat.",
      image: "/images/hero-card-valves.jpg",
      icon: "check-circle",
    },
  ];

  return (
    <section className="feature-showcase-section" id="features">
      <div className="container">
        <div className="feature-showcase-grid">
          {/* Left Column matching HİZMETLERİMİZ */}
          <div className="feature-showcase-left">
            <span className="kicker-pill">CORE PRODUCT FAMILIES</span>
            <h2>Every Detail Reflects Professional Precision</h2>
            <p>
              Engineered strictly to Japanese JIS and German DIN manufacturing
              tolerances. We supply workshops and reconditioners with internal
              engine components built to endure extreme cylinder pressures and
              continuous high-temperature highway cruising.
            </p>
            <Link href="/products" className="feature-showcase-link">
              View All Products
            </Link>
          </div>

          {/* Right Column: 4 Vertical Cards */}
          <div className="feature-cards-row">
            {features.map((item) => (
              <Link
                key={item.id}
                href={`/products?category=${item.id}`}
                className="service-feature-card"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                <div className="service-card-body">
                  <div className="service-icon-box">
                    <Icon name={item.icon} style={{ width: "20px", height: "20px" }} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="service-card-photo">
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

