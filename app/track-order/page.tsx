"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get("orderId") || "";

  const [orderInput, setOrderInput] = useState(queryOrderId);
  const [searchedId, setSearchedId] = useState(queryOrderId);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Attempt to load default order if not provided
    const targetId = searchedId || localStorage.getItem("shk_latest_order") || "SHK-729415";
    setOrderInput(targetId);
    setSearchedId(targetId);

    try {
      const saved = localStorage.getItem(`shk_order_${targetId}`);
      if (saved) {
        setOrderData(JSON.parse(saved));
      } else {
        // Fallback demo data
        setOrderData({
          orderId: targetId,
          date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          customer: {
            fullName: "Ramesh Sharma",
            garageName: "Apex Moto Care",
            phone: "+91 98765 43210",
          },
          shipping: {
            address: "Plot 12, Main Workshop Market",
            city: "New Delhi",
            state: "Delhi",
            pinCode: "110001",
            deliveryMethod: "express",
          },
          items: [
            {
              product: {
                title: "Nexcolle Pro-Power 12V 4Ah Maintenance-Free Battery",
                price: 1650,
                image: "/images/battery.jpg",
              },
              quantity: 2,
            },
          ],
        });
      }
    } catch {
      // Ignore
    }
  }, [searchedId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderInput.trim()) {
      setSearchedId(orderInput.trim().toUpperCase());
    }
  };

  const steps = [
    {
      title: "Order Placed & Confirmed",
      desc: "Received at central distribution hub",
      time: "Today, 10:30 AM",
      completed: true,
    },
    {
      title: "Quality Inspected & Sealed",
      desc: "Checked for OEM zero-tolerance fitment",
      time: "Today, 01:15 PM",
      completed: true,
    },
    {
      title: "Dispatched via Express Courier",
      desc: "AWB #BD-9823144 (Blue Dart Air)",
      time: "Today, 04:45 PM",
      completed: true,
    },
    {
      title: "In Transit to Destination City Hub",
      desc: "Expected arrival at local terminal",
      time: "Tomorrow, 08:00 AM",
      completed: false,
      active: true,
    },
    {
      title: "Out for Delivery to Workshop",
      desc: "Courier delivery agent assigned",
      time: "Estimated within 24 Hours",
      completed: false,
    },
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "30px 0 80px 0" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        
        {/* Header Breadcrumb */}
        <div style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
          <span>/</span>
          <strong style={{ color: "var(--text-main)" }}>Live Shipment &amp; Airway Bill Tracker</strong>
        </div>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="pill-tag">Pan-India Courier Network</span>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text-main)", marginTop: "6px" }}>
            Track Your Parts Shipment
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Real-time GPS tracking for Nexcolle batteries and FUJI precision spares dispatches.
          </p>
        </div>

        {/* Search Order Reference Input */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "520px",
            margin: "0 auto 36px auto",
            backgroundColor: "#ffffff",
            padding: "6px",
            borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--light-border)",
          }}
        >
          <input
            type="text"
            required
            placeholder="Enter Order Reference (e.g. SHK-729415)"
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value.toUpperCase())}
            style={{
              flex: 1,
              padding: "10px 18px",
              border: "none",
              fontSize: "0.95rem",
              fontWeight: 700,
              textTransform: "uppercase",
              outline: "none",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
            Track Order
          </button>
        </form>

        {/* Tracking Card */}
        {orderData && (
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--light-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Top Order Details Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "24px",
                borderBottom: "1px solid var(--light-border)",
                marginBottom: "28px",
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Order Reference
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--primary)", margin: "2px 0 0 0" }}>
                  {orderData.orderId}
                </h3>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Recipient
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {orderData.customer?.fullName} {orderData.customer?.garageName ? `(${orderData.customer.garageName})` : ""}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Destination
                </span>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {orderData.shipping?.city}, {orderData.shipping?.state}
                </div>
              </div>

              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "#ecfdf5",
                    color: "#059669",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                  In Transit (Air Cargo)
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingLeft: "10px" }}>
              {steps.map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: "20px", position: "relative" }}>
                  {/* Vertical connector line */}
                  {idx < steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "32px",
                        bottom: "-24px",
                        width: "2px",
                        backgroundColor: step.completed ? "#10b981" : "#e2e8f0",
                      }}
                    />
                  )}

                  {/* Icon Circle */}
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: step.completed ? "#10b981" : step.active ? "var(--primary)" : "#f1f5f9",
                      color: step.completed || step.active ? "#ffffff" : "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      zIndex: 1,
                      boxShadow: step.active ? "0 0 0 4px rgba(229, 27, 36, 0.2)" : "none",
                    }}
                  >
                    {step.completed ? (
                      <Icon name="check" style={{ width: "16px", height: "16px", strokeWidth: "3" }} />
                    ) : (
                      <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                      <strong style={{ fontSize: "0.95rem", color: step.active ? "var(--primary)" : "var(--text-main)" }}>
                        {step.title}
                      </strong>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{step.time}</span>
                    </div>
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Support & Tracking Actions */}
            <div
              style={{
                marginTop: "36px",
                paddingTop: "24px",
                borderTop: "1px solid var(--light-border)",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Need live courier coordination or address modification?
              </div>

              <a
                href={`https://wa.me/919876543210?text=Hello%20SHK%20Auto%20Logistics%2C%20please%20share%20latest%20AWB%20courier%20status%20for%20order%20${orderData.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                Chat with Logistics Desk
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <>
      <TopBar />
      <Header />
      <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading shipment status...</div>}>
        <TrackOrderContent />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
