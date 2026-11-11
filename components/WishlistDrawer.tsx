"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { Icon } from "./SvgSprite";

export function WishlistDrawer() {
  const { wishlist, isWishlistOpen, closeWishlist, toggleWishlist, addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(9, 13, 22, 0.7)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeWishlist();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-xl)",
          animation: "slideInRight 0.28s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--light-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--dark-surface)",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius-md)",
                background: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="heart" style={{ color: "#fff", width: "18px", height: "18px" }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
                Wishlist &amp; Saved Parts
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                {wishlist.length} {wishlist.length === 1 ? "part" : "parts"} saved
              </span>
            </div>
          </div>

          <button
            onClick={closeWishlist}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#fff",
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-full)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close wishlist"
          >
            <Icon name="x" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {wishlistedProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 16px", color: "var(--text-muted)" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 16px auto",
                  borderRadius: "50%",
                  background: "#fee2e2",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="heart" style={{ width: "30px", height: "30px" }} />
              </div>
              <h4 style={{ color: "var(--text-main)", marginBottom: "6px" }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "20px" }}>
                Click the heart icon on any battery or engine spare part in the store to save it here for fast reordering.
              </p>
              <Link
                href="/#catalog"
                onClick={closeWishlist}
                className="btn btn-primary btn-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    padding: "14px",
                    border: "1px solid var(--light-border)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "#ffffff",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      backgroundColor: "#f8fafc",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700 }}>
                      {product.brand} OEM • {product.meta}
                    </div>
                    <h4
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        margin: "2px 0 6px 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "var(--text-main)",
                      }}
                    >
                      {product.title}
                    </h4>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "0.95rem" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice > product.price && (
                        <span style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#94a3b8" }}>
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        closeWishlist();
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ padding: "6px 12px", fontSize: "0.75rem" }}
                      title="Add to Cart"
                    >
                      <Icon name="cart" style={{ width: "13px", height: "13px" }} />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#94a3b8",
                        cursor: "pointer",
                        padding: "4px",
                        textAlign: "center",
                      }}
                      title="Remove from Wishlist"
                    >
                      <Icon name="trash" style={{ width: "14px", height: "14px" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--light-border)",
              background: "#ffffff",
            }}
          >
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => addToCart(p, 1));
                closeWishlist();
              }}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Move All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

