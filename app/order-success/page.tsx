"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/SvgSprite";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "SHK-729415";

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`shk_order_${orderId}`);
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, [orderId]);

  const customerName = order?.customer?.fullName || "Valued Customer";
  const total = order?.payment?.total || 2450;
  const paymentMethod = order?.payment?.method || "upi";

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 0 80px 0" }}>
      <div className="container" style={{ maxWidth: "840px" }}>
        
        {/* Success Header Box */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "36px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--light-border)",
            boxShadow: "var(--shadow-md)",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#ecfdf5",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <Icon name="check" style={{ width: "36px", height: "36px", strokeWidth: "3" }} />
          </div>

          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Order Confirmed &amp; In Queue
          </span>

          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text-main)", marginTop: "6px", marginBottom: "8px" }}>
            Thank You, {customerName}!
          </h1>

          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto 20px auto" }}>
            Your parts request has been transmitted to our central warehouse. We will dispatch within 24 hours.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#f1f5f9",
              padding: "10px 18px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.95rem",
              fontWeight: 700,
            }}
          >
            <span>Order Reference:</span>
            <strong style={{ color: "var(--primary)", fontFamily: "var(--font-heading)" }}>{orderId}</strong>
          </div>
        </div>

        {/* UPI Payment Card (If UPI selected) */}
        {paymentMethod === "upi" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid #bbf7d0",
              boxShadow: "var(--shadow-sm)",
              marginBottom: "24px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(to right, #f0fdf4, #ffffff)",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase" }}>
                Instant Zero-Fee UPI Payment
              </span>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", marginTop: "4px" }}>
                Pay ₹{total.toLocaleString("en-IN")} via UPI
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "4px 0 10px 0" }}>
                Scan using Google Pay, PhonePe, Paytm or transfer to UPI ID:
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  background: "#ffffff",
                  border: "1px dashed #16a34a",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#166534",
                }}
              >
                shkauto@upi
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  background: "#ffffff",
                  border: "2px solid #22c55e",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                  margin: "0 auto",
                }}
              >
                {/* Visual QR representation */}
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="15" y="15" width="15" height="15" fill="#fff" />
                  <rect x="18" y="18" width="9" height="9" fill="#0f172a" />
                  <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                  <rect x="70" y="15" width="15" height="15" fill="#fff" />
                  <rect x="73" y="18" width="9" height="9" fill="#0f172a" />
                  <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                  <rect x="15" y="70" width="15" height="15" fill="#fff" />
                  <rect x="18" y="73" width="9" height="9" fill="#0f172a" />
                  <rect x="45" y="15" width="8" height="8" fill="#0f172a" />
                  <rect x="45" y="35" width="15" height="15" fill="#0f172a" />
                  <rect x="25" y="45" width="10" height="10" fill="#0f172a" />
                  <rect x="65" y="45" width="12" height="12" fill="#0f172a" />
                  <rect x="45" y="65" width="18" height="18" fill="#0f172a" />
                  <rect x="70" y="70" width="18" height="18" fill="#0f172a" />
                </svg>
              </div>
              <span style={{ fontSize: "0.7rem", color: "#15803d", fontWeight: 700, display: "block", marginTop: "4px" }}>
                Auto-Verified Gateway
              </span>
            </div>
          </div>
        )}

        {/* Invoice & Order Summary */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "28px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--light-border)",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>
              Order Breakdown &amp; GST Details
            </h3>
            <button
              onClick={() => window.print()}
              className="btn btn-outline btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Icon name="printer" /> Print Tax Invoice
            </button>
          </div>

          {/* Delivery & Customer Info Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              padding: "16px",
              background: "#f8fafc",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong style={{ display: "block", color: "var(--text-main)", marginBottom: "4px" }}>
                Dispatch Destination:
              </strong>
              <p style={{ margin: 0, color: "var(--text-muted)" }}>
                {order?.shipping?.address || "Workshop Bay 4, Auto Complex"}<br />
                {order?.shipping?.city || "New Delhi"}, {order?.shipping?.state || "Delhi"} - {order?.shipping?.pinCode || "110001"}
              </p>
            </div>

            <div>
              <strong style={{ display: "block", color: "var(--text-main)", marginBottom: "4px" }}>
                Contact / Business:
              </strong>
              <p style={{ margin: 0, color: "var(--text-muted)" }}>
                {customerName} {order?.customer?.garageName ? `(${order.customer.garageName})` : ""}<br />
                Phone: {order?.customer?.phone || "+91 98765 43210"}<br />
                {order?.customer?.gstin && <>GSTIN: <strong>{order.customer.gstin}</strong></>}
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          {order?.items && order.items.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--light-border)", textAlign: "left", color: "var(--text-muted)" }}>
                    <th style={{ padding: "8px 0" }}>Part Description</th>
                    <th style={{ padding: "8px", textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "8px", textAlign: "right" }}>Price</th>
                    <th style={{ padding: "8px 0", textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--light-border)" }}>
                      <td style={{ padding: "10px 0" }}>
                        <strong>{item.product.title}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          SKU: {item.product.id} • {item.product.brand} OEM
                        </div>
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: "10px", textAlign: "right" }}>₹{item.product.price.toLocaleString("en-IN")}</td>
                      <td style={{ padding: "10px 0", textAlign: "right", fontWeight: 700 }}>
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", gap: "24px" }}>
              <span style={{ color: "var(--text-muted)" }}>Payment Method:</span>
              <strong style={{ textTransform: "uppercase" }}>{paymentMethod}</strong>
            </div>
            <div style={{ display: "flex", gap: "24px", fontSize: "1.25rem", fontWeight: 900, color: "var(--primary)", marginTop: "6px" }}>
              <span>Total Paid / Due:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
          <a
            href={`https://wa.me/919876543210?text=Hello%20SHK%20Auto!%20I%20have%20placed%20order%20${orderId}%20for%20Rs.%20${total}.%20Please%20share%20tracking%20airway%20bill.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            Track on WhatsApp Dispatch Desk
          </a>
          <Link href="/" className="btn btn-dark" style={{ textDecoration: "none" }}>
            Return to Store
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

