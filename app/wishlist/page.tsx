"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";
import { QuoteModal } from "@/components/QuoteModal";
import { ProductQuickView } from "@/components/ProductQuickView";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("Wishlist Inquiry");
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [allAdded, setAllAdded] = useState(false);

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
    setAllAdded(true);
    setTimeout(() => setAllAdded(false), 2000);
  };

  const handleOpenQuote = (name?: string) => {
    setQuoteProduct(name || "Saved Parts Bulk Quote");
    setQuoteModalOpen(true);
  };

  return (
    <>
      <TopBar />
      <Header onOpenQuote={handleOpenQuote} />

      <main style={{ backgroundColor: "#090c13", minHeight: "100vh", color: "#ffffff" }}>
        {/* Page Hero Header */}
        <section
          style={{
            background: "linear-gradient(180deg, #090c13 0%, #0e131d 100%)",
            padding: "48px 0 32px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#94a3b8",
                marginBottom: "12px",
              }}
            >
              <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>Wishlist</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <h1
                  className="notranslate"
                  translate="no"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                  }}
                >
                  Wishlist &amp; Saved Spares
                </h1>
                <p style={{ color: "#94a3b8", margin: "6px 0 0 0", fontSize: "0.95rem" }}>
                  {wishlist.length > 0
                    ? `${wishlist.length} OEM-grade ${wishlist.length === 1 ? "component" : "components"} saved for quick ordering and price comparison.`
                    : "Bookmark parts while exploring our catalog for rapid ordering and garage inventory."}
                </p>
              </div>

              {wishlistedProducts.length > 0 && (
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={handleAddAllToCart}
                    className="btn btn-primary"
                    style={{
                      borderRadius: "var(--radius-full)",
                      padding: "10px 22px",
                      fontSize: "0.88rem",
                      fontWeight: 700,
                    }}
                  >
                    {allAdded ? "All Added to Cart!" : "Move All to Cart"}
                  </button>
                  <Link
                    href="/cart"
                    className="btn btn-ghost-white"
                    style={{
                      borderRadius: "var(--radius-full)",
                      padding: "10px 20px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Icon name="cart" style={{ width: "16px", height: "16px" }} />
                    View Cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Wishlist Body */}
        <section style={{ padding: "48px 0 80px 0" }}>
          <div className="container">
            {wishlistedProducts.length === 0 ? (
              /* Empty Wishlist State */
              <div
                style={{
                  background: "#0e131d",
                  borderRadius: "24px",
                  padding: "64px 24px",
                  textAlign: "center",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    color: "#f87171",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 24px auto",
                  }}
                >
                  <Icon name="heart" style={{ width: "36px", height: "36px" }} />
                </div>

                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                  Your Wishlist is Empty
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 28px auto" }}>
                  Click the heart icon on any Nexcolle&trade; battery or FUJI&trade; engine part to bookmark it for later.
                </p>

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link
                    href="/products"
                    className="btn btn-primary"
                    style={{
                      borderRadius: "var(--radius-full)",
                      padding: "12px 28px",
                      fontWeight: 700,
                      boxShadow: "0 8px 20px rgba(249, 87, 22, 0.35)",
                    }}
                  >
                    Browse Catalog
                  </Link>
                  <Link
                    href="/brands"
                    className="btn btn-ghost-white"
                    style={{
                      borderRadius: "var(--radius-full)",
                      padding: "12px 24px",
                      fontWeight: 600,
                    }}
                  >
                    Explore Brands
                  </Link>
                </div>
              </div>
            ) : (
              /* Product Cards Grid (2 cards per row on mobile) */
              <div
                className="product-grid wishlist-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {wishlistedProducts.map((product) => {
                  const isAdded = !!addedIds[product.id];
                  const discount = product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                  return (
                    <div
                      key={product.id}
                      className="product-card"
                      data-category={product.category}
                      style={{ display: "flex", cursor: "pointer", position: "relative" }}
                      onClick={() => router.push(`/products/${product.slug}`)}
                    >
                      {/* Brand Corner Badge */}
                      <span className={`product-badge-corner brand-${product.brand.toLowerCase()}`}>
                        {product.brand === "FUJI" && (
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
                        {product.badge}
                      </span>

                      {/* Wishlist Button (Remove from Wishlist) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
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
                          color: "#dc2626",
                          transition: "transform 0.2s ease",
                        }}
                        title="Remove from Wishlist"
                      >
                        <Icon name="heart" style={{ width: "16px", height: "16px", fill: "#dc2626" }} />
                      </button>

                      {/* Image Area */}
                      <div className="product-image-container">
                        <img src={product.image} alt={product.title} />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
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

                      {/* Card Body */}
                      <div className="product-card-body">
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                            <span className="product-category-meta">{product.meta}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-gold)", fontSize: "0.84rem", fontWeight: 700 }}>
                              <Icon name="star" style={{ width: "13px", height: "13px" }} />
                              <span>{product.rating}</span>
                            </div>
                          </div>

                          <h3 className="product-title">
                            <Link
                              href={`/products/${product.slug}`}
                              style={{ color: "inherit", textDecoration: "none" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.title}
                            </Link>
                          </h3>

                          <div className="product-spec-list">
                            {product.specs.slice(0, 2).map((spec, sidx) => (
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
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            <span style={{ fontSize: "0.85rem", textDecoration: "line-through", color: "#94a3b8" }}>
                              ₹{product.originalPrice.toLocaleString("en-IN")}
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
                              -{discount}%
                            </span>
                          </div>

                          {/* Full-Width Add to Cart Button */}
                          <div className="product-card-footer" style={{ borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
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
            )}
          </div>
        </section>
      </main>

      <Footer onSelectCategory={() => {}} />
      <WhatsAppFloat />
      <QuoteModal
        isOpen={quoteModalOpen}
        selectedProduct={quoteProduct}
        onClose={() => setQuoteModalOpen(false)}
      />
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenQuote={handleOpenQuote}
        />
      )}
    </>
  );
}

