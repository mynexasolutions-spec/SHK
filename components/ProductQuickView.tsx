"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Icon } from "./SvgSprite";

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
}

export function ProductQuickView({
  product,
  onClose,
  onOpenQuote,
}: ProductQuickViewProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  // Check if bulk tier is matched
  const currentTier = [...product.wholesaleTiers]
    .sort((a, b) => b.minQty - a.minQty)
    .find((t) => quantity >= t.minQty);

  const unitPrice = currentTier ? currentTier.pricePerUnit : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    window.location.href = "/checkout";
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(9, 13, 22, 0.75)",
        backdropFilter: "blur(5px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "880px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-full)",
            background: "#f1f5f9",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-main)",
          }}
          aria-label="Close dialog"
        >
          <Icon name="x" />
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", padding: "clamp(16px, 3vw, 28px)" }}>
          {/* Left: Gallery */}
          <div>
            <div
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--light-border)",
                backgroundColor: "#f8fafc",
                aspectRatio: "4 / 3",
                position: "relative",
              }}
            >
              <img
                src={product.gallery[selectedImg] || product.image}
                alt={product.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "var(--primary)",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "var(--shadow-red)",
                }}
              >
                {product.badge}
              </span>
            </div>

            {/* Thumbnail selector */}
            {product.gallery.length > 1 && (
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      border: selectedImg === idx ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <img src={img} alt="Thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Wholesale Price Tiers Table */}
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                backgroundColor: "#f8fafc",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--light-border)",
              }}
            >
              <h5 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-main)" }}>
                🏬 Workshop &amp; Bulk Discount Tiers:
              </h5>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", textAlign: "center" }}>
                {product.wholesaleTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "8px 6px",
                      background: quantity >= tier.minQty ? "#ecfdf5" : "#ffffff",
                      border: quantity >= tier.minQty ? "1px solid #10b981" : "1px solid var(--light-border)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>
                      {tier.minQty}+ Units
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: quantity >= tier.minQty ? "#059669" : "var(--primary)" }}>
                      ₹{tier.pricePerUnit}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "#10b981", fontWeight: 700 }}>
                      Save {tier.discountPercent}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase" }}>
                {product.meta}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  background: isFav ? "#fee2e2" : "#f1f5f9",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: isFav ? "#dc2626" : "var(--text-muted)",
                }}
                title={isFav ? "In Wishlist" : "Add to Wishlist"}
              >
                <Icon name="heart" />
              </button>
            </div>

            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.25, color: "var(--text-main)", marginBottom: "8px" }}>
              {product.title}
            </h2>

            {/* Ratings & Stock */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--accent-gold)" }}>
                <Icon name="star" style={{ width: "15px", height: "15px" }} />
                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>
                  {product.rating}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  ({product.reviewsCount} reviews)
                </span>
              </div>
              <span style={{ color: "#cbd5e1" }}>•</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#059669",
                  background: "#ecfdf5",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                  }}
                />
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Price section */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>
                ₹{unitPrice.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > unitPrice && (
                <span style={{ fontSize: "1.1rem", textDecoration: "line-through", color: "#94a3b8" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  background: "#fef2f2",
                  color: "var(--primary)",
                  padding: "2px 8px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Save {Math.round(((product.originalPrice - unitPrice) / product.originalPrice) * 100)}%
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "18px" }}>
              {product.description}
            </p>

            {/* Quantity Stepper & Buttons */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--light-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  height: "44px",
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "38px",
                    height: "100%",
                    background: "#f8fafc",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="minus" style={{ width: "14px", height: "14px" }} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  style={{
                    width: "50px",
                    textAlign: "center",
                    border: "none",
                    fontWeight: 800,
                    fontSize: "1rem",
                  }}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{
                    width: "38px",
                    height: "100%",
                    background: "#f8fafc",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="plus" style={{ width: "14px", height: "14px" }} />
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ flex: 1, height: "44px", justifyContent: "center" }}
              >
                <Icon name="cart" /> Add to Cart (₹{(unitPrice * quantity).toLocaleString("en-IN")})
              </button>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
              <button
                className="btn btn-dark"
                onClick={handleBuyNow}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Buy Now
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  onClose();
                  onOpenQuote(product.title);
                }}
                style={{ justifyContent: "center" }}
              >
                Inquire Bulk
              </button>
            </div>

            {/* Specifications Details */}
            <div style={{ borderTop: "1px solid var(--light-border)", paddingTop: "16px" }}>
              <h5 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>Technical Specifications:</h5>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", fontSize: "0.8rem" }}>
                {Object.entries(product.specDetails).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>{key}:</span>
                    <strong style={{ color: "var(--text-main)" }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible Bikes */}
            <div style={{ borderTop: "1px solid var(--light-border)", paddingTop: "14px", marginTop: "14px" }}>
              <h5 style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>Verified Fitment:</h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {product.compatibleBikes.map((bike, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#f1f5f9",
                      color: "var(--text-main)",
                      fontSize: "0.75rem",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {bike}
                  </span>
                ))}
              </div>
            </div>

            {/* Warranty badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f8fafc",
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                marginTop: "16px",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              <Icon name="shield-check" style={{ color: "var(--accent-green)" }} />
              <span>
                <strong>Warranty Guarantee:</strong> {product.warranty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

