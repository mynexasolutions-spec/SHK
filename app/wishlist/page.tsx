"use client";

import React, { useState } from "react";
import Link from "next/link";
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
              /* Product Cards Grid */
              <div
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
                      style={{
                        background: "#0e131d",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        display: "flex",
                        flexDirection: "column",
                        transition: "var(--transition)",
                        position: "relative",
                      }}
                      className="wishlist-card"
                    >
                      {/* Image Area */}
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16/11",
                          background: "#090c13",
                          overflow: "hidden",
                        }}
                      >
                        <Link href={`/products/${product.slug}`} style={{ display: "block", width: "100%", height: "100%" }}>
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.4s ease",
                            }}
                          />
                        </Link>

                        {/* Remove from wishlist button */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "rgba(9, 13, 22, 0.8)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            color: "#ef4444",
                            backdropFilter: "blur(6px)",
                            transition: "transform 0.2s ease",
                          }}
                          title="Remove from wishlist"
                        >
                          <Icon name="heart" style={{ width: "18px", height: "18px", fill: "#ef4444" }} />
                        </button>

                        {/* Brand badge */}
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            background: product.brand === "Nexcolle" ? "var(--primary)" : "#2563eb",
                            color: "#ffffff",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            padding: "3px 10px",
                            borderRadius: "var(--radius-full)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {product.brand}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
                            SKU: {product.id}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
                            In Stock
                          </span>
                        </div>

                        <Link
                          href={`/products/${product.slug}`}
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            textDecoration: "none",
                            marginBottom: "8px",
                            lineHeight: 1.3,
                          }}
                        >
                          {product.title}
                        </Link>

                        <p style={{ fontSize: "0.82rem", color: "#94a3b8", margin: "0 0 16px 0", flex: 1, lineHeight: 1.5 }}>
                          Fitment: {product.compatibleBikes.slice(0, 3).join(", ")}
                        </p>

                        {/* Price & Action Row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "14px",
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                              ₹{product.price.toLocaleString("en-IN")}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ fontSize: "0.78rem", color: "#64748b", textDecoration: "line-through" }}>
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                              <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
                                {discount}% OFF
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className="btn btn-primary"
                            style={{
                              borderRadius: "var(--radius-full)",
                              padding: "10px 18px",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              background: isAdded ? "#10b981" : "var(--primary)",
                              boxShadow: isAdded ? "0 4px 14px rgba(16, 185, 129, 0.4)" : "0 4px 14px rgba(249, 87, 22, 0.35)",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <Icon name="cart" style={{ width: "16px", height: "16px" }} />
                            {isAdded ? "Added!" : "Add to Cart"}
                          </button>
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

