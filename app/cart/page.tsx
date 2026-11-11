"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";
import { QuoteModal } from "@/components/QuoteModal";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    grandTotal,
    clearCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  return (
    <>
      <TopBar />
      <Header onOpenQuote={() => setQuoteModalOpen(true)} />

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
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>Shopping Cart</span>
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
                  Shopping Cart
                </h1>
                <p style={{ color: "#94a3b8", margin: "6px 0 0 0", fontSize: "0.95rem" }}>
                  {itemCount > 0
                    ? `${itemCount} OEM-grade ${itemCount === 1 ? "part" : "parts"} ready for pan-India dispatch.`
                    : "Review your selected motorcycle batteries and precision engine spares."}
                </p>
              </div>

              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    color: "#f87171",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "var(--transition)",
                  }}
                >
                  <Icon name="trash" style={{ width: "14px", height: "14px" }} />
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Cart Body */}
        <section style={{ padding: "48px 0 80px 0" }}>
          <div className="container">
            {items.length === 0 ? (
              /* Empty Cart State */
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
                    background: "rgba(249, 87, 22, 0.12)",
                    border: "1px solid rgba(249, 87, 22, 0.25)",
                    color: "var(--primary)",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 24px auto",
                  }}
                >
                  <Icon name="cart" style={{ width: "36px", height: "36px" }} />
                </div>

                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                  Your Shopping Cart is Empty
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 28px auto" }}>
                  You haven&apos;t added any parts yet. Explore our high-CCA Nexcolle&trade; batteries and precision FUJI&trade; engine components.
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
                    Explore All Products
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
                    View Brands
                  </Link>
                </div>
              </div>
            ) : (
              /* Two-Column Cart Grid */
              <div
                style={{
                  alignItems: "start",
                }}
                className="cart-grid-layout"
              >
                {/* Left: Cart Items */}
                <div>
                  {/* Items List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        style={{
                          background: "#0e131d",
                          borderRadius: "18px",
                          padding: "20px",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          transition: "var(--transition)",
                        }}
                        className="cart-item-row"
                      >
                        {/* Thumbnail */}
                        <Link
                          href={`/products/${item.product.slug}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            background: "#090c13",
                            display: "block",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Link>

                        {/* Details */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <span
                              style={{
                                background: item.product.brand === "Nexcolle" ? "rgba(249, 87, 22, 0.15)" : "rgba(59, 130, 246, 0.15)",
                                color: item.product.brand === "Nexcolle" ? "var(--primary)" : "#60a5fa",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              {item.product.brand}
                            </span>
                            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>SKU: {item.product.id}</span>
                          </div>

                          <Link
                            href={`/products/${item.product.slug}`}
                            style={{
                              fontSize: "1rem",
                              fontWeight: 700,
                              color: "#ffffff",
                              textDecoration: "none",
                              display: "block",
                              marginBottom: "6px",
                            }}
                          >
                            {item.product.title}
                          </Link>

                          <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                            Fitment: {item.product.compatibleBikes.slice(0, 2).join(", ")}
                            {item.product.compatibleBikes.length > 2 && " + more"}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div
                          className="cart-qty-ctrl"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            padding: "4px 8px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#cbd5e1",
                              width: "26px",
                              height: "26px",
                              cursor: "pointer",
                              display: "grid",
                              placeItems: "center",
                              fontSize: "1.1rem",
                              fontWeight: 700,
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{
                              width: "32px",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              color: "#ffffff",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#cbd5e1",
                              width: "26px",
                              height: "26px",
                              cursor: "pointer",
                              display: "grid",
                              placeItems: "center",
                              fontSize: "1.1rem",
                              fontWeight: 700,
                            }}
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="cart-price-col" style={{ textAlign: "right", minWidth: "100px" }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginBottom: "2px" }}>
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "line-through", marginBottom: "8px" }}>
                            ₹{(item.product.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#94a3b8",
                              cursor: "pointer",
                              padding: "4px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.78rem",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                            title="Remove item"
                          >
                            <Icon name="trash" style={{ width: "14px", height: "14px" }} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Continue Shopping button */}
                  <div style={{ marginTop: "24px" }}>
                    <Link
                      href="/products"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#94a3b8",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    >
                      Continue Exploring Spare Parts
                    </Link>
                  </div>
                </div>

                {/* Right: Sticky Order Summary Card */}
                <div
                  style={{
                    background: "#0e131d",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    position: "sticky",
                    top: "90px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 18px 0", letterSpacing: "-0.01em" }}>
                    Order Summary
                  </h3>

                  {/* Cost Breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "0.92rem" }}>
                      <span>Subtotal ({itemCount} items)</span>
                      <strong style={{ color: "#ffffff" }}>₹{subtotal.toLocaleString("en-IN")}</strong>
                    </div>

                    {discountAmount > 0 && appliedCoupon && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#10b981", fontSize: "0.92rem" }}>
                        <span>Promo Discount ({appliedCoupon.code})</span>
                        <strong>-₹{discountAmount.toLocaleString("en-IN")}</strong>
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: "0.92rem" }}>
                      <span>Pan-India Shipping</span>
                      {shippingFee === 0 ? (
                        <strong style={{ color: "#10b981" }}>FREE</strong>
                      ) : (
                        <strong style={{ color: "#ffffff" }}>₹{shippingFee}</strong>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "0.82rem" }}>
                      <span>Estimated GST (18%)</span>
                      <span>Included in price</span>
                    </div>

                    <div
                      style={{
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.08)",
                        margin: "4px 0",
                      }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>Total Payable</span>
                      <span style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--primary)" }}>
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Code Section */}
                  <div style={{ marginBottom: "24px" }}>
                    {appliedCoupon ? (
                      <div
                        style={{
                          background: "rgba(16, 185, 129, 0.1)",
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10b981" }}>
                            Coupon {appliedCoupon.code} Applied!
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                            Saved ₹{discountAmount.toLocaleString("en-IN")} on this order
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeCoupon}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f87171",
                            fontSize: "0.78rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            style={{
                              flex: 1,
                              background: "#131926",
                              border: "1px solid rgba(255, 255, 255, 0.14)",
                              borderRadius: "10px",
                              padding: "10px 14px",
                              color: "#ffffff",
                              fontSize: "0.85rem",
                              textTransform: "uppercase",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon()}
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              color: "#ffffff",
                              borderRadius: "10px",
                              padding: "10px 18px",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            Apply
                          </button>
                        </div>

                        {couponMsg && (
                          <div
                            style={{
                              fontSize: "0.76rem",
                              color: couponMsg.error ? "#f87171" : "#10b981",
                              marginBottom: "8px",
                            }}
                          >
                            {couponMsg.text}
                          </div>
                        )}

                        {/* Fast Apply Pills */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon("SHKFIRST")}
                            style={{
                              background: "rgba(249, 87, 22, 0.1)",
                              border: "1px dashed rgba(249, 87, 22, 0.4)",
                              color: "var(--primary-light)",
                              borderRadius: "6px",
                              padding: "3px 8px",
                              fontSize: "0.72rem",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            SHKFIRST (10% Off)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon("BULK10")}
                            style={{
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px dashed rgba(255, 255, 255, 0.2)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              padding: "3px 8px",
                              fontSize: "0.72rem",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            BULK10
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Proceed to Checkout Button */}
                  <Link
                    href="/checkout"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      borderRadius: "var(--radius-full)",
                      padding: "14px 20px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      boxShadow: "0 10px 25px rgba(249, 87, 22, 0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      marginBottom: "16px",
                    }}
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Trust guarantees */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingTop: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon name="shield-check" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                      <span>100% Genuine JIS &amp; DIN Certified Spares</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon name="truck" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                      <span>Pan-India Priority 24–48h Air &amp; Surface Freight</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon name="check" style={{ width: "16px", height: "16px", color: "#10b981" }} />
                      <span>GST B2B Tax Invoice eligible for Input Credit</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer onSelectCategory={() => {}} />
      <WhatsAppFloat />
      <QuoteModal
        isOpen={quoteModalOpen}
        selectedProduct="Shopping Cart Wholesale Inquiry"
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}

