import React from "react";
import Link from "next/link";

interface BrandCompatibility {
  name: string;
  shortName: string;
  badge: string;
  range: string;
  searchKey: string;
  models: string[];
}

export function CompatibilityMatrix() {
  const brands: BrandCompatibility[] = [
    {
      name: "Hero MotoCorp",
      shortName: "HERO",
      badge: "Commuters & Scooters",
      range: "100cc – 200cc",
      searchKey: "Hero",
      models: [
        "Splendor Plus / Pro",
        "HF Deluxe",
        "Passion Pro",
        "Glamour 125",
        "Xpulse 200",
        "Pleasure & Maestro",
      ],
    },
    {
      name: "Honda 2-Wheelers",
      shortName: "HONDA",
      badge: "Scooters & Commuters",
      range: "110cc – 160cc",
      searchKey: "Honda",
      models: [
        "Activa (All Gens)",
        "CB Shine & SP125",
        "Dio 110 / 125",
        "Unicorn 150 / 160",
        "Hornet 2.0",
        "Livo & CD 110",
      ],
    },
    {
      name: "Bajaj Auto",
      shortName: "BAJAJ",
      badge: "Street & Sports",
      range: "100cc – 250cc",
      searchKey: "Pulsar",
      models: [
        "Pulsar 125 / 150",
        "Pulsar 220F / NS",
        "Platina 100 / 110",
        "CT 100 / 110X",
        "Avenger 160 / 220",
        "Discover Series",
      ],
    },
  ];

  return (
    <section className="section compatibility-section" id="compatibility">
      <div className="container">
        <div className="section-header">
          <span className="pill-tag">Broad Market Coverage</span>
          <h2 className="section-title">Compatible Across All Major Makes</h2>
          <p className="section-desc">
            Direct OEM-spec fitment for India&apos;s bestselling motorcycles and scooters. Guaranteed hassle-free installation without modifications.
          </p>
        </div>

        <div className="compat-grid">
          {brands.map((b, idx) => (
            <div key={idx} className="compat-card">
              <div className="compat-card-header">
                <div className="compat-brand-meta">
                  <span className="compat-brand-pill">{b.shortName}</span>
                  <div>
                    <h3 className="compat-brand-name">{b.name}</h3>
                    <span className="compat-brand-badge">{b.badge}</span>
                  </div>
                </div>
                <span className="compat-range-tag">{b.range}</span>
              </div>

              <div className="compat-models-container">
                {b.models.map((model, midx) => (
                  <Link
                    key={midx}
                    href={`/products?search=${encodeURIComponent(model.split(" ")[0])}`}
                    className="compat-model-chip"
                    title={`Find parts for ${model}`}
                  >
                    <span className="compat-chip-bullet" />
                    <span className="compat-chip-label">{model}</span>
                  </Link>
                ))}
              </div>

              <Link
                href={`/products?search=${encodeURIComponent(b.searchKey)}`}
                className="compat-card-link"
              >
                <span>View {b.name} Spares &rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
