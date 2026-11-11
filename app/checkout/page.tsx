"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Icon } from "@/components/SvgSprite";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    appliedCoupon,
    shippingFee,
    grandTotal,
    clearCart,
  } = useCart();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [garageName, setGarageName] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Delhi");
  const [pinCode, setPinCode] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Delivery calculation
  const expressFee = deliveryMethod === "express" ? 199 : 0;
  const finalShippingFee = shippingFee + expressFee;
  const finalTotal = subtotal - discountAmount + finalShippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);

    const orderId = "SHK-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      date: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        email,
        garageName,
        gstin,
      },
      shipping: {
        address,
        city,
        state,
        pinCode,
        deliveryMethod,
        shippingFee: finalShippingFee,
      },
      payment: {
        method: paymentMethod,
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        total: finalTotal,
      },
      items,
    };

    // Store order in localStorage for confirmation screen
    try {
      localStorage.setItem(`shk_order_${orderId}`, JSON.stringify(orderData));
      localStorage.setItem("shk_latest_order", orderId);
    } catch {
      // Ignore
    }

    clearCart();

    setTimeout(() => {
      router.push(`/order-success?orderId=${orderId}`);
    }, 800);
  };

  if (items.length === 0 && !submitting) {
    return (
      <div style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "440px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#fee2e2",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px auto",
            }}
          >
            <Icon name="cart" style={{ width: "36px", height: "36px" }} />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "10px" }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Please select parts from our catalog before proceeding to checkout.
          </p>
          <Link href="/#catalog" className="btn btn-primary">
            Explore Product Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 0 80px 0" }}>
      <div className="container" style={{ maxWidth: "1120px" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "24px" }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
          <span>/</span>
          <Link href="/#catalog" style={{ color: "var(--text-muted)" }}>Catalog</Link>
          <span>/</span>
          <strong style={{ color: "var(--text-main)" }}>Checkout &amp; Order Placement</strong>
        </div>

        <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
          Secure Checkout
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "32px" }}>
          Fast pan-India dispatch from our central distribution hub. GST invoice provided for garage tax credits.
        </p>

        <form onSubmit={handlePlaceOrder}>
          <div className="checkout-main-grid" style={{ alignItems: "start" }}>
            
            {/* Left Column: Customer & Shipping Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Step 1: Customer Details */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--light-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    1
                  </span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                    Customer &amp; Garage Information
                  </h3>
                </div>

                <div className="checkout-form-grid">
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@garage.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Workshop / Retail Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Moto Care"
                      value={garageName}
                      onChange={(e) => setGarageName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      GSTIN for Tax Invoice (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="07AAAAA0000A1Z5"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                        textTransform: "uppercase",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--light-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    2
                  </span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                    Dispatch Address
                  </h3>
                </div>

                <div className="checkout-form-grid">
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Street Address / Workshop Location *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Shop No. / Plot, Main Road, Landmark..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="110001"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      State *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--light-border)",
                        background: "#fff",
                      }}
                    >
                      <option value="Delhi">Delhi / NCR</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Other">Other State (Pan-India)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Delivery Speed & Payment Method */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--light-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    3
                  </span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
                    Dispatch Speed &amp; Payment
                  </h3>
                </div>

                {/* Delivery Option Radio */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: deliveryMethod === "standard" ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: deliveryMethod === "standard" ? "#fef2f2" : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === "standard"}
                        onChange={() => setDeliveryMethod("standard")}
                      />
                      <div>
                        <strong>Standard Road Freight (2-3 Business Days)</strong>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Central warehouse dispatch with real-time tracking
                        </p>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: shippingFee === 0 ? "var(--accent-green)" : "var(--text-main)" }}>
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: deliveryMethod === "express" ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: deliveryMethod === "express" ? "#fef2f2" : "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === "express"}
                        onChange={() => setDeliveryMethod("express")}
                      />
                      <div>
                        <strong>Priority Air Cargo (24-48 Hours Express)</strong>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Urgent garage breakdown priority courier
                        </p>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: "var(--text-main)" }}>
                      +₹199
                    </span>
                  </label>
                </div>

                {/* Payment Option */}
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Select Payment Mode:</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    style={{
                      padding: "14px 10px",
                      borderRadius: "var(--radius-md)",
                      border: paymentMethod === "upi" ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      backgroundColor: paymentMethod === "upi" ? "#fef2f2" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Icon name="bolt" style={{ color: "var(--primary)", width: "22px", height: "22px", margin: "0 auto 6px auto", display: "block" }} />
                    <strong style={{ display: "block", fontSize: "0.85rem" }}>UPI / QR Pay</strong>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    style={{
                      padding: "14px 10px",
                      borderRadius: "var(--radius-md)",
                      border: paymentMethod === "card" ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      backgroundColor: paymentMethod === "card" ? "#fef2f2" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Icon name="credit-card" style={{ color: "var(--primary)", width: "22px", height: "22px", margin: "0 auto 6px auto", display: "block" }} />
                    <strong style={{ display: "block", fontSize: "0.85rem" }}>Card / NetBank</strong>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>All Indian Banks</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    style={{
                      padding: "14px 10px",
                      borderRadius: "var(--radius-md)",
                      border: paymentMethod === "cod" ? "2px solid var(--primary)" : "1px solid var(--light-border)",
                      backgroundColor: paymentMethod === "cod" ? "#fef2f2" : "#ffffff",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Icon name="truck" style={{ color: "var(--primary)", width: "22px", height: "22px", margin: "0 auto 6px auto", display: "block" }} />
                    <strong style={{ display: "block", fontSize: "0.85rem" }}>Pay on Delivery</strong>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Verified Garages</span>
                  </button>
                </div>

                {paymentMethod === "upi" && (
                  <div
                    style={{
                      marginTop: "14px",
                      padding: "12px",
                      background: "#f0fdf4",
                      border: "1px dashed #22c55e",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.8rem",
                      color: "#166534",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon name="bolt" style={{ width: "16px", height: "16px", color: "#16a34a", flexShrink: 0 }} />
                      <span>Instant UPI QR and direct UPI ID will appear after submitting your order for immediate 0-fee settlement.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--light-border)",
                boxShadow: "var(--shadow-md)",
                position: "sticky",
                top: "100px",
              }}
            >
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: "16px", color: "var(--text-main)" }}>
                Order Summary ({items.length} items)
              </h3>

              {/* Items List Mini */}
              <div style={{ maxHeight: "240px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "42px", height: "42px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {product.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Qty: {quantity} × ₹{product.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div style={{ borderTop: "1px solid var(--light-border)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Items Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#059669", fontWeight: 700 }}>
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)" }}>
                  <span>Freight &amp; Handling</span>
                  <span>{finalShippingFee === 0 ? <strong style={{ color: "var(--accent-green)" }}>FREE</strong> : `₹${finalShippingFee}`}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: "0.8rem" }}>
                  <span>Included GST (18%)</span>
                  <span>₹{Math.round((finalTotal * 18) / 118).toLocaleString("en-IN")}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.3rem",
                    fontWeight: 900,
                    color: "var(--text-main)",
                    paddingTop: "12px",
                    borderTop: "2px solid var(--light-border)",
                    marginTop: "6px",
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: "var(--primary)" }}>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem" }}
                >
                  {submitting ? "Confirming Order..." : `Place Order (₹${finalTotal.toLocaleString("en-IN")})`}
                </button>
              </div>

              {/* Guarantees */}
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Icon name="shield-check" style={{ color: "var(--accent-green)" }} />
                  <span>100% Genuine OEM Fitment Guarantee</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Icon name="truck" style={{ color: "var(--primary)" }} />
                  <span>Dispatched with Tracking via Blue Dart / Delhivery / Air Cargo</span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

