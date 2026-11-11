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
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 420px))", gap: "24px" }}>
                {nexcolleProducts.map((item) => (
                  <div
                    key={item.id}
                    className="product-card"
                    style={{
                      background: "#ffffff",
                      borderRadius: "18px",
                      border: "1px solid #edf0f5",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                      transition: "all 0.28s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/products/${item.slug}`)}
                  >
                    {/* Photo with badges */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        background: "#090c13",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      {/* OEM Tag */}
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          display: "flex",
                          gap: "6px",
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            background: "var(--primary)",
                            color: "#ffffff",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            fontWeight: 800,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {item.oemTag}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.92)",
                          backdropFilter: "blur(6px)",
                          border: "none",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          zIndex: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                        aria-label="Save to Wishlist"
                      >
                        <Icon
                          name="heart"
                          style={{
                            width: "16px",
                            height: "16px",
                            color: isInWishlist(item.id) ? "var(--primary)" : "#64748b",
                            fill: isInWishlist(item.id) ? "var(--primary)" : "none",
                          }}
                        />
                      </button>
                    </div>

                    {/* Content with proper padding */}
                    <div
                      style={{
                        padding: "18px 20px 20px 20px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Rating & Reviews */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <div style={{ display: "flex", color: "#f59e0b" }}>
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="star"
                              style={{
                                width: "13px",
                                height: "13px",
                                fill: i < Math.floor(item.rating) ? "#f59e0b" : "none",
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
                          ({item.reviewsCount} verified)
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        style={{
                          fontSize: "1.02rem",
                          fontWeight: 800,
                          color: "#090c13",
                          lineHeight: 1.35,
                          marginBottom: "8px",
                        }}
                      >
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "#64748b",
                          lineHeight: 1.45,
                          marginBottom: "14px",
                          flexGrow: 1,
                        }}
                      >
                        {item.shortDesc}
                      </p>

                      {/* Fitment Pills */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
                        {item.compatibleBikes.slice(0, 2).map((bike, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "0.7rem",
                              background: "#f1f5f9",
                              color: "#334155",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontWeight: 600,
                            }}
                          >
                            {bike}
                          </span>
                        ))}
                        {item.compatibleBikes.length > 2 && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              background: "#f1f5f9",
                              color: "#64748b",
                              padding: "3px 8px",
                              borderRadius: "6px",
                            }}
                          >
                            +{item.compatibleBikes.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Price & Action Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "14px",
                          borderTop: "1px solid #f1f5f9",
                          marginBottom: "16px",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13" }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span
                              style={{
                                fontSize: "0.82rem",
                                color: "#94a3b8",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 800,
                                color: "#16a34a",
                                background: "#dcfce7",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              -{item.discount}%
                            </span>
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                            Pan-India Dispatch Available
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                        <button
                          className="btn btn-outline"
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            fontSize: "0.84rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(item);
                          }}
                        >
                          Specs
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{
                            flex: 2,
                            padding: "10px 16px",
                            fontSize: "0.84rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                          onClick={(e) => handleQuickAdd(e, item)}
                        >
                          <Icon name="cart" style={{ width: "15px", height: "15px" }} />
                          {addedId === item.id ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
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

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {fujiProducts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="product-card"
                    style={{
                      background: "#ffffff",
                      borderRadius: "18px",
                      border: "1px solid #edf0f5",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                      transition: "all 0.28s ease",
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/products/${item.slug}`)}
                  >
                    {/* Photo with badges */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        overflow: "hidden",
                        background: "#090c13",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      {/* OEM Tag */}
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          display: "flex",
                          gap: "6px",
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            background: "#0f172a",
                            color: "#ffffff",
                            padding: "3px 10px",
                            borderRadius: "6px",
                            fontWeight: 800,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {item.oemTag}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.92)",
                          backdropFilter: "blur(6px)",
                          border: "none",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          zIndex: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                        aria-label="Save to Wishlist"
                      >
                        <Icon
                          name="heart"
                          style={{
                            width: "16px",
                            height: "16px",
                            color: isInWishlist(item.id) ? "var(--primary)" : "#64748b",
                            fill: isInWishlist(item.id) ? "var(--primary)" : "none",
                          }}
                        />
                      </button>
                    </div>

                    {/* Content with proper padding */}
                    <div
                      style={{
                        padding: "18px 20px 20px 20px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Rating & Reviews */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <div style={{ display: "flex", color: "#f59e0b" }}>
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="star"
                              style={{
                                width: "13px",
                                height: "13px",
                                fill: i < Math.floor(item.rating) ? "#f59e0b" : "none",
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
                          ({item.reviewsCount} verified)
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        style={{
                          fontSize: "1.02rem",
                          fontWeight: 800,
                          color: "#090c13",
                          lineHeight: 1.35,
                          marginBottom: "8px",
                        }}
                      >
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "#64748b",
                          lineHeight: 1.45,
                          marginBottom: "14px",
                          flexGrow: 1,
                        }}
                      >
                        {item.shortDesc}
                      </p>

                      {/* Fitment Pills */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "16px" }}>
                        {item.compatibleBikes.slice(0, 2).map((bike, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "0.7rem",
                              background: "#f1f5f9",
                              color: "#334155",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontWeight: 600,
                            }}
                          >
                            {bike}
                          </span>
                        ))}
                        {item.compatibleBikes.length > 2 && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              background: "#f1f5f9",
                              color: "#64748b",
                              padding: "3px 8px",
                              borderRadius: "6px",
                            }}
                          >
                            +{item.compatibleBikes.length - 2} more
                          </span>
                        )}
                      </div>

                      {/* Price & Action Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "14px",
                          borderTop: "1px solid #f1f5f9",
                          marginBottom: "16px",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#090c13" }}>
                              ₹{item.price.toLocaleString("en-IN")}
                            </span>
                            <span
                              style={{
                                fontSize: "0.82rem",
                                color: "#94a3b8",
                                textDecoration: "line-through",
                              }}
                            >
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 800,
                                color: "#16a34a",
                                background: "#dcfce7",
                                padding: "2px 6px",
                                borderRadius: "4px",
                              }}
                            >
                              -{item.discount}%
                            </span>
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                            Pan-India Dispatch Available
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                        <button
                          className="btn btn-outline"
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            fontSize: "0.84rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(item);
                          }}
                        >
                          Specs
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{
                            flex: 2,
                            padding: "10px 16px",
                            fontSize: "0.84rem",
                            fontWeight: 700,
                            borderRadius: "var(--radius-full)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                          onClick={(e) => handleQuickAdd(e, item)}
                        >
                          <Icon name="cart" style={{ width: "15px", height: "15px" }} />
                          {addedId === item.id ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

