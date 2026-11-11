"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";
import { ProductQuickView } from "@/components/ProductQuickView";
import { QuoteModal } from "@/components/QuoteModal";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function BrandsPage() {
  const router = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("Dealership Partnership");
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, isInWishlist, toggleWishlist } = useCart();

  const nexcolleProducts = PRODUCTS.filter((p) => p.brand === "Nexcolle");
  const fujiProducts = PRODUCTS.filter((p) => p.brand === "FUJI");

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleOpenQuote = (name?: string) => {
    setQuoteProduct(name || "Brand Partnership Inquiry");
    setQuoteModalOpen(true);
  };

  return (
    <>
      <TopBar />
      <Header onOpenQuote={handleOpenQuote} />

      <main style={{ backgroundColor: "#090c13", minHeight: "100vh" }}>
        {/* Brands Hero */}
        <section
          style={{
            background: "linear-gradient(135deg, #090c13 0%, #131926 100%)",
            color: "#ffffff",
            padding: "60px 0 50px 0",
            marginTop: "-1px",
            borderTop: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#94a3b8",
                marginBottom: "16px",
              }}
            >
              <Link href="/" style={{ color: "#cbd5e1" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "var(--primary)" }}>Authorized Brands</span>
            </div>

            <div style={{ maxWidth: "800px" }}>
              <span className="kicker-pill" style={{ color: "var(--primary-light)", marginBottom: "8px" }}>
                EXCLUSIVE AUTHORIZED DISTRIBUTION
              </span>
              <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
                World-Class Spares Built By Industry Specialists
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "12px" }}>
                SHK Auto partners directly with <strong>Nexcolle™</strong> and <strong>FUJI™</strong> factories to deliver genuine, traceable motorcycle components engineered for extreme Indian road and heat conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Brand 1: Nexcolle Section */}
        <section style={{ padding: "70px 0 50px 0", backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "48px",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff5f0", border: "1px solid #fed7aa", padding: "6px 14px", borderRadius: "999px", marginBottom: "14px" }}>
                  <Icon name="bolt" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>
                    Battery Powerhouse
                  </span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#090c13", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                  Nexcolle™ High-Performance AGM Batteries
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "20px" }}>
                  Nexcolle batteries are manufactured with high-density absorbed glass mat (AGM) matrices and ultra-pure lead-calcium grids. Designed to deliver 400+ Cold Cranking Amps (CCA) for instantaneous starting in sub-zero Himalayan winters and scorching 45°C summer traffic.
                </p>

                {/* Tech Highlights */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "24px" }}>
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid #edf0f5" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>400+ CCA</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Instant high cold-cranking torque</div>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid #edf0f5" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>36 Months</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Full replacement warranty</div>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid #edf0f5" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>100% Sealed</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Maintenance-free VRLA design</div>
                  </div>
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid #edf0f5" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--primary)" }}>Anti-Vibe</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Heavy-duty reinforced casing</div>
                  </div>
                </div>

                <Link
                  href="/products?brand=Nexcolle"
                  className="btn btn-primary"
                  style={{ borderRadius: "var(--radius-full)", padding: "12px 26px", fontWeight: 700 }}
                >
                  View All Nexcolle Batteries
                </Link>
              </div>

              {/* Visual Card */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src="/images/battery.jpg"
                  alt="Nexcolle AGM Battery"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Nexcolle Product Shelf */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#090c13", letterSpacing: "-0.02em" }}>
                    Featured Nexcolle™ Battery Models
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
                    Factory-sealed AGM VRLA batteries with pure lead-calcium grids and 36-month warranty.
                  </p>
                </div>
                <Link
                  href="/products?brand=Nexcolle"
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", textDecoration: "none" }}
                >
                  View All Batteries
                </Link>
              </div>

              <div className="product-grid">
                {nexcolleProducts.map((item) => {
                  const isFav = isInWishlist(item.id);
                  const isAdded = addedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="product-card"
                      data-category={item.category}
                      style={{ display: "flex", cursor: "pointer", position: "relative" }}
                      onClick={() => router.push(`/products/${item.slug}`)}
                    >
                      {/* Brand Corner Badge */}
                      <span className={`product-badge-corner brand-${item.brand.toLowerCase()}`}>
                        {item.brand === "FUJI" && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#f95716",
                              display: "inline-block",
                            }}
                          />
                        )}
                        {item.badge}
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          zIndex: 3,
                          width: "32px",
                          height: "32px",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          color: isFav ? "#dc2626" : "#64748b",
                          transition: "transform 0.2s ease",
                        }}
                        title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                      >
                        <Icon name="heart" style={{ width: "16px", height: "16px" }} />
                      </button>

                      <div className="product-image-container">
                        <img src={item.image} alt={item.title} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(item);
                          }}
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "rgba(15, 23, 42, 0.85)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "var(--radius-full)",
                            padding: "6px 14px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <Icon name="eye" style={{ width: "13px", height: "13px" }} /> Quick View
                        </button>
                      </div>

                      <div className="product-card-body">
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <span className="product-category-meta">{item.meta}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-gold)", fontSize: "0.84rem", fontWeight: 700 }}>
                              <Icon name="star" style={{ width: "13px", height: "13px" }} />
                              <span>{item.rating}</span>
                            </div>
                          </div>

                          <h3 className="product-title">
                            <Link
                              href={`/products/${item.slug}`}
                              style={{ color: "inherit", textDecoration: "none" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.title}
                            </Link>
                          </h3>

                          <div className="product-spec-list">
                            {item.specs.slice(0, 2).map((spec, sidx) => (
                              <span key={sidx} className="spec-pill">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          {/* Price & Savings */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "8px",
                              marginTop: "6px",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary)" }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "#94a3b8" }}>
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span
                              className="discount-pill"
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 800,
                                background: "#ecfdf5",
                                color: "#059669",
                                padding: "3px 8px",
                                borderRadius: "6px",
                              }}
                            >
                              -{item.discount}%
                            </span>
                          </div>

                          {/* Card Footer Actions: Single Full-Width Add to Cart Button */}
                          <div className="product-card-footer" style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                            <button
                              type="button"
                              onClick={(e) => handleQuickAdd(e, item)}
                              className="btn btn-primary"
                              style={{
                                width: "100%",
                                height: "38px",
                                borderRadius: "var(--radius-full)",
                                border: "none",
                                background: isAdded ? "#10b981" : "var(--primary)",
                                color: "#ffffff",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                boxShadow: isAdded ? "0 4px 12px rgba(16, 185, 129, 0.35)" : "0 4px 12px rgba(249, 87, 22, 0.3)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Icon name="cart" style={{ width: "15px", height: "15px" }} />
                              {isAdded ? "Added to Cart!" : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Brand 2: FUJI Section */}
        <section style={{ padding: "70px 0 50px 0", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "48px",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              {/* Visual Card */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src="/images/piston-conrod.jpg"
                  alt="FUJI Precision Engine Spares"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "6px 14px", borderRadius: "999px", marginBottom: "14px" }}>
                  <Icon name="gear" style={{ width: "16px", height: "16px", color: "#0f172a" }} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase" }}>
                    Internal Engine Metallurgy
                  </span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#090c13", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                  FUJI™ Japanese Metallurgy Engine Spares
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "20px" }}>
                  Engineered to precise Japanese JIS B8032 industrial standards, FUJI manufactures pistons, centrifugal sleeves, valve trains, and overhaul gasket sets for motorcycles needing high thermal endurance and sustained compression under severe loads.
                </p>

                {/* Tech Highlights */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "24px" }}>
                  <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#090c13" }}>AC8A Alloy</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>High-silicon forged aluminum</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#090c13" }}>±0.005mm</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Precision micrometer clearance</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#090c13" }}>SUH-35 Valves</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Bimetal friction-welded stems</div>
                  </div>
                  <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#090c13" }}>MLS Gaskets</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Multi-layer steel with Viton coating</div>
                  </div>
                </div>

                <Link
                  href="/products?brand=FUJI"
                  className="btn btn-primary"
                  style={{ borderRadius: "var(--radius-full)", padding: "12px 26px", fontWeight: 700 }}
                >
                  View All FUJI Engine Spares
                </Link>
              </div>
            </div>

            {/* FUJI Product Shelf */}
            <div style={{ marginTop: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#090c13", letterSpacing: "-0.02em" }}>
                    Featured FUJI™ Precision Spares
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
                    High-compression pistons, centrifugal cast liners, and stellite valve sets for extreme thermal resilience.
                  </p>
                </div>
                <Link
                  href="/products?brand=FUJI"
                  style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", textDecoration: "none" }}
                >
                  View All FUJI Spares
                </Link>
              </div>

              <div className="product-grid">
                {fujiProducts.slice(0, 4).map((item) => {
                  const isFav = isInWishlist(item.id);
                  const isAdded = addedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="product-card"
                      data-category={item.category}
                      style={{ display: "flex", cursor: "pointer", position: "relative" }}
                      onClick={() => router.push(`/products/${item.slug}`)}
                    >
                      {/* Brand Corner Badge */}
                      <span className={`product-badge-corner brand-${item.brand.toLowerCase()}`}>
                        {item.brand === "FUJI" && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#f95716",
                              display: "inline-block",
                            }}
                          />
                        )}
                        {item.badge}
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          zIndex: 3,
                          width: "32px",
                          height: "32px",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(255, 255, 255, 0.9)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          color: isFav ? "#dc2626" : "#64748b",
                          transition: "transform 0.2s ease",
                        }}
                        title={isFav ? "Remove from Wishlist" : "Save to Wishlist"}
                      >
                        <Icon name="heart" style={{ width: "16px", height: "16px" }} />
                      </button>

                      <div className="product-image-container">
                        <img src={item.image} alt={item.title} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(item);
                          }}
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "rgba(15, 23, 42, 0.85)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "var(--radius-full)",
                            padding: "6px 14px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <Icon name="eye" style={{ width: "13px", height: "13px" }} /> Quick View
                        </button>
                      </div>

                      <div className="product-card-body">
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <span className="product-category-meta">{item.meta}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-gold)", fontSize: "0.84rem", fontWeight: 700 }}>
                              <Icon name="star" style={{ width: "13px", height: "13px" }} />
                              <span>{item.rating}</span>
                            </div>
                          </div>

                          <h3 className="product-title">
                            <Link
                              href={`/products/${item.slug}`}
                              style={{ color: "inherit", textDecoration: "none" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.title}
                            </Link>
                          </h3>

                          <div className="product-spec-list">
                            {item.specs.slice(0, 2).map((spec, sidx) => (
                              <span key={sidx} className="spec-pill">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          {/* Price & Savings */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "8px",
                              marginTop: "6px",
                              marginBottom: "10px",
                            }}
                          >
                            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary)" }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "#94a3b8" }}>
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span
                              className="discount-pill"
                              style={{
                                fontSize: "0.82rem",
                                fontWeight: 800,
                                background: "#ecfdf5",
                                color: "#059669",
                                padding: "3px 8px",
                                borderRadius: "6px",
                              }}
                            >
                              -{item.discount}%
                            </span>
                          </div>

                          {/* Card Footer Actions: Single Full-Width Add to Cart Button */}
                          <div className="product-card-footer" style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                            <button
                              type="button"
                              onClick={(e) => handleQuickAdd(e, item)}
                              className="btn btn-primary"
                              style={{
                                width: "100%",
                                height: "38px",
                                borderRadius: "var(--radius-full)",
                                border: "none",
                                background: isAdded ? "#10b981" : "var(--primary)",
                                color: "#ffffff",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                boxShadow: isAdded ? "0 4px 12px rgba(16, 185, 129, 0.35)" : "0 4px 12px rgba(249, 87, 22, 0.3)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Icon name="cart" style={{ width: "15px", height: "15px" }} />
                              {isAdded ? "Added to Cart!" : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* B2B Dealership Callout */}
        <section style={{ padding: "60px 0", background: "#ffffff" }}>
          <div className="container">
            <div
              style={{
                background: "linear-gradient(135deg, #090c13 0%, #131926 100%)",
                borderRadius: "24px",
                padding: "40px",
                color: "#ffffff",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div>
                <span className="kicker-pill" style={{ color: "var(--primary-light)", marginBottom: "8px" }}>
                  AUTHORIZED DEALERSHIP NETWORK
                </span>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
                  Become an Authorized Nexcolle™ &amp; FUJI™ Stockist
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "600px" }}>
                  Enjoy exclusive territorial dealership rights, 30-day billing cycles, guaranteed replacement logistics, and marketing collateral for your retail counter.
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleOpenQuote("Authorized Dealership Application")}
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "13px 28px",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                }}
              >
                Apply for Dealership
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenQuote={handleOpenQuote}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        selectedProduct={quoteProduct}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}

