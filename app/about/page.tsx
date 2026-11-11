import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";
import { BrandPillars } from "@/components/BrandPillars";
import { FaqSection } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "About Us | SHK Auto - India's Trusted 2-Wheeler Spares & Battery Distributor",
  description:
    "Learn about SHK Auto, authorized distributor of Nexcolle™ High-Performance Batteries and FUJI™ Precision Engine Spares across India. Delivering OEM tolerances and reliable supply.",
};

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <Header />

      <main style={{ backgroundColor: "#090c13", minHeight: "100vh" }}>
        {/* About Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, var(--dark-base) 0%, var(--dark-surface) 100%)",
            color: "#ffffff",
            padding: "80px 0 60px 0",
            marginTop: "-1px",
            borderTop: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "980px", textAlign: "center" }}>
            <span className="pill-tag dark" style={{ margin: "0 auto 16px auto" }}>
              <Icon name="bolt" style={{ color: "var(--primary-light)" }} /> The Story Behind SHK Auto
            </span>
            <h1
              className="notranslate"
              translate="no"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: "20px",
                color: "#ffffff",
              }}
            >
              Precision Components for <br />
              <span className="gradient-text">India&apos;s Two-Wheeler Backbone</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#94a3b8", lineHeight: 1.7, maxWidth: "720px", margin: "0 auto" }}>
              Founded with a mission to eliminate roadside breakdown risks, SHK Auto is the authorized national distributor for <strong>Nexcolle&trade;</strong> high-crank batteries and <strong>FUJI&trade;</strong> internal engine spares.
            </p>
          </div>
        </section>

        {/* Core Stats Bar */}
        <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid var(--light-border)", padding: "40px 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  500+
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Active SKUs In Stock
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  120+
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Authorized Retail Dealers
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  15,000+
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Engines Rebuilt &amp; Running
                </div>
              </div>
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--primary)", fontFamily: "var(--font-heading)" }}>
                  99.8%
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Fitment &amp; Ignition Reliability
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Philosophy */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#0e131d",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="container" style={{ maxWidth: "1080px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(249, 87, 22, 0.15)",
                    color: "#ff753e",
                    border: "1px solid rgba(249, 87, 22, 0.35)",
                    marginBottom: "16px",
                  }}
                >
                  <Icon name="bolt" style={{ width: "13px", height: "13px", color: "var(--primary)" }} />
                  Engineering Legacy
                </span>

                <h2
                  style={{
                    fontSize: "clamp(1.85rem, 3.5vw, 2.4rem)",
                    fontWeight: 900,
                    color: "#ffffff",
                    margin: "12px 0 20px 0",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Mechanics Trust Our Supply Chain{" "}
                  <span style={{ color: "var(--primary)" }}>Over Generic Market Parts</span>
                </h2>

                <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: 1.75, marginBottom: "16px" }}>
                  Every mechanic in India knows the frustration of replacing a cylinder liner or piston only to face engine seizure, compression blow-by, or excessive oil burning within months.
                </p>
                <p style={{ fontSize: "1rem", color: "#94a3b8", lineHeight: 1.75, marginBottom: "28px" }}>
                  SHK Auto bridges this gap by directly distributing precision-manufactured parts crafted to strict Japanese metallurgy standards (<strong style={{ color: "#ffffff" }}>FUJI</strong>) and hermetically sealed maintenance-free calcium alloy battery tech (<strong style={{ color: "#ffffff" }}>Nexcolle</strong>).
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    "0.005mm CNC machining tolerance guarantee",
                    "100% factory leak-tested VRLA-AGM batteries",
                    "Same-day dispatch for all workshop orders",
                  ].map((text, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: "rgba(16, 185, 129, 0.18)",
                          border: "1px solid rgba(16, 185, 129, 0.35)",
                          display: "grid",
                          placeItems: "center",
                          color: "#10b981",
                          flexShrink: 0,
                        }}
                      >
                        <Icon name="check" style={{ width: "14px", height: "14px", strokeWidth: 3 }} />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f8fafc" }}>
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  position: "relative",
                }}
              >
                <img
                  src="/images/workshop.jpg"
                  alt="SHK Auto Distribution Workshop"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Brand Focus: Nexcolle & FUJI */}
        <BrandPillars />

        {/* Frequently Asked Questions for Buyers & Dealers */}
        <FaqSection />

        {/* Call to Action */}
        <section
          style={{
            padding: "90px 0 100px 0",
            backgroundColor: "#090c13",
            color: "#ffffff",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "860px", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.78rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                background: "rgba(249, 87, 22, 0.15)",
                color: "#ff753e",
                border: "1px solid rgba(249, 87, 22, 0.35)",
                marginBottom: "16px",
              }}
            >
              <Icon name="bolt" style={{ width: "13px", height: "13px", color: "var(--primary)" }} />
              B2B Workshop Partnership
            </span>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.7rem)",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "16px",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Upgrade Your Workshop&apos;s{" "}
              <span style={{ color: "var(--primary)" }}>Supply Chain?</span>
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                marginBottom: "36px",
                maxWidth: "680px",
                margin: "0 auto 36px auto",
              }}
            >
              Join hundreds of registered automotive retailers and mechanics benefiting from wholesale dealer discounts and priority air dispatch.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  padding: "14px 32px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "0 6px 20px rgba(249, 87, 22, 0.4)",
                }}
              >
                Contact Our Trade Team
              </Link>
              <Link
                href="/products"
                className="btn btn-dark"
                style={{
                  padding: "14px 32px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "#131926",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                Explore Online Store
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
