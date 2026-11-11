"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Icon } from "@/components/SvgSprite";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, logout, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "tiers" | "garage">("profile");

  // Form state initialized with user info
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [workshopName, setWorkshopName] = useState(user?.workshopName || "");
  const [gstin, setGstin] = useState(user?.gstin || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [pincode, setPincode] = useState(user?.pincode || "");

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if user loads late
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setWorkshopName(user.workshopName || "");
      setGstin(user.gstin || "");
      setAddress(user.address || "");
      setCity(user.city || "");
      setState(user.state || "");
      setPincode(user.pincode || "");
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      phone,
      email,
      workshopName,
      gstin,
      address,
      city,
      state,
      pincode,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <TopBar />
      <Header />

      <main style={{ backgroundColor: "#090c13", minHeight: "100vh", color: "#ffffff" }}>
        {/* Profile Hero Header */}
        <section
          style={{
            background: "linear-gradient(180deg, #090c13 0%, #0e131d 100%)",
            padding: "44px 0 32px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "1140px" }}>
            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "#94a3b8",
                marginBottom: "16px",
              }}
            >
              <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>My Trade Profile</span>
            </div>

            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #f95716 0%, #d8430b 100%)",
                      color: "#ffffff",
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 24px rgba(249, 87, 22, 0.4)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                      <h1
                        className="notranslate"
                        translate="no"
                        style={{
                          fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                          fontWeight: 800,
                          margin: 0,
                          color: "#ffffff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {user.name}
                      </h1>
                      <span
                        style={{
                          backgroundColor: "rgba(16, 185, 129, 0.15)",
                          color: "#34d399",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Icon name="shield-check" style={{ width: "13px", height: "13px", color: "#34d399" }} />
                        Verified Trade Account
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "18px", marginTop: "8px", fontSize: "0.86rem", color: "#cbd5e1", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Icon name="phone" style={{ width: "15px", height: "15px", color: "var(--primary)" }} />
                        {user.phone}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Icon name="mail" style={{ width: "15px", height: "15px", color: "var(--primary)" }} />
                        {user.email}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Icon name="briefcase" style={{ width: "15px", height: "15px", color: "var(--primary)" }} />
                        {workshopName || "Authorized Workshop"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.12)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    padding: "9px 18px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "var(--transition)",
                  }}
                >
                  <Icon name="x" style={{ width: "14px", height: "14px" }} /> Sign Out
                </button>
              </div>
            ) : (
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0 }}>My Account</h1>
                <p style={{ color: "#94a3b8", marginTop: "6px" }}>Sign in to view your profile and wholesale orders.</p>
              </div>
            )}
          </div>
        </section>

        {/* Content Body */}
        <section style={{ padding: "40px 0 80px 0" }}>
          <div className="container" style={{ maxWidth: "1140px" }}>
            {user ? (
              <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "32px", alignItems: "start" }}>
                {/* Left Navigation Sidebar */}
                <div
                  style={{
                    backgroundColor: "#0e131d",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <button
                    onClick={() => setActiveTab("profile")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      backgroundColor: activeTab === "profile" ? "var(--primary)" : "transparent",
                      color: activeTab === "profile" ? "#ffffff" : "#cbd5e1",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "var(--transition)",
                    }}
                  >
                    <Icon
                      name="user"
                      style={{
                        width: "18px",
                        height: "18px",
                        color: activeTab === "profile" ? "#ffffff" : "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    Profile &amp; Workshop
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      backgroundColor: activeTab === "orders" ? "var(--primary)" : "transparent",
                      color: activeTab === "orders" ? "#ffffff" : "#cbd5e1",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "var(--transition)",
                    }}
                  >
                    <Icon
                      name="package"
                      style={{
                        width: "18px",
                        height: "18px",
                        color: activeTab === "orders" ? "#ffffff" : "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    My Orders &amp; Shipments
                  </button>

                  <button
                    onClick={() => setActiveTab("tiers")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      backgroundColor: activeTab === "tiers" ? "var(--primary)" : "transparent",
                      color: activeTab === "tiers" ? "#ffffff" : "#cbd5e1",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "var(--transition)",
                    }}
                  >
                    <Icon
                      name="percent"
                      style={{
                        width: "18px",
                        height: "18px",
                        color: activeTab === "tiers" ? "#ffffff" : "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    Wholesale Pricing Tiers
                  </button>

                  <button
                    onClick={() => setActiveTab("garage")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "none",
                      backgroundColor: activeTab === "garage" ? "var(--primary)" : "transparent",
                      color: activeTab === "garage" ? "#ffffff" : "#cbd5e1",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "var(--transition)",
                    }}
                  >
                    <Icon
                      name="bike"
                      style={{
                        width: "18px",
                        height: "18px",
                        color: activeTab === "garage" ? "#ffffff" : "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                    Saved Workshop Bikes
                  </button>
                </div>

                {/* Right Content Area */}
                <div>
                  {activeTab === "profile" && (
                    <div
                      style={{
                        backgroundColor: "#0e131d",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "32px",
                      }}
                    >
                      <div style={{ marginBottom: "24px" }}>
                        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                          Account &amp; Workshop Details
                        </h2>
                        <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "4px" }}>
                          Manage your contact info, garage trade name, and pan-India dispatch billing details.
                        </p>
                      </div>

                      {saveSuccess && (
                        <div
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.15)",
                            color: "#34d399",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            padding: "12px 16px",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          ✓ Profile changes saved successfully!
                        </div>
                      )}

                      <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              Workshop / Business Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Apex Moto Works"
                              value={workshopName}
                              onChange={(e) => setWorkshopName(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                            GSTIN / Business Trade Tax ID (Optional for B2B Invoices)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 07AAAAA0000A1Z5"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "11px 14px",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid rgba(255, 255, 255, 0.14)",
                              backgroundColor: "#131926",
                              color: "#ffffff",
                              fontSize: "0.9rem",
                              textTransform: "uppercase",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                            Dispatch &amp; Delivery Address
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Plot / Shop No., Industrial Area, Street..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "11px 14px",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid rgba(255, 255, 255, 0.14)",
                              backgroundColor: "#131926",
                              color: "#ffffff",
                              fontSize: "0.9rem",
                              resize: "vertical",
                            }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              City
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Pune"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              State
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Maharashtra"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "6px", color: "#cbd5e1" }}>
                              PIN Code
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 411001"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 14px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid rgba(255, 255, 255, 0.14)",
                                backgroundColor: "#131926",
                                color: "#ffffff",
                                fontSize: "0.9rem",
                              }}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            alignSelf: "flex-start",
                            padding: "12px 28px",
                            fontWeight: 800,
                            marginTop: "8px",
                          }}
                        >
                          Save Profile Changes
                        </button>
                      </form>
                    </div>
                  )}

                  {activeTab === "orders" && (
                    <div
                      style={{
                        backgroundColor: "#0e131d",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "32px",
                      }}
                    >
                      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                        Recent Wholesale Orders &amp; Dispatches
                      </h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "4px", marginBottom: "24px" }}>
                        Real-time status of your battery consignments and engine spare dispatches.
                      </p>

                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div
                          style={{
                            backgroundColor: "#131926",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            padding: "20px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "12px" }}>
                            <div>
                              <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Order ID</div>
                              <div style={{ fontWeight: 800, color: "var(--primary)" }}>#SHK-9842-DL</div>
                            </div>
                            <div>
                              <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Order Date</div>
                              <div style={{ fontWeight: 700 }}>Today, 09:30 AM</div>
                            </div>
                            <div>
                              <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Total Amount</div>
                              <div style={{ fontWeight: 800, color: "#34d399" }}>₹4,250 (Wholesale Slab)</div>
                            </div>
                            <div>
                              <span
                                style={{
                                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                                  color: "#34d399",
                                  padding: "4px 10px",
                                  borderRadius: "999px",
                                  fontSize: "0.76rem",
                                  fontWeight: 800,
                                }}
                              >
                                Dispatched • In Transit
                              </span>
                            </div>
                          </div>

                          <div style={{ padding: "14px 0", fontSize: "0.9rem", color: "#cbd5e1" }}>
                            <div>• <strong>2x Nexcolle™ Pro-Power 12V 4Ah</strong> Maintenance-Free AGM Battery</div>
                            <div>• <strong>1x FUJI™ Hero Splendor</strong> 97.2cc Cylinder Liner &amp; Piston Kit</div>
                          </div>

                          <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
                            <Link
                              href="/track-order?awb=SHK9842"
                              className="btn btn-primary"
                              style={{ fontSize: "0.82rem", padding: "8px 16px" }}
                            >
                              Track Consignment Live
                            </Link>
                          </div>
                        </div>

                        <div
                          style={{
                            textAlign: "center",
                            padding: "32px",
                            backgroundColor: "#131926",
                            borderRadius: "var(--radius-md)",
                            border: "1px dashed rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(249, 87, 22, 0.12)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 12px auto" }}>
                            <Icon name="package" style={{ width: "24px", height: "24px" }} />
                          </div>
                          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Need parts for an upcoming rebuild job?</div>
                          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "4px", marginBottom: "16px" }}>
                            Orders placed before 2:00 PM are dispatched same day from our logistics hub.
                          </p>
                          <Link href="/products" className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
                            Browse Full Catalog
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "tiers" && (
                    <div
                      style={{
                        backgroundColor: "#0e131d",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "32px",
                      }}
                    >
                      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                        B2B Trade Pricing &amp; Volume Slabs
                      </h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "4px", marginBottom: "24px" }}>
                        Automotive garage owners and retail shops unlock automatic wholesale slab discounts.
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                        <div
                          style={{
                            backgroundColor: "#131926",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8" }}>STANDARD TIER</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", margin: "6px 0" }}>1 - 4 Units</div>
                          <div style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.1rem" }}>Standard Trade MRP</div>
                          <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "8px" }}>Standard workshop rate with GST invoice.</p>
                        </div>

                        <div
                          style={{
                            backgroundColor: "#131926",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--primary)",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "0 4px 20px rgba(249, 87, 22, 0.2)",
                          }}
                        >
                          <span style={{ backgroundColor: "var(--primary)", color: "#fff", fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: "999px" }}>
                            MOST POPULAR
                          </span>
                          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8", marginTop: "6px" }}>GARAGE BULK TIER</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", margin: "6px 0" }}>5 - 9 Units</div>
                          <div style={{ color: "#34d399", fontWeight: 800, fontSize: "1.1rem" }}>Save 10% – 12% Off</div>
                          <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "8px" }}>Includes free priority ground shipping.</p>
                        </div>

                        <div
                          style={{
                            backgroundColor: "#131926",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8" }}>MASTER DEALER TIER</div>
                          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ffffff", margin: "6px 0" }}>10+ Units</div>
                          <div style={{ color: "#34d399", fontWeight: 800, fontSize: "1.1rem" }}>Save 18% – 25% Off</div>
                          <p style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "8px" }}>Dedicated account manager + 48h SLA credit.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "garage" && (
                    <div
                      style={{
                        backgroundColor: "#0e131d",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "32px",
                      }}
                    >
                      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                        Saved Workshop Bike Models
                      </h2>
                      <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "4px", marginBottom: "24px" }}>
                        Quick-filter parts specifically matching the two-wheelers frequently serviced in your workshop.
                      </p>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                        {[
                          { brand: "Hero", name: "Splendor Plus / Pro", range: "100cc" },
                          { brand: "Honda", name: "Activa 3G / 4G / 5G / 6G", range: "110cc" },
                          { brand: "Bajaj", name: "Pulsar 150 / 180 / 220", range: "150-220cc" },
                          { brand: "TVS", name: "Apache RTR 160 / 180", range: "160-180cc" },
                        ].map((bike, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: "#131926",
                              borderRadius: "var(--radius-md)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "18px",
                            }}
                          >
                            <span style={{ fontSize: "0.72rem", color: "var(--primary)", fontWeight: 800 }}>{bike.brand}</span>
                            <div style={{ fontWeight: 800, fontSize: "1rem", color: "#ffffff", marginTop: "2px" }}>{bike.name}</div>
                            <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "4px" }}>Engine Class: {bike.range}</div>
                            <Link
                              href={`/products?q=${encodeURIComponent(bike.brand)}`}
                              style={{
                                display: "inline-block",
                                marginTop: "12px",
                                fontSize: "0.82rem",
                                color: "var(--primary-light)",
                                fontWeight: 700,
                              }}
                            >
                              View Compatible Spares
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  backgroundColor: "#0e131d",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  maxWidth: "540px",
                  margin: "0 auto",
                }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(249, 87, 22, 0.12)", color: "var(--primary)", display: "grid", placeItems: "center", margin: "0 auto 20px auto" }}>
                  <Icon name="lock" style={{ width: "32px", height: "32px" }} />
                </div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "8px" }}>Sign In to Your Trade Account</h2>
                <p style={{ color: "#94a3b8", fontSize: "0.92rem", marginBottom: "24px" }}>
                  Access your trade orders, wholesale discount slabs, and verified delivery addresses.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <button
                    onClick={() => openAuthModal("login")}
                    className="btn btn-primary"
                    style={{ padding: "12px 28px" }}
                  >
                    Log In Now
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="btn btn-outline"
                    style={{ padding: "12px 28px" }}
                  >
                    Register Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}

