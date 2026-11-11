"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";
import { ProductQuickView } from "@/components/ProductQuickView";
import { QuoteModal } from "@/components/QuoteModal";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ProductsCatalogInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<"all" | "Nexcolle" | "FUJI">(
    initialBrand === "Nexcolle" || initialBrand === "FUJI" ? initialBrand : "all"
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("General Inquiry");
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
    const br = searchParams.get("brand");
    if (br === "Nexcolle" || br === "FUJI") setSelectedBrand(br);
    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categoryTabs = [
    { id: "all", label: "All Spares", count: PRODUCTS.length },
    { id: "battery", label: "Nexcolle Batteries", count: PRODUCTS.filter((p) => p.category === "battery").length },
    { id: "piston", label: "Pistons & Kits", count: PRODUCTS.filter((p) => p.category === "piston").length },
    { id: "liner", label: "Cylinder Liners", count: PRODUCTS.filter((p) => p.category === "liner").length },
    { id: "valves", label: "Engine Valves", count: PRODUCTS.filter((p) => p.category === "valves").length },
    { id: "gasket", label: "Gaskets & Sets", count: PRODUCTS.filter((p) => p.category === "gasket").length },
  ];

  // Filter products
  const filtered = PRODUCTS.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    if (!matchesCat) return false;

    const matchesBrand = selectedBrand === "all" || item.brand === selectedBrand;
    if (!matchesBrand) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.meta.toLowerCase().includes(q) ||
      item.oemTag.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.specs.some((spec) => spec.toLowerCase().includes(q)) ||
      item.compatibleBikes.some((bike) => bike.toLowerCase().includes(q))
    );
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleOpenQuote = (name?: string) => {
    setQuoteProduct(name || "General Catalog Inquiry");
    setQuoteModalOpen(true);
  };

  return (
    <>
      <TopBar />
      <Header onOpenQuote={handleOpenQuote} />

      <main style={{ backgroundColor: "#090c13", minHeight: "100vh" }}>
        {/* Products Hero Banner (Hidden on mobile) */}
        <section
          className="products-hero-banner"
          style={{
            background: "linear-gradient(135deg, #090c13 0%, #131926 100%)",
            color: "#ffffff",
            padding: "54px 0 44px 0",
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
              <span style={{ color: "var(--primary)" }}>Products Catalog</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px" }}>
              <div>
                <span className="kicker-pill" style={{ color: "var(--primary-light)", marginBottom: "8px" }}>
                  DISPATCH-READY CATALOG
                </span>
                <h1 style={{ fontSize: "clamp(2rem, 3.8vw, 2.9rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
                  Precision Motorcycle Spares &amp; Batteries
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "0.98rem", maxWidth: "620px", marginTop: "8px" }}>
                  Direct online inventory of genuine <strong>Nexcolle™</strong> high-CCA AGM batteries and <strong>FUJI™</strong> Japanese internal engine components with wholesale slab pricing.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenQuote("Bulk Wholesale Catalog Request")}
                  style={{
                    borderRadius: "var(--radius-full)",
                    padding: "11px 24px",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    boxShadow: "0 6px 20px rgba(249, 87, 22, 0.4)",
                  }}
                >
                  Request B2B Wholesale Rate Card
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar & Controls */}
        <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "18px 0" }}>
          <div className="container">
            {/* Row 1: Search, Brand & Sort Toolbar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "14px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              {/* Search Field */}
              <div style={{ flex: "1 1 300px", position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search by SKU, bike model (Splendor, Pulsar, Classic 350, KTM)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 36px 11px 38px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    fontSize: "0.88rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                >
                  <Icon name="search" style={{ width: "16px", height: "16px" }} />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                    }}
                  >
                    <Icon name="x" style={{ width: "16px", height: "16px" }} />
                  </button>
                )}
              </div>

              {/* Brand Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Brand:</span>
                {(["all", "Nexcolle", "FUJI"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    style={{
                      padding: "7px 14px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: selectedBrand === b ? "1px solid var(--primary)" : "1px solid #cbd5e1",
                      background: selectedBrand === b ? "var(--primary)" : "#ffffff",
                      color: selectedBrand === b ? "#ffffff" : "#1e293b",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {b === "all" ? "All Brands" : b}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, whiteSpace: "nowrap" }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Row 2: Category Pills Bar */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                paddingTop: "14px",
                scrollbarWidth: "none",
              }}
            >
              {categoryTabs.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.85rem",
                      fontWeight: isActive ? 800 : 600,
                      cursor: "pointer",
                      border: isActive ? "1.5px solid var(--primary)" : "1px solid #e2e8f0",
                      background: isActive ? "#fff5f0" : "#ffffff",
                      color: isActive ? "var(--primary)" : "#334155",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        background: isActive ? "var(--primary)" : "#f1f5f9",
                        color: isActive ? "#ffffff" : "#64748b",
                        borderRadius: "999px",
                        padding: "1px 6px",
                        fontWeight: 700,
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section style={{ padding: "40px 0 80px 0" }}>
          <div className="container">
            {/* Results Counter */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                Showing <strong>{sorted.length}</strong> of <strong>{PRODUCTS.length}</strong> verified components
              </div>
              {(activeCategory !== "all" || selectedBrand !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSelectedBrand("all");
                    setSearchQuery("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Reset all filters &times;
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="product-grid" id="productGrid">
              {sorted.length > 0 ? (
                sorted.map((item) => {
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
                })
              ) : (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "64px 20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "18px",
                    border: "1px dashed #cbd5e1",
                  }}
                >
                  <h3 style={{ fontSize: "1.3rem", color: "#090c13", marginBottom: "8px" }}>
                    No matching motorcycle parts found
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "20px" }}>
                    Try clearing your search terms or choosing &ldquo;All Spares&rdquo;.
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setActiveCategory("all");
                      setSelectedBrand("all");
                      setSearchQuery("");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* B2B Garage Trade Program Banner */}
        <section
          style={{
            background: "#ffffff",
            borderTop: "1px solid #edf0f5",
            padding: "50px 0",
          }}
        >
          <div className="container">
            <div
              style={{
                background: "linear-gradient(135deg, #090c13 0%, #131926 100%)",
                borderRadius: "24px",
                padding: "36px 40px",
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
                  WHOLESALE DISPATCH DESK
                </span>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px" }}>
                  Need Custom Bulk Packing or Regional Dealership Rates?
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.92rem", maxWidth: "600px" }}>
                  We support certified workshops and engine rebuilders across India with credit terms, GST e-invoices, and scheduled monthly logistics.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenQuote("Custom Bulk Garage Rate Request")}
                  style={{
                    borderRadius: "var(--radius-full)",
                    padding: "12px 24px",
                    fontWeight: 700,
                  }}
                >
                  Request Wholesale Quote
                </button>
                <a
                  className="btn btn-ghost-white"
                  href="https://wa.me/919876543210?text=Hello%20SHK%20Auto%2C%20I%20want%20to%20inquire%20about%20bulk%20spares%20orders"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    borderRadius: "var(--radius-full)",
                    padding: "12px 22px",
                  }}
                >
                  WhatsApp Trade Desk
                </a>
              </div>
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#090c13", color: "#ffffff" }}>
          <div>Loading Parts Catalog...</div>
        </div>
      }
    >
      <ProductsCatalogInner />
    </Suspense>
  );
}

