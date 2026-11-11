"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Icon } from "./SvgSprite";
import { ProductQuickView } from "./ProductQuickView";

interface ProductCatalogProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenQuote: (productName?: string) => void;
}

export function ProductCatalog({
  activeCategory,
  onSelectCategory,
  onOpenQuote,
}: ProductCatalogProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<"all" | "Nexcolle" | "FUJI">("all");
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "battery", label: "Batteries" },
    { id: "piston", label: "Pistons & Assemblies" },
    { id: "liner", label: "Cylinder Liners" },
    { id: "valves", label: "Valves" },
    { id: "gasket", label: "Gaskets & Kits" },
  ];

  // Filtering
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

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // recommended / default
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="section catalog-section" id="catalog" style={{ background: "#ffffff", padding: "clamp(60px, 8vw, 100px) 0" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", marginBottom: "36px" }}>
          <span className="kicker-pill">DISPATCH-READY INVENTORY</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)", fontWeight: 800, color: "#090c13", letterSpacing: "-0.03em" }}>
            Featured Performance Spares
          </h2>
          <p className="section-desc" style={{ color: "#64748b", maxWidth: "640px", margin: "10px auto 0 auto" }}>
            Order authentic Nexcolle™ high-cranking AGM batteries and FUJI™ internal engine components with verified wholesale slab discounts.
          </p>
        </div>

        {/* Unified Upper Control Bar: Search Input + Brand & Sort Selectors */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            maxWidth: "880px",
            margin: "0 auto 24px auto",
            flexWrap: "wrap",
          }}
        >
          {/* Search Input */}
          <div style={{ flex: "1 1 360px", position: "relative" }}>
            <input
              type="text"
              placeholder="Search parts, bikes (e.g. 12V, Splendor, Pulsar, MLS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 42px 12px 44px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--light-border)",
                background: "#ffffff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                fontSize: "0.92rem",
                color: "var(--text-main)",
                outline: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon name="search" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon name="x" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div style={{ position: "relative" }}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value as any)}
              style={{
                padding: "12px 34px 12px 16px",
                borderRadius: "var(--radius-full)",
                border: selectedBrand !== "all" ? "1px solid var(--primary)" : "1px solid var(--light-border)",
                background: selectedBrand !== "all" ? "rgba(249, 87, 22, 0.08)" : "#ffffff",
                color: selectedBrand !== "all" ? "var(--primary)" : "var(--text-main)",
                fontSize: "0.86rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            >
              <option value="all">All Brands</option>
              <option value="Nexcolle">Nexcolle™</option>
              <option value="FUJI">FUJI™</option>
            </select>
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--text-muted)",
                fontSize: "0.68rem",
              }}
            >
              ▼
            </div>
          </div>

          {/* Sort Dropdown */}
          <div style={{ position: "relative" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: "12px 34px 12px 16px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--light-border)",
                background: "#ffffff",
                fontSize: "0.86rem",
                fontWeight: 600,
                cursor: "pointer",
                color: "var(--text-main)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            >
              <option value="recommended">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--text-muted)",
                fontSize: "0.68rem",
              }}
            >
              ▼
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="catalog-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeCategory === tab.id ? "active" : ""}`}
              onClick={() => onSelectCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid: Exactly 1 single row of 4 featured products */}
        <div className="product-grid" id="productGrid">
          {sorted.length > 0 ? (
            sorted.slice(0, 4).map((item) => {
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
                        <div style={{ display: "flex", alignItems: "center", gap: "2px", color: "var(--accent-gold)", fontSize: "0.75rem", fontWeight: 700 }}>
                          <Icon name="star" style={{ width: "12px", height: "12px" }} />
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
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            background: "#ecfdf5",
                            color: "#059669",
                            padding: "2px 6px",
                            borderRadius: "4px",
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
                borderRadius: "var(--radius-lg)",
                border: "1px dashed var(--light-border)",
              }}
            >
              <h4 style={{ fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "8px" }}>
                No parts match your criteria
              </h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "20px" }}>
                Try clearing search terms or selecting &ldquo;All Products&rdquo;.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBrand("all");
                  onSelectCategory("all");
                }}
              >
                Reset Store Filters
              </button>
            </div>
          )}
        </div>

        {/* Link to Dedicated Products Page */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link
            href="/products"
            className="btn btn-outline"
            style={{
              borderRadius: "var(--radius-full)",
              padding: "13px 32px",
              fontWeight: 800,
              fontSize: "0.88rem",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              border: "1.5px solid #090c13",
              color: "#090c13",
              background: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#090c13";
              e.currentTarget.style.color = "#090c13";
            }}
          >
            View Complete Inventory
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
}
