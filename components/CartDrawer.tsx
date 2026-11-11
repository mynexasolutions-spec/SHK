"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Icon } from "./SvgSprite";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponInput("");
    }
  };

  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

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
        if (e.target === e.currentTarget) closeCart();
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
        {/* Drawer Header */}
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
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="cart" style={{ color: "#fff" }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
                Shopping Cart
              </h3>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                {itemCount} {itemCount === 1 ? "part" : "parts"} selected
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
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
            aria-label="Close cart"
          >
            <Icon name="x" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div
          style={{
            padding: "12px 24px",
            background: "#f1f5f9",
            borderBottom: "1px solid var(--light-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: remainingForFreeShipping === 0 ? "var(--accent-green)" : "var(--text-main)",
              marginBottom: "6px",
            }}
          >
            <span>
              {remainingForFreeShipping === 0 ? (
                <>
                  <Icon name="truck" style={{ width: "14px", height: "14px", display: "inline-block", verticalAlign: "middle", marginRight: "6px", color: "var(--accent-green)" }} />
                  You unlocked FREE Pan-India Shipping!
                </>
              ) : (
                <>Add ₹{remainingForFreeShipping.toLocaleString("en-IN")} more for FREE Delivery</>
              )}
            </span>
            <span>{freeShippingProgress}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#e2e8f0",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: "100%",
                backgroundColor: remainingForFreeShipping === 0 ? "var(--accent-green)" : "var(--primary)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 12px",
                color: "var(--text-muted)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  margin: "0 auto 16px auto",
                  borderRadius: "var(--radius-full)",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                <Icon name="cart" style={{ width: "30px", height: "30px" }} />
              </div>
              <h4 style={{ color: "var(--text-main)", marginBottom: "6px" }}>Your cart is empty</h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "20px" }}>
                Add genuine Nexcolle batteries or FUJI engine spares to start an order.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={closeCart}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map(({ product, quantity }) => {
                // Check if wholesale tier discount is applied for this quantity
                const tier = [...product.wholesaleTiers]
                  .sort((a, b) => b.minQty - a.minQty)
                  .find((t) => quantity >= t.minQty);

                const unitPrice = tier ? tier.pricePerUnit : product.price;

                return (
                  <div
                    key={product.id}
                    style={{
                      display: "flex",
                      gap: "14px",
                      padding: "14px",
                      border: "1px solid var(--light-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "#ffffff",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            lineHeight: 1.3,
                            marginRight: "20px",
                            color: "var(--text-main)",
                          }}
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            padding: "2px",
                          }}
                          title="Remove item"
                        >
                          <Icon name="trash" />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "4px" }}>
                        <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "0.95rem" }}>
                          ₹{unitPrice.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice > unitPrice && (
                          <span style={{ fontSize: "0.75rem", textDecoration: "line-through", color: "#94a3b8" }}>
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        {tier && (
                          <span
                            style={{
                              fontSize: "0.65rem",
                              background: "#ecfdf5",
                              color: "#059669",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontWeight: 700,
                            }}
                          >
                            Tier -{tier.discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid var(--light-border)",
                            borderRadius: "var(--radius-sm)",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "#f8fafc",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--text-main)",
                            }}
                          >
                            <Icon name="minus" style={{ width: "12px", height: "12px" }} />
                          </button>
                          <span
                            style={{
                              width: "36px",
                              textAlign: "center",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                            }}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "#f8fafc",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--text-main)",
                            }}
                          >
                            <Icon name="plus" style={{ width: "12px", height: "12px" }} />
                          </button>
                        </div>

                        <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)" }}>
                          ₹{(unitPrice * quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with calculations */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--light-border)",
              background: "#ffffff",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
            }}
          >
            {/* Coupon Code Section */}
            <div style={{ marginBottom: "16px" }}>
              {appliedCoupon ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    background: "#ecfdf5",
                    border: "1px dashed #10b981",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                    color: "#065f46",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Icon name="tag" style={{ color: "#10b981" }} />
                    <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount.toLocaleString("en-IN")})
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GARAGE10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontSize: "0.85rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                        textTransform: "uppercase",
                      }}
                    />
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => handleApplyCoupon()}
                      style={{ padding: "8px 16px", whiteSpace: "nowrap" }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "4px",
                        color: couponMsg.error ? "#dc2626" : "#059669",
                        fontWeight: 600,
                      }}
                    >
                      {couponMsg.text}
                    </p>
                  )}
                  {/* Quick coupon tags */}
                  <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <button
                      onClick={() => handleApplyCoupon("GARAGE10")}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                      }}
                    >
                      GARAGE10 (10% off)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon("SHKFIRST")}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                      }}
                    >
                      SHKFIRST (₹150 off)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.85rem", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#059669", fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                <span>Delivery (Pan-India)</span>
                <span>{shippingFee === 0 ? <strong style={{ color: "var(--accent-green)" }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "0.75rem" }}>
                <span>Includes 18% GST</span>
                <span>(₹{Math.round((grandTotal * 18) / 118).toLocaleString("en-IN")} input credit)</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--text-main)",
                  paddingTop: "8px",
                  borderTop: "1px dashed var(--light-border)",
                  marginTop: "4px",
                }}
              >
                <span>Total Due</span>
                <span style={{ color: "var(--primary)" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout & WhatsApp Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => {
                  const itemsList = items
                    .map((i) => `• ${i.product.title} (x${i.quantity}) = ₹${(i.product.price * i.quantity).toLocaleString("en-IN")}`)
                    .join("%0A");
                  const msg = `Hello SHK Auto!%0A%0AI want to place an order from your website:%0A${itemsList}%0A%0A*Total: ₹${grandTotal.toLocaleString("en-IN")}*%0APlease send bank UPI details / invoice.`;
                  window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
                }}
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Fast Order via WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

