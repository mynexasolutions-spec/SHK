import React from "react";
import { Icon } from "./SvgSprite";

interface CtaBannerProps {
  onOpenQuote: (productName?: string) => void;
}

export function CtaBanner({ onOpenQuote }: CtaBannerProps) {
  return (
    <section
      className="cta-banner-section"
      id="contact-cta"
      style={{
        position: "relative",
        background: "#090c13",
        color: "#ffffff",
        overflow: "hidden",
        padding: "clamp(40px, 4.5vw, 58px) 0",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/engine-about.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.18,
          filter: "saturate(1.2)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #090c13 35%, rgba(9, 12, 19, 0.92) 65%, rgba(9, 12, 19, 0.4) 100%)",
          zIndex: 2,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div style={{ maxWidth: "680px" }}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.2vw, 2.7rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "10px",
            }}
          >
            Ready to Upgrade Your Workshop&apos;s Reliability?
          </h2>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1rem",
              lineHeight: 1.55,
              marginBottom: "20px",
            }}
          >
            Join over 120+ certified motorcycle mechanics and regional spare-parts distributors nationwide. Factory-direct wholesale pricing, guaranteed OEM tolerances, and fast dispatch.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            <button
              className="btn btn-primary"
              onClick={() => onOpenQuote("Bottom CTA Banner")}
              style={{
                borderRadius: "var(--radius-full)",
                padding: "12px 26px",
                fontSize: "0.92rem",
                fontWeight: 700,
                boxShadow: "0 8px 25px rgba(249, 87, 22, 0.45)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Request Wholesale Access
            </button>
            <a
              className="btn btn-ghost-white"
              href="https://wa.me/919876543210?text=Hello%20SHK%20Auto%2C%20I%20want%20to%20inquire%20about%20bulk%20wholesale%20pricing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderRadius: "var(--radius-full)",
                padding: "12px 22px",
                fontSize: "0.92rem",
                fontWeight: 600,
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
